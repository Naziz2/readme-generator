import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toast from 'react-hot-toast';
import type { GitHubRepository, ReadmeGenerationResult } from '../types';

const GITHUB_API_BASE = 'https://api.github.com/repos';

export const useReadmeGenerator = () => {
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [generatedReadme, setGeneratedReadme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractRepoInfo = (url: string): { owner: string; repo: string } | null => {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubRegex);
    
    if (!match) return null;
    
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '')
    };
  };

  const fetchRepository = useCallback(async (url: string): Promise<void> => {
    const repoInfo = extractRepoInfo(url);
    
    if (!repoInfo) {
      setError('Invalid GitHub URL. Please enter a valid GitHub repository URL.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${GITHUB_API_BASE}/${repoInfo.owner}/${repoInfo.repo}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repository not found. Please check the URL and try again.');
        }
        throw new Error(`Failed to fetch repository: ${response.statusText}`);
      }

      const data: GitHubRepository = await response.json();
      setRepository(data);
      
      toast.success('Repository loaded successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repository';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateReadme = useCallback(async (apiKey: string, email: string = ''): Promise<ReadmeGenerationResult> => {
    if (!repository) {
      return { content: '', success: false, error: 'No repository data available' };
    }

    if (!apiKey.trim()) {
      return { content: '', success: false, error: 'Google Gemini API key is required' };
    }

    setIsGenerating(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const contactSection = email 
        ? `\n\nContact Information:
- Email: ${email}

Please include this email in the contact/support section of the README.`
        : '';

      const prompt = `Generate a comprehensive, professional README.md file for this GitHub repository with plenty of emojis to make it engaging and visually appealing:

Repository Details:
- Name: ${repository.name}
- Full Name: ${repository.full_name}
- Description: ${repository.description || 'No description provided'}
- Language: ${repository.language || 'Not specified'}
- Stars: ${repository.stargazers_count}
- Forks: ${repository.forks_count}
- Topics: ${repository.topics.join(', ') || 'None'}
- License: ${repository.license?.name || 'Not specified'}
- Has Issues: ${repository.has_issues}
- Has Wiki: ${repository.has_wiki}
- Default Branch: ${repository.default_branch}
- Created: ${new Date(repository.created_at).toLocaleDateString()}
- Last Updated: ${new Date(repository.updated_at).toLocaleDateString()}${contactSection}

Create a professional, comprehensive README that includes:

1. 🎯 Project title with relevant emojis and description
2. 📊 Badges (build status, license, language, stars, forks, etc.)
3. 📋 Table of contents with emoji bullets
4. ✨ Features overview with emoji bullets
5. 🚀 Quick start/Getting started section
6. 📦 Installation instructions with step-by-step guide
7. 💻 Usage examples with code blocks
8. 📊 Project structure table showing key directories/files
9. 🛠️ API documentation table (if applicable)
10. 📈 Performance metrics table (if applicable)
11. 🤝 Contributing guidelines with table of contribution types
12. 📄 License information
13. 👥 Authors/Contributors section with table format
14. 🙏 Acknowledgments
15. 📞 Contact/Support information (include email if provided)

IMPORTANT FORMATTING GUIDELINES:
- Use relevant emojis for each section header (🎯, 🚀, 📦, 💻, etc.)
- Add emojis to feature lists and important points
- Use technology-specific emojis when mentioning languages/frameworks
- Include status emojis (✅, ❌, ⚠️) for different states
- Use directional emojis (➡️, ⬇️, ⬆️) for navigation
- Add celebration emojis (🎉, ✨, 🌟) for achievements

TABLES TO INCLUDE:
- Project structure table with directories and descriptions
- Feature comparison table (if applicable)
- API endpoints table (if it's an API project)
- Contributing guidelines table with types of contributions
- Authors/Contributors table with roles and contact info
- Dependencies table with versions and purposes
- Browser compatibility table (if web project)
- Performance benchmarks table (if applicable)

Make it engaging, professional, and suitable for production use. Use proper markdown formatting with headers, code blocks, lists, tables, and links. Include placeholder examples where specific implementation details aren't available.

The README should be well-structured, follow GitHub best practices, and be visually appealing with consistent emoji usage and well-formatted tables throughout.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      setGeneratedReadme(content);
      toast.success('🎉 README generated successfully with emojis and tables!');
      
      return { content, success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate README';
      setError(errorMessage);
      toast.error(errorMessage);
      return { content: '', success: false, error: errorMessage };
    } finally {
      setIsGenerating(false);
    }
  }, [repository]);

  const copyToClipboard = useCallback(async (content: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('📋 README copied to clipboard!');
    } catch (err) {
      toast.error('❌ Failed to copy to clipboard');
    }
  }, []);

  const downloadReadme = useCallback((content: string, filename: string = 'README.md'): void => {
    try {
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('📥 README downloaded successfully!');
    } catch (err) {
      toast.error('❌ Failed to download README');
    }
  }, []);

  const reset = useCallback(() => {
    setRepository(null);
    setGeneratedReadme('');
    setError(null);
    setIsLoading(false);
    setIsGenerating(false);
  }, []);

  return {
    repository,
    generatedReadme,
    isLoading,
    isGenerating,
    error,
    fetchRepository,
    generateReadme,
    copyToClipboard,
    downloadReadme,
    reset
  };
};
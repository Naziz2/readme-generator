import React, { useState } from 'react';
import { 
  Star, 
  GitFork, 
  Eye, 
  AlertCircle, 
  Calendar, 
  Code, 
  Tag,
  ExternalLink,
  Shield,
  Mail
} from 'lucide-react';
import type { GitHubRepository } from '../types';

interface RepositoryInfoProps {
  repository: GitHubRepository;
  onGenerateReadme: (email: string) => void;
  isGenerating: boolean;
}

export const RepositoryInfo: React.FC<RepositoryInfoProps> = ({
  repository,
  onGenerateReadme,
  isGenerating
}) => {
  const [email, setEmail] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500',
      'C++': 'bg-pink-500',
      'C#': 'bg-purple-500',
      'PHP': 'bg-indigo-500',
      'Ruby': 'bg-red-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'Swift': 'bg-orange-400',
      'Kotlin': 'bg-purple-600',
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  const handleGenerateClick = () => {
    onGenerateReadme(email);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-6">
      {/* Repository Info Card */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl blur-sm transition-all duration-500
          dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-yellow-600/20
          light:bg-gradient-to-r light:from-purple-500/20 light:to-blue-500/20"></div>
        <div className="relative backdrop-blur-md border rounded-2xl p-6 md:p-8 transition-all duration-500
          dark:bg-black/40 dark:border-yellow-500/20
          light:bg-white/10 light:border-white/20">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                className="w-16 h-16 rounded-full border-2 transition-all duration-500
                  dark:border-yellow-500/30
                  light:border-white/20"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-500
                  dark:text-yellow-400
                  light:text-white">
                  📁 {repository.name}
                </h2>
                <div className="flex items-center gap-2 transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">
                  <span>{repository.owner.login}</span>
                  <span>/</span>
                  <span className="font-medium">{repository.name}</span>
                </div>
                {repository.description && (
                  <p className="mt-2 text-sm md:text-base transition-colors duration-500
                    dark:text-gray-300
                    light:text-white/80">
                    📝 {repository.description}
                  </p>
                )}
              </div>
            </div>
            
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium transition-all duration-500
                dark:bg-gray-900/50 dark:hover:bg-gray-800/70 dark:border-yellow-500/30 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400/50
                light:bg-white/10 light:hover:bg-white/20 light:border-white/20 light:text-white light:hover:border-white/30"
            >
              <ExternalLink className="w-4 h-4" />
              🔗 View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl p-4 border transition-all duration-500
              dark:bg-gray-900/30 dark:border-yellow-500/20
              light:bg-white/5 light:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">⭐ Stars</span>
              </div>
              <div className="text-2xl font-bold transition-colors duration-500
                dark:text-yellow-400
                light:text-white">
                {formatNumber(repository.stargazers_count)}
              </div>
            </div>
            
            <div className="rounded-xl p-4 border transition-all duration-500
              dark:bg-gray-900/30 dark:border-yellow-500/20
              light:bg-white/5 light:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <GitFork className="w-4 h-4 text-green-400" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🍴 Forks</span>
              </div>
              <div className="text-2xl font-bold transition-colors duration-500
                dark:text-yellow-400
                light:text-white">
                {formatNumber(repository.forks_count)}
              </div>
            </div>
            
            <div className="rounded-xl p-4 border transition-all duration-500
              dark:bg-gray-900/30 dark:border-yellow-500/20
              light:bg-white/5 light:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">👀 Watchers</span>
              </div>
              <div className="text-2xl font-bold transition-colors duration-500
                dark:text-yellow-400
                light:text-white">
                {formatNumber(repository.watchers_count)}
              </div>
            </div>
            
            <div className="rounded-xl p-4 border transition-all duration-500
              dark:bg-gray-900/30 dark:border-yellow-500/20
              light:bg-white/5 light:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🐛 Issues</span>
              </div>
              <div className="text-2xl font-bold transition-colors duration-500
                dark:text-yellow-400
                light:text-white">
                {formatNumber(repository.open_issues_count)}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              {repository.language && (
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 transition-colors duration-500
                    dark:text-gray-500
                    light:text-white/60" />
                  <span className="text-sm transition-colors duration-500
                    dark:text-gray-400
                    light:text-white/70">💻 Language:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}></div>
                    <span className="font-medium transition-colors duration-500
                      dark:text-gray-200
                      light:text-white">{repository.language}</span>
                  </div>
                </div>
              )}
              
              {repository.license && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 transition-colors duration-500
                    dark:text-gray-500
                    light:text-white/60" />
                  <span className="text-sm transition-colors duration-500
                    dark:text-gray-400
                    light:text-white/70">📄 License:</span>
                  <span className="font-medium transition-colors duration-500
                    dark:text-gray-200
                    light:text-white">{repository.license.name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 transition-colors duration-500
                  dark:text-gray-500
                  light:text-white/60" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🎂 Created:</span>
                <span className="font-medium transition-colors duration-500
                  dark:text-gray-200
                  light:text-white">{formatDate(repository.created_at)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 transition-colors duration-500
                  dark:text-gray-500
                  light:text-white/60" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🔄 Updated:</span>
                <span className="font-medium transition-colors duration-500
                  dark:text-gray-200
                  light:text-white">{formatDate(repository.updated_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 transition-colors duration-500
                  dark:text-gray-500
                  light:text-white/60" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🌿 Default Branch:</span>
                <span className="font-medium transition-colors duration-500
                  dark:text-gray-200
                  light:text-white">{repository.default_branch}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">📦 Size:</span>
                <span className="font-medium transition-colors duration-500
                  dark:text-gray-200
                  light:text-white">{(repository.size / 1024).toFixed(1)} MB</span>
              </div>
            </div>
          </div>

          {/* Topics */}
          {repository.topics.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 transition-colors duration-500
                  dark:text-gray-500
                  light:text-white/60" />
                <span className="text-sm transition-colors duration-500
                  dark:text-gray-400
                  light:text-white/70">🏷️ Topics:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic) => (
                  <span
                    key={topic}
                    className="border rounded-full px-3 py-1 text-sm transition-all duration-500
                      dark:bg-gray-900/50 dark:border-yellow-500/20 dark:text-gray-300
                      light:bg-white/10 light:border-white/20 light:text-white/80"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div className="relative">
        <div className="absolute inset-0 rounded-xl blur-sm transition-all duration-500
          dark:bg-gradient-to-r dark:from-yellow-600/20 dark:to-yellow-500/20
          light:bg-gradient-to-r light:from-blue-500/20 light:to-purple-500/20"></div>
        <div className="relative backdrop-blur-md border rounded-xl p-4 transition-all duration-500
          dark:bg-black/40 dark:border-yellow-500/20
          light:bg-white/10 light:border-white/20">
          <label className="block text-sm font-medium mb-2 transition-colors duration-500
            dark:text-gray-300
            light:text-white/80">
            <Mail className="w-4 h-4 inline mr-2" />
            📧 Contact Email (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-500
              dark:bg-gray-900/50 dark:border-yellow-500/20 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400
              light:bg-white/5 light:border-white/20 light:text-white light:placeholder-white/50 light:focus:ring-purple-400 light:focus:border-transparent"
          />
          <p className="text-xs mt-2 transition-colors duration-500
            dark:text-gray-500
            light:text-white/60">
            This email will be included in the README for contact information
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className="font-medium px-8 py-3 rounded-xl transition-all duration-500 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed
            dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 dark:text-black dark:shadow-yellow-500/20 dark:hover:shadow-yellow-400/30
            light:bg-gradient-to-r light:from-purple-500 light:to-blue-500 light:hover:from-purple-600 light:hover:to-blue-600 light:disabled:from-gray-500 light:disabled:to-gray-600 light:text-white light:shadow-purple-500/20 light:hover:shadow-purple-400/30"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 rounded-full animate-spin
                dark:border-black/30 dark:border-t-black
                light:border-white/30 light:border-t-white"></div>
              <span>🤖 Generating README with AI...</span>
            </>
          ) : (
            <>
              <Code className="w-5 h-5" />
              <span>✨ Generate README with AI & Emojis</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
import React, { useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { RepositoryInfo } from './components/RepositoryInfo';
import { ReadmePreview } from './components/ReadmePreview';
import { useReadmeGenerator } from './hooks/useReadmeGenerator';

function HomePage() {
  const {
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
  } = useReadmeGenerator();

  const navigate = useNavigate();

  const handleSubmitUrl = async (url: string) => {
    await fetchRepository(url);
    // Navigate to the repository-specific URL using owner/repo format
    const repoInfo = extractRepoInfo(url);
    if (repoInfo) {
      navigate(`/${repoInfo.owner}/${repoInfo.repo}`);
    }
  };

  const extractRepoInfo = (url: string): { owner: string; repo: string } | null => {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubRegex);
    
    if (!match) return null;
    
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '')
    };
  };

  const handleGenerateReadme = async (email: string) => {
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      return;
    }
    await generateReadme(apiKey, email);
  };

  const handleCopyReadme = () => {
    copyToClipboard(generatedReadme);
  };

  const handleDownloadReadme = () => {
    const filename = repository ? `${repository.name}-README.md` : 'README.md';
    downloadReadme(generatedReadme, filename);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500
      dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-gray-800
      light:bg-gradient-to-br light:from-purple-900 light:via-blue-900 light:to-indigo-900">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] transition-all duration-500
          dark:from-yellow-500/10 dark:via-transparent dark:to-transparent
          light:from-purple-600/20 light:via-transparent light:to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] transition-all duration-500
          dark:from-yellow-600/10 dark:via-transparent dark:to-transparent
          light:from-blue-600/20 light:via-transparent light:to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <Header />
        
        <URLInput 
          onSubmit={handleSubmitUrl}
          isLoading={isLoading}
          error={error}
        />

        {repository && (
          <RepositoryInfo
            repository={repository}
            onGenerateReadme={handleGenerateReadme}
            isGenerating={isGenerating}
          />
        )}

        {generatedReadme && (
          <ReadmePreview
            content={generatedReadme}
            onCopy={handleCopyReadme}
            onDownload={handleDownloadReadme}
          />
        )}

        {/* Reset Button */}
        {(repository || generatedReadme) && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                reset();
                navigate('/');
              }}
              className="border rounded-lg px-6 py-2 transition-all duration-500 backdrop-blur-sm
                dark:bg-gray-900/50 dark:hover:bg-gray-800/70 dark:border-yellow-500/20 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400/50
                light:bg-white/10 light:hover:bg-white/20 light:border-white/20 light:text-white/80 light:hover:text-white light:hover:border-white/30"
            >
              🔄 Start Over
            </button>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

function RepositoryPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  
  const {
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
  } = useReadmeGenerator();

  useEffect(() => {
    if (owner && repo) {
      // Clean up repo name (remove .git extension if present)
      const cleanRepo = repo.replace(/\.git$/, '');
      const githubUrl = `https://github.com/${owner}/${cleanRepo}`;
      fetchRepository(githubUrl);
    }
  }, [owner, repo, fetchRepository]);

  const handleGenerateReadme = async (email: string) => {
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      return;
    }
    await generateReadme(apiKey, email);
  };

  const handleCopyReadme = () => {
    copyToClipboard(generatedReadme);
  };

  const handleDownloadReadme = () => {
    const filename = repository ? `${repository.name}-README.md` : 'README.md';
    downloadReadme(generatedReadme, filename);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500
      dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-gray-800
      light:bg-gradient-to-br light:from-purple-900 light:via-blue-900 light:to-indigo-900">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] transition-all duration-500
          dark:from-yellow-500/10 dark:via-transparent dark:to-transparent
          light:from-purple-600/20 light:via-transparent light:to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] transition-all duration-500
          dark:from-yellow-600/10 dark:via-transparent dark:to-transparent
          light:from-blue-600/20 light:via-transparent light:to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <Header />
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3 transition-colors duration-500
              dark:text-gray-300
              light:text-white">
              <div className="w-6 h-6 border-2 rounded-full animate-spin transition-colors duration-500
                dark:border-gray-600 dark:border-t-yellow-400
                light:border-white/30 light:border-t-white"></div>
              <span>🔍 Loading repository...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="border rounded-lg p-4 transition-all duration-500
              dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300
              light:bg-red-500/10 light:border-red-500/20 light:text-red-300">
              <p>❌ {error}</p>
              <button
                onClick={() => navigate('/')}
                className="mt-3 border rounded-lg px-4 py-2 transition-all duration-500
                  dark:bg-gray-900/50 dark:hover:bg-gray-800/70 dark:border-yellow-500/20 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400/50
                  light:bg-white/10 light:hover:bg-white/20 light:border-white/20 light:text-white light:hover:border-white/30"
              >
                🏠 Go Back
              </button>
            </div>
          </div>
        )}

        {repository && (
          <RepositoryInfo
            repository={repository}
            onGenerateReadme={handleGenerateReadme}
            isGenerating={isGenerating}
          />
        )}

        {generatedReadme && (
          <ReadmePreview
            content={generatedReadme}
            onCopy={handleCopyReadme}
            onDownload={handleDownloadReadme}
          />
        )}

        {/* Reset Button */}
        {(repository || generatedReadme) && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                reset();
                navigate('/');
              }}
              className="border rounded-lg px-6 py-2 transition-all duration-500 backdrop-blur-sm
                dark:bg-gray-900/50 dark:hover:bg-gray-800/70 dark:border-yellow-500/20 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400/50
                light:bg-white/10 light:hover:bg-white/20 light:border-white/20 light:text-white/80 light:hover:text-white light:hover:border-white/30"
            >
              🔄 Start Over
            </button>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:owner/:repo" element={<RepositoryPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
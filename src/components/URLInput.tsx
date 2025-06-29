import React, { useState } from 'react';
import { Github, Search, AlertCircle } from 'lucide-react';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const URLInput: React.FC<URLInputProps> = ({ onSubmit, isLoading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // Store the hardcoded API key in localStorage
      localStorage.setItem('gemini-api-key', 'AIzaSyAlu6QF4uEhcpBbk_sHzGsNikHPfnZPeXs');
      onSubmit(url.trim());
    }
  };

  React.useEffect(() => {
    // Set the hardcoded API key
    localStorage.setItem('gemini-api-key', 'AIzaSyAlu6QF4uEhcpBbk_sHzGsNikHPfnZPeXs');
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* GitHub URL Input */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl blur-sm transition-all duration-500
            dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-yellow-600/20
            light:bg-gradient-to-r light:from-purple-500/20 light:to-blue-500/20"></div>
          <div className="relative backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-500
            dark:bg-black/40 dark:border-yellow-500/20
            light:bg-white/10 light:border-white/20">
            <div className="flex">
              <div className="flex items-center px-4 border-r transition-all duration-500
                dark:bg-gray-900/50 dark:border-yellow-500/20
                light:bg-white/5 light:border-white/20">
                <Github className="w-5 h-5 transition-colors duration-500
                  dark:text-yellow-400/80
                  light:text-white/60" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="flex-1 bg-transparent px-4 py-4 focus:outline-none transition-colors duration-500
                  dark:text-gray-200 dark:placeholder-gray-500
                  light:text-white light:placeholder-white/50"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="px-6 py-4 font-medium transition-all duration-500 flex items-center gap-2 disabled:cursor-not-allowed
                  dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 dark:text-black
                  light:bg-gradient-to-r light:from-purple-500 light:to-blue-500 light:hover:from-purple-600 light:hover:to-blue-600 light:disabled:from-gray-500 light:disabled:to-gray-600 light:text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 rounded-full animate-spin
                      dark:border-black/30 dark:border-t-black
                      light:border-white/30 light:border-t-white"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Fetch Repository</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 border rounded-lg p-3 backdrop-blur-sm transition-all duration-500
            dark:text-red-300 dark:bg-red-900/20 dark:border-red-500/30
            light:text-red-300 light:bg-red-500/10 light:border-red-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};
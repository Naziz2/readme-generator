import React from 'react';
import { Bot } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12 relative">
      {/* Theme Toggle - positioned absolutely */}
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl blur-lg opacity-75 transition-all duration-500
            dark:bg-gradient-to-r dark:from-yellow-500/60 dark:to-yellow-600/60
            light:bg-gradient-to-r light:from-purple-500/60 light:to-blue-500/60"></div>
          <div className="relative backdrop-blur-sm border p-3 rounded-xl transition-all duration-500
            dark:bg-black/60 dark:border-yellow-500/30 dark:hover:border-yellow-400/50
            light:bg-white/10 light:border-white/20 light:hover:border-white/30">
            <Bot className="w-8 h-8 transition-colors duration-500
              dark:text-yellow-400
              light:text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500
          dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500
          light:from-white light:via-purple-200 light:to-blue-200">
          README Generator
        </h1>
      </div>
      
      <p className="text-lg md:text-xl mb-2 max-w-2xl mx-auto transition-colors duration-500
        dark:text-gray-300
        light:text-white/80">
        Transform your GitHub repositories into professional documentation with AI
      </p>
      
      <div className="flex items-center justify-center gap-2 text-sm transition-colors duration-500
        dark:text-gray-400
        light:text-white/60">
        <span>Powered by</span>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm border transition-all duration-500
          dark:bg-black/40 dark:border-yellow-500/20 dark:text-gray-300
          light:bg-white/10 light:border-white/20 light:text-white/80">
          <Bot className="w-4 h-4" />
          <span className="font-medium">Gemini 1.5 Flash</span>
        </div>
      </div>
    </header>
  );
};
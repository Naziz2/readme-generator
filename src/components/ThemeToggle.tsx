import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl transition-all duration-300 group backdrop-blur-sm
        dark:bg-black/50 dark:hover:bg-gray-900/70 dark:border dark:border-yellow-500/30 dark:hover:border-yellow-400/50
        light:bg-white/10 light:hover:bg-white/20 light:border light:border-white/20 light:hover:border-white/30
        hover:shadow-lg"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform
          ${theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100 text-yellow-500 drop-shadow-sm' 
            : 'rotate-90 scale-0 opacity-0'
          }`} 
        />
        <Moon className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform
          ${theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100 text-yellow-400 drop-shadow-sm' 
            : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 -z-10
        ${theme === 'dark' 
          ? 'shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-400/30' 
          : 'shadow-lg shadow-purple-500/20 group-hover:shadow-purple-400/30'
        }`} 
      />
    </button>
  );
};
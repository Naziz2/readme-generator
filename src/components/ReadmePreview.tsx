import React from 'react';
import { Copy, Download, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ReadmePreviewProps {
  content: string;
  onCopy: () => void;
  onDownload: () => void;
}

export const ReadmePreview: React.FC<ReadmePreviewProps> = ({
  content,
  onCopy,
  onDownload
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl blur-sm transition-all duration-500
          dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-yellow-600/20
          light:bg-gradient-to-r light:from-purple-500/20 light:to-blue-500/20"></div>
        <div className="relative backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500
          dark:bg-black/40 dark:border-yellow-500/20
          light:bg-white/10 light:border-white/20">
          
          {/* Header */}
          <div className="border-b px-6 py-4 flex items-center justify-between transition-all duration-500
            dark:bg-gray-900/30 dark:border-yellow-500/20
            light:bg-white/5 light:border-white/20">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 transition-colors duration-500
                dark:text-yellow-400
                light:text-white/80" />
              <h3 className="text-lg font-semibold transition-colors duration-500
                dark:text-yellow-400
                light:text-white">Generated README.md</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onCopy}
                className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm transition-all duration-500
                  dark:bg-gray-900/50 dark:hover:bg-gray-800/70 dark:border-yellow-500/30 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:border-yellow-400/50
                  light:bg-white/10 light:hover:bg-white/20 light:border-white/20 light:text-white/80 light:hover:text-white light:hover:border-white/30"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              
              <button
                onClick={onDownload}
                className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm transition-all duration-500
                  dark:bg-gradient-to-r dark:from-yellow-500/80 dark:to-yellow-600/80 dark:hover:from-yellow-400/80 dark:hover:to-yellow-500/80 dark:border-yellow-500/30 dark:text-black
                  light:bg-gradient-to-r light:from-purple-500/80 light:to-blue-500/80 light:hover:from-purple-600/80 light:hover:to-blue-600/80 light:border-white/20 light:text-white"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Content - GitHub-style black background */}
          <div className="p-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6 max-h-[600px] overflow-y-auto">
              <div className="prose prose-invert prose-purple max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      
                      return !inline && language ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            background: '#0d1117',
                            border: '1px solid #30363d',
                            borderRadius: '6px',
                            fontSize: '14px',
                            margin: '16px 0'
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-sm font-mono text-gray-200"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold mb-3 text-white mt-6 border-b border-gray-800 pb-1">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mb-2 text-white mt-4">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold mb-2 text-white mt-3">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="text-base font-semibold mb-2 text-white mt-3">
                        {children}
                      </h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="text-sm font-semibold mb-2 text-white mt-3">
                        {children}
                      </h6>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="text-gray-300 mb-4 space-y-1 list-disc list-inside">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-gray-300 mb-4 space-y-1 list-decimal list-inside">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">
                        {children}
                      </li>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-600 pl-4 my-4 text-gray-400 italic bg-gray-900 py-2 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-gray-700 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-800">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-700 px-3 py-2 text-white font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-700 px-3 py-2 text-gray-300">
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="border-gray-700 my-6" />
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-gray-200 italic">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { CodePanel } from './CodePanel';

export function CodeExportModal({ isOpen, onClose, cssCode, htmlCode }) {
  const [activeTab, setActiveTab] = useState('css');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm select-none animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl h-[60vh] max-h-[520px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden m-4 animate-scale-in">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-900 shrink-0 bg-zinc-950/50 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            {/* Terminal Window Dots */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <span className="h-4 w-[1px] bg-zinc-800 mx-1" />
            <h2 className="text-sm font-medium tracking-tight text-zinc-200 flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>
              Export Generated Code
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-all duration-150 cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation / Segmented Documentation Tabs */}
        <div className="flex items-center justify-between px-6 bg-zinc-950 border-b border-zinc-900 shrink-0">
          <div className="flex gap-1 py-2">
            <button
              onClick={() => setActiveTab('css')}
              className={`py-1.5 px-3 text-xs font-medium tracking-wide transition-all rounded-md cursor-pointer ${
                activeTab === 'css'
                  ? 'bg-zinc-900 text-zinc-100 shadow-sm border border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
              }`}
            >
              global.css
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`py-1.5 px-3 text-xs font-medium tracking-wide transition-all rounded-md cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-zinc-900 text-zinc-100 shadow-sm border border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
              }`}
            >
              index.html
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-600 select-none hidden sm:block">
            read-only snippet
          </div>
        </div>

        {/* Code Viewport Area */}
        <div className="flex-1 min-h-0 bg-zinc-950 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {activeTab === 'css' && (
              <div className="animate-fade-in h-full">
                <CodePanel title="CSS Specifications" code={cssCode} language="css" />
              </div>
            )}
            {activeTab === 'html' && (
              <div className="animate-fade-in h-full">
                <CodePanel title="HTML Structure" code={htmlCode} language="html" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

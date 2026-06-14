// components/CodeExportModal.jsx
import { useState } from 'react';
import { CodePanel } from './CodePanel';

export function CodeExportModal({ isOpen, onClose, cssCode, htmlCode }) {
  const [activeTab, setActiveTab] = useState('css');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 select-none animate-fade-in">
      <div className="bg-black border border-zinc-800 rounded-none w-full max-w-2xl h-[65vh] max-h-[500px] flex flex-col p-6 relative overflow-hidden m-4 shadow-[0_0_40px_rgba(255,255,255,0.02)]">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase leading-none">
              Source{' '}
              <span className="font-light tracking-wide text-zinc-400 lowercase italic pr-1">
                code
              </span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors duration-150 text-xs uppercase tracking-widest cursor-pointer font-bold"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        {/* Clean Line-Based Tabs */}
        <div className="flex border-b border-zinc-900 mb-6 shrink-0">
          <button
            onClick={() => setActiveTab('css')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border-b rounded-none -mb-[1px] ${
              activeTab === 'css'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Styles
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border-b rounded-none -mb-[1px] ${
              activeTab === 'html'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Markup
          </button>
        </div>

        {/* Rigid Fixed Inner Canvas to eliminate any size shifts */}
        <div className="flex-1 min-h-0 bg-[#050507] border border-zinc-900 rounded-none flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {activeTab === 'css' && (
              <div className="animate-fade-in">
                <CodePanel title="CSS Specifications" code={cssCode} language="css" />
              </div>
            )}
            {activeTab === 'html' && (
              <div className="animate-fade-in">
                <CodePanel title="HTML Structure" code={htmlCode} language="html" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

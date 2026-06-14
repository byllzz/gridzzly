const ProjectInfoPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md select-none animate-fade-in">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden m-4 animate-scale-in">
        {/* Clean Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-900/80 shrink-0 bg-zinc-950/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              System v1.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/byllzz/gridzzly.git"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-lg transition-all duration-150"
              title="View Source on GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <span className="h-4 w-[1px] bg-zinc-800" />
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-lg transition-all duration-150 cursor-pointer"
              aria-label="Close panel"
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
        </div>

        {/* Scrollable Content Viewport */}
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 text-sm custom-scrollbar bg-zinc-950">
          {/* Large Editorial Style Typography Header */}
          <header className="space-y-3 border-b border-zinc-900 pb-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-100 leading-none uppercase">
              Grid{' '}
              <span className="font-script lowercase text-violet-400 normal-case block sm:inline sm:ml-1">
                playground
              </span>
            </h1>
            <p className="text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
              An interactive visual environment engineered for drafting, adjusting, and exporting
              robust CSS Grid layouts flawlessly.
            </p>
          </header>

          {/* Core Guide Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Execution
              </div>
              <h2 className="text-xl font-bold text-zinc-200 mt-1">Quick Start Manual</h2>
              <p className="text-xs text-zinc-500 mt-2 font-mono leading-relaxed">
                Follow the operational sequence to generate responsive code blocks.
              </p>
            </div>

            <div className="md:col-span-2 space-y-4 text-zinc-400">
              <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                <span className="font-mono text-xs text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded">
                  01
                </span>
                <p className="text-xs leading-relaxed">
                  <strong className="text-zinc-200 block text-sm mb-0.5">
                    Matrix Construction
                  </strong>{' '}
                  Click and drag across node coordinates on the main board viewport canvas grid
                  structure to generate structural item boundaries.
                </p>
              </div>
              <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                <span className="font-mono text-xs text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded">
                  02
                </span>
                <p className="text-xs leading-relaxed">
                  <strong className="text-zinc-200 block text-sm mb-0.5">Track Formatting</strong>{' '}
                  Inject values like{' '}
                  <code className="bg-zinc-900 text-zinc-300 font-mono px-1 rounded border border-zinc-800">
                    1fr
                  </code>
                  ,{' '}
                  <code className="bg-zinc-900 text-zinc-300 font-mono px-1 rounded border border-zinc-800">
                    auto
                  </code>
                  , or{' '}
                  <code className="bg-zinc-900 text-zinc-300 font-mono px-1 rounded border border-zinc-800">
                    minmax()
                  </code>{' '}
                  strings directly inside the column controls header rows.
                </p>
              </div>
              <div className="flex gap-4 items-start bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                <span className="font-mono text-xs text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded">
                  03
                </span>
                <p className="text-xs leading-relaxed">
                  <strong className="text-zinc-200 block text-sm mb-0.5">
                    Destructive Refactoring
                  </strong>{' '}
                  Target isolated node configurations inside the canvas window matrix view and
                  activate the deletion node{' '}
                  <kbd className="px-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[10px]">
                    ×
                  </kbd>{' '}
                  marker.
                </p>
              </div>
            </div>
          </section>

          {/* System Specs Architecture */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-zinc-900">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Architecture
              </div>
              <h2 className="text-xl font-bold text-zinc-200 mt-1">Core Specifications</h2>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Dynamic Parsing Pipeline
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Computes bounding boxes dynamically translating client pointer gestures down into
                  clean layout calculations.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Reactive Export Block
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Compiles real-time layouts cleanly straight into modular browser-compliant CSS
                  stylesheets instantly.
                </p>
              </div>
            </div>
          </section>

          {/* Fine Print / Open Source Badge */}
          <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-600 font-mono">
              Designed by developers • Distributed under the MIT license architecture.
            </div>

            {/* Developer Contact Social Links */}
            <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
              <a
                href="https://github.com/byllzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-200 border-b border-zinc-800 hover:border-zinc-400 pb-0.5 transition-all"
              >
                git.hub
              </a>
              <a
                href="https://x.com/bilalmlkdev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-200 border-b border-zinc-800 hover:border-zinc-400 pb-0.5 transition-all"
              >
                twit.ter
              </a>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-8 py-4 border-t border-zinc-900 text-xs text-zinc-500 flex justify-between items-center bg-zinc-950 shrink-0">
          <span className="font-mono text-[11px] text-zinc-600">
            Close window target via ESC key bound handlers
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-800 hover:text-zinc-100 transition-all cursor-pointer text-xs shadow-sm font-mono tracking-tight"
          >
            sys.exit()
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoPanel;

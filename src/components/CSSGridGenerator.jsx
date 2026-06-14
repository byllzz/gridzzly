// CSSGridGenerator.jsx
import React, { useState } from 'react';
import { useGridGenerator } from '../hooks/useGridGenerator';
import { GridSetupPanel } from './GridSetupPanel';
import { VisualGrid } from './VisualGrid';
import { TemplatePresets } from './TemplatePresets';
import { CodePanel } from './CodePanel';
import Logo from './Logo';

export default function CSSGridGenerator() {
  const {
    numCols,
    setNumCols,
    numRows,
    setNumRows,
    colGap,
    setColGap,
    rowGap,
    setRowGap,
    colSizes,
    setColSizes,
    rowSizes,
    setRowSizes,
    items,
    highlightedCells,
    cssCode,
    htmlCode,
    startDrawing,
    updateDrawing,
    finishDrawing,
    deleteItem,
    resetGrid,
    applyTemplate,
  } = useGridGenerator();

  // State for code popup modal
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-200 flex flex-col items-center py-2 selection:bg-purple-500/30">
      <header className="mb-8">
        <div className="flex items-center">
          <span className="text-3xl">#</span>{' '}
          <h1 className="text-4xl font-bold tracking-tight">CSS Grid Generator</h1>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 px-15 w-full justify-center items-start">
        {/* Left Interaction Workspace */}
        <div className="flex flex-col flex-1 w-full gap-4">
          <VisualGrid
            numCols={numCols}
            numRows={numRows}
            colSizes={colSizes}
            setColSizes={setColSizes}
            rowSizes={rowSizes}
            setRowSizes={setRowSizes}
            colGap={colGap}
            rowGap={rowGap}
            items={items}
            highlightedCells={highlightedCells}
            startDrawing={startDrawing}
            updateDrawing={updateDrawing}
            finishDrawing={finishDrawing}
            deleteItem={deleteItem}
          />
          <TemplatePresets onApplyTemplate={applyTemplate} onReset={resetGrid} />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <GridSetupPanel
            numCols={numCols}
            setNumCols={setNumCols}
            colGap={colGap}
            setColGap={setColGap}
            numRows={numRows}
            setNumRows={setNumRows}
            rowGap={rowGap}
            setRowGap={setRowGap}
          />

          {/* New button to open code popup */}
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Code Popup
          </button>

          {/* Existing code panels (optional, can keep or hide if you want) */}
          {/* <CodePanel title="CSS code:" code={cssCode} language="css" />
          <CodePanel title="HTML code:" code={htmlCode} language="html" /> */}
        </div>
      </div>

      {/* Modal Popup for Code Panels */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1e] border border-zinc-700 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-400">Generated Code</h2>
              <button
                onClick={() => setIsCodeModalOpen(false)}
                className="text-zinc-400 hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <CodePanel title="CSS code:" code={cssCode} language="css" />
              <CodePanel title="HTML code:" code={htmlCode} language="html" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

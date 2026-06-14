import { useGridGenerator } from '../hooks/useGridGenerator';
import { GridSetupPanel } from './GridSetupPanel';
import { VisualGrid } from './VisualGrid';
import { TemplatePresets } from './TemplatePresets';
import { CodePanel } from './CodePanel';
import Logo from './Logo';
import { useState } from 'react';

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
    <div className="h-full w-full mt-12  text-zinc-200  py-2 selection:bg-purple-500/30">
      <div className="flex flex-col lg:flex-row gap-5 px-7 w-full justify-between items-start">
        {/* Left Interaction Workspace */}
        <div className="flex flex-col flex-1 w-full gap-4 relative right-5">
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
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 flex flex-col items-start gap-6 relative right-2">
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
          <TemplatePresets onApplyTemplate={applyTemplate} onReset={resetGrid} />

          {/* New button to open code popup */}
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="border border-purple-600 rounded-full cursor-pointer hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Please May I have Some Code
          </button>

          <button>What does this project do?</button>
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

// components/CSSGridGenerator.jsx
import { useGridGenerator } from '../hooks/useGridGenerator';
import { GridSetupPanel } from './GridSetupPanel';
import { VisualGrid } from './VisualGrid';
import { TemplatePresets } from './TemplatePresets';
import { CodePanel } from './CodePanel';
import { useState } from 'react';
import strokeLight from '../assets/strokeLight.png';

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
    isDrawing,
    cssCode,
    htmlCode,
    startDrawing,
    updateDrawing,
    finishDrawing,
    deleteItem,
    resetGrid,
    applyTemplate,
    generateRandomPattern,
  } = useGridGenerator();

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <div className="flex-1 w-full relative  text-zinc-200 py-2 selection:bg-purple-500/30">
      <div className="flex flex-col lg:flex-row gap-5 px-7 w-full justify-between items-start">
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
            isDrawing={isDrawing}
            startDrawing={startDrawing}
            updateDrawing={updateDrawing}
            finishDrawing={finishDrawing}
            deleteItem={deleteItem}
          />
        </div>

        <div className="w-full lg:w-96 flex flex-col items-start gap-3 relative right-2">
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
          <span className="h-[1px] w-full bg-zinc-700" />
          <TemplatePresets
            onApplyTemplate={applyTemplate}
            onReset={resetGrid}
            onRandom={generateRandomPattern}
          />
          <span className="h-[1px] w-full bg-zinc-700" />
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="border border-purple-600 rounded-full cursor-pointer hover:bg-purple-700 text-white font-medium py-2 px-4 transition-colors"
          >
            Please May I have Some Code
          </button>
          <button className="font-script font-bold text-[22px] relative">
            What does this project do?
            <img src={strokeLight} className="h-2.5 absolute -bottom-1.5 -right-0" loading="lazy" />
          </button>
        </div>
      </div>

      {/* Code Modal Section */}
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

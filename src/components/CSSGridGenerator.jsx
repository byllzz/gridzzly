// components/CSSGridGenerator.jsx
import { useGridGenerator } from '../hooks/useGridGenerator';
import { GridSetupPanel } from './GridSetupPanel';
import { VisualGrid } from './VisualGrid';
import { TemplatePresets } from './TemplatePresets';
import { useState } from 'react';
import strokeLight from '../assets/strokeLight.png';
import { CodeExportModal } from './CodeExportModal';
import ProjectInfoPanel from './ProjectInfoPanel';
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
  const [isInfoOpen, setIsInfoOpen] = useState(false);
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
          <button
            onClick={() => setIsInfoOpen(true)} // <-- open the info panel
            className="font-script font-bold text-[22px] relative"
          >
            What does this project do?
            <img src={strokeLight} className="h-2.5 absolute -bottom-1.5 -right-0" loading="lazy" />
          </button>
        </div>
      </div>

      {/* Code Modal Section - Next Level UI */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        cssCode={cssCode}
        htmlCode={htmlCode}
      />
      <ProjectInfoPanel isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

// CSSGridGenerator.jsx
import React from 'react';
import { useGridGenerator } from './hooks/useGridGenerator';
import { GridSetupPanel } from './components/GridSetupPanel';
import { VisualGrid } from './components/VisualGrid';
import { TemplatePresets } from './components/TemplatePresets';
import { CodePanel } from './components/CodePanel';

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

  return (
    <div className="min-h-screen bg-[#121214] text-zinc-200 flex flex-col items-center p-6 selection:bg-purple-500/30">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-purple-500 font-extrabold mr-1">#</span> CSS Grid Generator
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl w-full justify-center items-start">
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
          <CodePanel title="CSS code:" code={cssCode} language="css" />
          <CodePanel title="HTML code:" code={htmlCode} language="html" />
        </div>
      </div>
    </div>
  );
}

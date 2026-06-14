// components/VisualGrid.jsx
import React, { useEffect } from 'react';
import { ColumnTrackInputs, RowTrackInputs } from './TrackSizeInputs';
import { PlacedItemsOverlay } from './PlacedItemsOverlay';

export const VisualGrid = ({
  numCols,
  numRows,
  colSizes,
  setColSizes,
  rowSizes,
  setRowSizes,
  colGap,
  rowGap,
  items,
  highlightedCells,
  startDrawing,
  updateDrawing,
  finishDrawing,
  deleteItem,
}) => {
  // Attach global mouse up listener to finish drawing
  useEffect(() => {
    window.addEventListener('mouseup', finishDrawing);
    return () => window.removeEventListener('mouseup', finishDrawing);
  }, [finishDrawing]);

  return (
    <div className="relative p-10 bg-[#161619] rounded-xl border border-zinc-800 shadow-2xl w-full overflow-auto">
      <ColumnTrackInputs colSizes={colSizes} setColSizes={setColSizes} />
      <RowTrackInputs rowSizes={rowSizes} setRowSizes={setRowSizes} />

      <div
        className="bg-zinc-950 border-2 border-purple-950/60 rounded relative min-h-[380px] grid select-none"
        style={{
          gridTemplateColumns: colSizes.join(' '),
          gridTemplateRows: rowSizes.join(' '),
          columnGap: `${colGap}px`,
          rowGap: `${rowGap}px`,
        }}
      >
        {/* Background cells */}
        {Array.from({ length: numRows }).map((_, rIdx) => {
          const r = rIdx + 1;
          return Array.from({ length: numCols }).map((_, cIdx) => {
            const c = cIdx + 1;
            const isHighlighted = highlightedCells.some(cell => cell.row === r && cell.col === c);
            return (
              <div
                key={`cell-${r}-${c}`}
                style={{ gridRowStart: r, gridColumnStart: c }}
                className={`border border-dashed border-zinc-800 cursor-crosshair transition-colors duration-700 ${
                  isHighlighted ? 'bg-purple-500/20 border-purple-500/40' : ''
                }`}
                onMouseDown={() => startDrawing(r, c)}
                onMouseEnter={() => updateDrawing(r, c)}
              />
            );
          });
        })}

        <PlacedItemsOverlay items={items} onDelete={deleteItem} />
      </div>
    </div>
  );
};

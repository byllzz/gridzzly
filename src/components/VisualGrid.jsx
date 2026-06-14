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
  useEffect(() => {
    window.addEventListener('mouseup', finishDrawing);
    return () => window.removeEventListener('mouseup', finishDrawing);
  }, [finishDrawing]);

  return (
    <div className="relative w-full overflow-visible">
      {/* The grid container with extra top & left margin to make room for inputs */}
      <div
        className="relative bg-zinc-600/50 border-2 border-purple-950 rounded min-h-[450px] grid select-none"
        style={{
          gridTemplateColumns: colSizes.join(' '),
          gridTemplateRows: rowSizes.join(' '),
          columnGap: `${colGap}px`,
          rowGap: `${rowGap}px`,
          marginTop: '40px', // space for column inputs
          marginLeft: '100px', // space for row inputs
        }}
      >
        {/* Absolute positioned inputs – they are relative to this grid container */}
        <ColumnTrackInputs colSizes={colSizes} setColSizes={setColSizes} colGap={colGap} />
        <RowTrackInputs rowSizes={rowSizes} setRowSizes={setRowSizes} rowGap={rowGap} />

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
                className={`border border-zinc-500 cursor-crosshair ${
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

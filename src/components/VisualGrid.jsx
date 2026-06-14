// components/VisualGrid.jsx
import { ColumnTrackInputs, RowTrackInputs } from './TrackSizeInputs';
import { PlacedItemsOverlay } from './PlacedItemsOverlay';
import { useEffect } from 'react';

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
        className="relative bg-zinc-800/50 border-2 border-purple-950 min-h-[440px] grid select-none"
        style={{
          gridTemplateColumns: colSizes.join(' '),
          gridTemplateRows: rowSizes.join(' '),
          columnGap: `${colGap}px`,
          rowGap: `${rowGap}px`,
          marginTop: '40px',
          marginLeft: '100px',
          // Dot canvas background pattern
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '5px 5px',
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
                  isHighlighted ? 'bg-purple-500/20 border-purple-500/40' : 'bg-transparent'
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

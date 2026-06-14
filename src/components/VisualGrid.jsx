// components/VisualGrid.jsx
import { ColumnTrackInputs, RowTrackInputs } from './TrackSizeInputs';
import { PlacedItemsOverlay } from './PlacedItemsOverlay'; // Make sure this import is back!
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
  isDrawing,
}) => {
  useEffect(() => {
    window.addEventListener('mouseup', finishDrawing);
    return () => window.removeEventListener('mouseup', finishDrawing);
  }, [finishDrawing]);

  return (
    <div className="relative w-full overflow-visible">
      <div
        data-drawing={isDrawing}
        className="relative bg-zinc-800/50 border-2 border-purple-950 min-h-[440px] grid select-none"
        style={{
          gridTemplateColumns: colSizes.join(' '),
          gridTemplateRows: rowSizes.join(' '),
          columnGap: `${colGap}px`,
          rowGap: `${rowGap}px`,
          marginTop: '40px',
          marginLeft: '100px',
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '5px 5px',
        }}
      >
        <ColumnTrackInputs colSizes={colSizes} setColSizes={setColSizes} colGap={colGap} />
        <RowTrackInputs rowSizes={rowSizes} setRowSizes={setRowSizes} rowGap={rowGap} />

        {Array.from({ length: numRows }).map((_, rIdx) => {
          const r = rIdx + 1;
          return Array.from({ length: numCols }).map((_, cIdx) => {
            const c = cIdx + 1;
            const isHighlighted = highlightedCells.some(cell => cell.row === r && cell.col === c);

            return (
              <div
                key={`cell-${r}-${c}`}
                style={{ gridRowStart: r, gridColumnStart: c }}
                className={`border border-zinc-500 cursor-crosshair transition-colors duration-75 ${
                  isHighlighted && isDrawing
                    ? 'bg-purple-500/20 border-purple-500/40'
                    : 'bg-transparent'
                }`}
                onMouseDown={() => startDrawing(r, c)}
                onMouseEnter={() => updateDrawing(r, c)}
              />
            );
          });
        })}

        {/* Un-commented this line right here! */}
        <PlacedItemsOverlay items={items} onDelete={deleteItem} />
      </div>
    </div>
  );
};

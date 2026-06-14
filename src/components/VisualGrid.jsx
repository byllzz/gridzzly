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
  isDrawing,
}) => {
  useEffect(() => {
    window.addEventListener('mouseup', finishDrawing);
    return () => window.removeEventListener('mouseup', finishDrawing);
  }, [finishDrawing]);

  // Dynamically calculate the outer boundary limits of the active mouse selection drag
  const getSelectionBox = () => {
    if (!isDrawing || highlightedCells.length === 0) return null;

    const rows = highlightedCells.map(cell => cell.row);
    const cols = highlightedCells.map(cell => cell.col);

    return {
      rStart: Math.min(...rows),
      rEnd: Math.max(...rows) + 1,
      cStart: Math.min(...cols),
      cEnd: Math.max(...cols) + 1,
    };
  };

  const selectionBox = getSelectionBox();

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
                className={`border border-zinc-500/40 cursor-crosshair transition-all duration-75 ${
                  isHighlighted && isDrawing ? 'bg-purple-500/10' : 'bg-transparent'
                }`}
                onMouseDown={() => startDrawing(r, c)}
                onMouseEnter={() => updateDrawing(r, c)}
              />
            );
          });
        })}

        {/* LIVE DRAG SELECTION OVERLAY COMPONENT */}
        {selectionBox && (
          <div
            style={{
              gridRow: `${selectionBox.rStart} / ${selectionBox.rEnd}`,
              gridColumn: `${selectionBox.cStart} / ${selectionBox.cEnd}`,
            }}
            className="border-2 border-dashed border-purple-400 bg-purple-500/20 pointer-events-none flex items-center justify-center z-10 shadow-xl rounded-sm transition-all"
          >
            <div className="bg-purple-600/80 text-white font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow border border-purple-400/40 select-none pointer-events-none scale-100">
              {selectionBox.cEnd - selectionBox.cStart} cols ×{' '}
              {selectionBox.rEnd - selectionBox.rStart} rows
            </div>
          </div>
        )}

        <PlacedItemsOverlay items={items} onDelete={deleteItem} />
      </div>
    </div>
  );
};

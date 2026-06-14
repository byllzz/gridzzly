// components/TemplatePresets.jsx
import React from 'react';

const templates = [
  {
    name: 'Standard 4x3',
    cols: 4,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: 'Holy Grail',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '3fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 4 }, // header
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 }, // left
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 }, // main
      { id: 4, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 }, // right
      { id: 5, rStart: 3, cStart: 1, rEnd: 4, cEnd: 4 }, // footer
    ],
  },
  {
    name: 'Asymmetric Split',
    cols: 3,
    rows: 2,
    colSizes: ['2fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 4 },
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
      { id: 4, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 },
    ],
  },
  {
    name: 'Dashboard',
    cols: 4,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr', '1fr'],
    rowSizes: ['2fr', '1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 3 },
      { id: 2, rStart: 1, cStart: 3, rEnd: 3, cEnd: 5 },
      { id: 3, rStart: 2, cStart: 1, rEnd: 4, cEnd: 2 },
      { id: 4, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
    ],
  },
  {
    name: '2x2 Grid',
    cols: 2,
    rows: 2,
    colSizes: ['1fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [],
  },
  {
    name: '3x3 Grid',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: 'Blog Layout',
    cols: 3,
    rows: 2,
    colSizes: ['1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 3, cEnd: 2 }, // sidebar left
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 4 }, // content top
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 4 }, // content bottom
    ],
  },
  {
    name: 'Card Grid',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 2 },
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 3 },
      { id: 3, rStart: 1, cStart: 3, rEnd: 2, cEnd: 4 },
      { id: 4, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 5, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
      { id: 6, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 },
      { id: 7, rStart: 3, cStart: 1, rEnd: 4, cEnd: 2 },
      { id: 8, rStart: 3, cStart: 2, rEnd: 4, cEnd: 3 },
      { id: 9, rStart: 3, cStart: 3, rEnd: 4, cEnd: 4 },
    ],
  },
  {
    name: 'Magazine',
    cols: 4,
    rows: 3,
    colSizes: ['1fr', '1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '2fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 5 }, // top banner
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 }, // left
      { id: 3, rStart: 2, cStart: 2, rEnd: 4, cEnd: 4 }, // big central
      { id: 4, rStart: 2, cStart: 4, rEnd: 3, cEnd: 5 }, // right top
      { id: 5, rStart: 3, cStart: 1, rEnd: 4, cEnd: 2 }, // left bottom
      { id: 6, rStart: 3, cStart: 4, rEnd: 4, cEnd: 5 }, // right bottom
    ],
  },
];

// Helper to compute scaling factor to fit preview into 50px box
const getScale = (colSizes, rowSizes) => {
  const baseUnit = 20; // 1fr = 20px in preview
  const totalWidth = colSizes.reduce((sum, size) => {
    if (size === '1fr') return sum + baseUnit;
    if (size.endsWith('fr')) return sum + parseFloat(size) * baseUnit;
    return sum + Math.min(parseInt(size) || baseUnit, 50);
  }, 0);
  const totalHeight = rowSizes.reduce((sum, size) => {
    if (size === '1fr') return sum + baseUnit;
    if (size.endsWith('fr')) return sum + parseFloat(size) * baseUnit;
    return sum + Math.min(parseInt(size) || baseUnit, 50);
  }, 0);
  const scale = Math.min(50 / totalWidth, 50 / totalHeight, 1);
  return { scale, totalWidth, totalHeight };
};

const MiniGridPreview = ({ cols, rows, colSizes, rowSizes, items }) => {
  const { scale, totalWidth, totalHeight } = getScale(colSizes, rowSizes);
  const baseUnit = 20;
  const pxColSizes = colSizes.map(size => {
    if (size === '1fr') return `${baseUnit}px`;
    if (size.endsWith('fr')) return `${parseFloat(size) * baseUnit}px`;
    return `${Math.min(parseInt(size) || baseUnit, 50)}px`;
  });
  const pxRowSizes = rowSizes.map(size => {
    if (size === '1fr') return `${baseUnit}px`;
    if (size.endsWith('fr')) return `${parseFloat(size) * baseUnit}px`;
    return `${Math.min(parseInt(size) || baseUnit, 50)}px`;
  });

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: '50px', height: '50px' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: pxColSizes.join(' '),
          gridTemplateRows: pxRowSizes.join(' '),
          gap: '1px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
        }}
      >
        {Array.from({ length: rows }).map((_, rIdx) =>
          Array.from({ length: cols }).map((_, cIdx) => (
            <div
              key={`cell-${rIdx}-${cIdx}`}
              style={{ gridRowStart: rIdx + 1, gridColumnStart: cIdx + 1 }}
              className="bg-zinc-700/50"
            />
          )),
        )}
        {items.map(item => (
          <div
            key={item.id}
            style={{
              gridRow: `${item.rStart} / ${item.rEnd}`,
              gridColumn: `${item.cStart} / ${item.cEnd}`,
              backgroundColor: `hsl(${(item.id * 137) % 360}, 70%, 70%)`,
            }}
            className="rounded-sm border border-purple-400/50"
          />
        ))}
      </div>
    </div>
  );
};

export const TemplatePresets = ({ onApplyTemplate, onReset }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Quick Preset Layouts:
        </span>
        <div className="flex flex-wrap gap-3">
          {templates.map((tpl, idx) => (
            <button
              key={`template-${idx}`}
              onClick={() => onApplyTemplate(tpl)}
              className="group relative bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-1 transition-all duration-200 flex flex-col items-center gap-1 w-[70px]"
              title={tpl.name}
            >
              <MiniGridPreview
                cols={tpl.cols}
                rows={tpl.rows}
                colSizes={tpl.colSizes}
                rowSizes={tpl.rowSizes}
                items={tpl.items}
              />
              <span className="text-[9px] text-zinc-400 group-hover:text-zinc-200 truncate w-full text-center">
                {tpl.name.length > 12 ? tpl.name.slice(0, 10) + '…' : tpl.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onReset}
        className="border border-purple-500/50 hover:bg-purple-500/10 text-purple-400 px-4 py-2 text-sm font-semibold rounded transition whitespace-nowrap"
      >
        Reset Grid
      </button>
    </div>
  );
};

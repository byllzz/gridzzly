// components/TemplatePresets.jsx
import { standardPatterns, otherPatterns } from '../data/templates';

// Helper to compute scaling factor to fit preview into 40px box
const getScale = (colSizes, rowSizes) => {
  const baseUnit = 16; // 1fr = 16px in preview (to fit more items)
  const totalWidth = colSizes.reduce((sum, size) => {
    if (size === '1fr') return sum + baseUnit;
    if (size.endsWith('fr')) return sum + parseFloat(size) * baseUnit;
    return sum + Math.min(parseInt(size) || baseUnit, 40);
  }, 0);
  const totalHeight = rowSizes.reduce((sum, size) => {
    if (size === '1fr') return sum + baseUnit;
    if (size.endsWith('fr')) return sum + parseFloat(size) * baseUnit;
    return sum + Math.min(parseInt(size) || baseUnit, 40);
  }, 0);
  const scale = Math.min(40 / totalWidth, 40 / totalHeight, 1);
  return { scale, totalWidth, totalHeight };
};

const MiniGridPreview = ({ cols, rows, colSizes, rowSizes, items }) => {
  const { scale, totalWidth, totalHeight } = getScale(colSizes, rowSizes);
  const baseUnit = 16;
  const pxColSizes = colSizes.map(size => {
    if (size === '1fr') return `${baseUnit}px`;
    if (size.endsWith('fr')) return `${parseFloat(size) * baseUnit}px`;
    return `${Math.min(parseInt(size) || baseUnit, 40)}px`;
  });
  const pxRowSizes = rowSizes.map(size => {
    if (size === '1fr') return `${baseUnit}px`;
    if (size.endsWith('fr')) return `${parseFloat(size) * baseUnit}px`;
    return `${Math.min(parseInt(size) || baseUnit, 40)}px`;
  });

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: '40px', height: '40px' }}
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

const TemplateGroup = ({ title, templates, onApplyTemplate }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</span>
    <div className="flex flex-wrap gap-2">
      {templates.map((tpl, idx) => (
        <button
          key={`${title}-${idx}`}
          onClick={() => onApplyTemplate(tpl)}
          className="group relative bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded p-1 transition-all duration-200 flex flex-col items-center gap-0.5 w-[56px]"
          title={tpl.name}
        >
          <MiniGridPreview
            cols={tpl.cols}
            rows={tpl.rows}
            colSizes={tpl.colSizes}
            rowSizes={tpl.rowSizes}
            items={tpl.items}
          />
          <span className="text-[8px] text-zinc-400 group-hover:text-zinc-200 truncate w-full text-center leading-tight">
            {tpl.name.length > 10 ? tpl.name.slice(0, 8) + '…' : tpl.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export const TemplatePresets = ({ onApplyTemplate, onReset }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <TemplateGroup
          title="Standard Patterns"
          templates={standardPatterns}
          onApplyTemplate={onApplyTemplate}
        />
        <TemplateGroup
          title="Other Layouts"
          templates={otherPatterns}
          onApplyTemplate={onApplyTemplate}
        />
      </div>
      <button
        onClick={onReset}
        className="border border-purple-500/50 hover:bg-purple-500/10 text-purple-400 px-4 py-2 text-sm font-semibold rounded transition self-start"
      >
        Reset Grid
      </button>
    </div>
  );
};

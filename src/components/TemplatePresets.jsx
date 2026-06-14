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
    name: 'Holy Grail Layout',
    cols: 3,
    rows: 3,
    colSizes: ['200px', '1fr', '200px'],
    rowSizes: ['80px', '1fr', '60px'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 4 },
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
      { id: 4, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 },
      { id: 5, rStart: 3, cStart: 1, rEnd: 4, cEnd: 4 },
    ],
  },
  {
    name: 'Asymmetric Split (2fr / 1fr)',
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
    name: 'Dashboard Grid',
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
];

export const TemplatePresets = ({ onApplyTemplate, onReset }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#161619] p-4 rounded-xl border border-zinc-800 gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Quick Preset Layouts:
        </span>
        <div className="flex flex-wrap gap-2 mt-1">
          {templates.map((tpl, idx) => (
            <button
              key={`template-${idx}`}
              onClick={() => onApplyTemplate(tpl)}
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 px-3 py-1.5 text-xs rounded transition font-medium"
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onReset}
        className="border border-purple-500/50 hover:bg-purple-500/10 text-purple-400 px-4 py-2 text-sm font-semibold rounded transition whitespace-nowrap self-end md:self-auto"
      >
        Reset Grid
      </button>
    </div>
  );
};

// components/GridSetupPanel.jsx
import React from 'react';

export const GridSetupPanel = ({
  numCols,
  setNumCols,
  colGap,
  setColGap,
  numRows,
  setNumRows,
  rowGap,
  setRowGap,
}) => {
  return (
    <div className="">
      <h3 className="text-md font-semibold mb-4 text-zinc-100">Grid setup:</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center justify-between gap-1.5">
          <label className="text-[14px] text-zinc-400">Columns</label>
          <input
            type="number"
            min="1"
            max="12"
            className="bg-zinc-800 border w-[70px] border-zinc-700 text-white px-3 py-1.5 text-sm  focus:outline-none focus:border-purple-500"
            value={numCols}
            onChange={e => setNumCols(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-2.5">
          <label className="text-[14px] text-zinc-400">Column Gap (px)</label>
          <input
            type="number"
            min="0"
            className="bg-zinc-800 border w-[70px] border-zinc-700 text-white px-3 py-1.5 text-sm  focus:outline-none focus:border-purple-500"
            value={colGap}
            onChange={e => setColGap(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-1.5">
          <label className="text-[14px] text-zinc-400">Rows</label>
          <input
            type="number"
            min="1"
            max="12"
            className="bg-zinc-800 border w-[70px] border-zinc-700 text-white px-3 py-1.5 text-sm  focus:outline-none focus:border-purple-500"
            value={numRows}
            onChange={e => setNumRows(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-1.5">
          <label className="text-[14px] text-zinc-400">Row Gap (px)</label>
          <input
            type="number"
            min="0"
            className="bg-zinc-800 border w-[70px] border-zinc-700 text-white px-3 py-1.5 text-sm  focus:outline-none focus:border-purple-500"
            value={rowGap}
            onChange={e => setRowGap(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
};

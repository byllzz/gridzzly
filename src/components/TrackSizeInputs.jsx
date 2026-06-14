// components/TrackSizeInputs.jsx
import React from 'react';

export const ColumnTrackInputs = ({ colSizes, setColSizes }) => (
  <div
    className="absolute top-2 left-10 right-10 h-7 grid gap-[2px]"
    style={{ gridTemplateColumns: colSizes.map(() => '1fr').join(' ') }}
  >
    {colSizes.map((size, idx) => (
      <input
        key={`col-in-${idx}`}
        type="text"
        className="w-full h-full bg-zinc-800 border border-zinc-700 text-center text-xs text-white rounded focus:outline-none focus:border-purple-500"
        value={size}
        onChange={e => {
          const next = [...colSizes];
          next[idx] = e.target.value;
          setColSizes(next);
        }}
      />
    ))}
  </div>
);

export const RowTrackInputs = ({ rowSizes, setRowSizes }) => (
  <div
    className="absolute top-10 bottom-10 left-2 w-7 grid gap-[2px]"
    style={{ gridTemplateRows: rowSizes.map(() => '1fr').join(' ') }}
  >
    {rowSizes.map((size, idx) => (
      <input
        key={`row-in-${idx}`}
        type="text"
        className="w-full h-full bg-zinc-800 border border-zinc-700 text-center text-xs text-white rounded focus:outline-none focus:border-purple-500"
        value={size}
        onChange={e => {
          const next = [...rowSizes];
          next[idx] = e.target.value;
          setRowSizes(next);
        }}
      />
    ))}
  </div>
);

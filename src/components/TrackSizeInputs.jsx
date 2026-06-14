// components/TrackSizeInputs.jsx
export const ColumnTrackInputs = ({ colSizes, setColSizes, colGap }) => (
  <div
    className="absolute -top-10 left-0 right-0 h-8 grid"
    style={{
      gridTemplateColumns: colSizes.join(' '),
      columnGap: `${colGap}px`,
      placeItems: 'center',
    }}
  >
    {colSizes.map((size, idx) => (
      <input
        key={`col-in-${idx}`}
        type="text"
        className="w-[60px] h-7 bg-zinc-800 border border-zinc-600 text-start pl-1.5 text-[16px] text-white focus:outline-none focus:border-purple-500"
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

export const RowTrackInputs = ({ rowSizes, setRowSizes, rowGap }) => (
  <div
    className="absolute -left-21 top-0 bottom-0 w-20 grid"
    style={{
      gridTemplateRows: rowSizes.join(' '),
      rowGap: `${rowGap}px`,
      placeItems: 'center',
    }}
  >
    {rowSizes.map((size, idx) => (
      <input
        key={`row-in-${idx}`}
        type="text"
        className="w-[60px] h-7 bg-zinc-800 border border-zinc-600 text-start pl-1.5 text-[16px] text-white focus:outline-none focus:border-purple-500"
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

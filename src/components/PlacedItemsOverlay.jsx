// components/PlacedItemsOverlay.jsx
import React from 'react';

export const PlacedItemsOverlay = ({ items, onDelete }) => {
  return (
    <>
      {items.map(item => (
        <div
          key={`placed-${item.id}`}
          style={{
            gridRow: `${item.rStart} / ${item.rEnd}`,
            gridColumn: `${item.cStart} / ${item.cEnd}`,
          }}
          className="bg-purple-900/80 border-2 border-purple-500 text-white p-2 text-xs font-bold relative rounded shadow-md flex items-start justify-between group overflow-hidden"
        >
          <span>.div{item.id}</span>
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="text-rose-400 hover:text-rose-600 font-extrabold text-sm ml-2 transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
};

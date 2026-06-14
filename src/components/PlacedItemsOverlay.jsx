// components/PlacedItemsOverlay.jsx

const getItemColor = id => {
  const hue = (id * 137) % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

export const PlacedItemsOverlay = ({ items, onDelete }) => {
  return (
    <>
      {items.map(item => {
        const bgColor = getItemColor(item.id);
        return (
          <div
            key={`placed-${item.id}`}
            style={{
              gridRow: `${item.rStart} / ${item.rEnd}`,
              gridColumn: `${item.cStart} / ${item.cEnd}`,
              backgroundColor: bgColor,
            }}
            className="border-2 border-white text-gray-900 px-1 text-[16px] font-primary relative shadow-md flex items-start justify-between group overflow-hidden pointer-events-auto"
          >
            <span>.div{item.id}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="text-white font-extrabold text-[22px] relative bottom-1.5 cursor-pointer"
            >
              ×
            </button>
          </div>
        );
      })}
    </>
  );
};

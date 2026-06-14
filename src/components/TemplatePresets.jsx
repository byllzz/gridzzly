// components/TemplatePresets.jsx
import React, { useRef, useState, useEffect } from 'react';
import { standardPatterns, otherPatterns } from '../data/templates';

// Merge all templates into one array
const allTemplates = [...otherPatterns, ...standardPatterns];

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

export const TemplatePresets = ({ onApplyTemplate, onReset }) => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle single button clicks to shift layout by increments
  const scroll = direction => {
    if (sliderRef.current) {
      const scrollAmount = 120; // Approximately two items worth of distance
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Drag-to-scroll implementation
  const handleMouseDown = e => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="flex flex-col gap-4 select-none w-full">
      {/* Top Header Block with Arrows */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Grid Patterns
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition border border-zinc-700"
            aria-label="Scroll Left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition border border-zinc-700"
            aria-label="Scroll Right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Slider Segment */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x ${
          isDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allTemplates.map((tpl, idx) => (
          <button
            key={`template-${idx}`}
            onClick={() => !isDown && onApplyTemplate(tpl)}
            className="group relative flex flex-col items-center gap-1 w-[56px] flex-shrink-0 snap-start"
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

      {/* Reset Action Trigger */}
      <button
        onClick={onReset}
        className="border rounded-full border-purple-500/50 hover:bg-purple-500 hover:text-white text-purple-400 px-4 py-2 text-sm font-semibold  transition self-start"
      >
        Reset Grid
      </button>
    </div>
  );
};

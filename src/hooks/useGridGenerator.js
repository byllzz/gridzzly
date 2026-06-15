// hooks/useGridGenerator.js
import { useState, useEffect } from 'react';

export const useGridGenerator = () => {
  // Grid Dimensions & Gaps
  const [numCols, setNumCols] = useState(5);
  const [numRows, setNumRows] = useState(5);
  const [colGap, setColGap] = useState(0);
  const [rowGap, setRowGap] = useState(0);

  // Track Sizing (e.g., ['1fr', '1fr', ...])
  const [colSizes, setColSizes] = useState(Array(5).fill('1fr'));
  const [rowSizes, setRowSizes] = useState(Array(5).fill('1fr'));

  // Placed Grid Items: { id, rStart, cStart, rEnd, cEnd }
  const [items, setItems] = useState([]);
  const [itemCounter, setItemCounter] = useState(1);

  // Mouse Selection State
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);

  // Live Generated Code
  const [cssCode, setCssCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');

  // Sync colSizes/rowSizes when numCols/numRows change
  useEffect(() => {
    const cols = Math.max(1, numCols || 1);
    const rows = Math.max(1, numRows || 1);

    setColSizes(prev => {
      const next = [...prev];
      while (next.length < cols) next.push('1fr');
      return next.slice(0, cols);
    });

    setRowSizes(prev => {
      const next = [...prev];
      while (next.length < rows) next.push('1fr');
      return next.slice(0, rows);
    });
  }, [numCols, numRows]);

  // Generate CSS & HTML whenever relevant state changes
  useEffect(() => {
    const compressTracks = tracks => {
      let result = [];
      let i = 0;
      while (i < tracks.length) {
        let count = 1;
        while (i + count < tracks.length && tracks[i] === tracks[i + count]) {
          count++;
        }
        if (count > 1) {
          result.push(`repeat(${count}, ${tracks[i]})`);
          i += count;
        } else {
          result.push(tracks[i]);
          i++;
        }
      }
      return result.join(' ');
    };

    let css = `.parent {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: ${compressTracks(colSizes)};\n`;
    css += `  grid-template-rows: ${compressTracks(rowSizes)};\n`;
    css += `  grid-column-gap: ${colGap}px;\n`;
    css += `  grid-row-gap: ${rowGap}px;\n`;
    css += `}\n`;

    items.forEach(item => {
      css += `\n.div${item.id} { grid-area: ${item.rStart} / ${item.cStart} / ${item.rEnd} / ${item.cEnd}; }`;
    });
    setCssCode(css);

    let html = `<div class="parent">\n`;
    items.forEach(item => {
      html += `  <div class="div${item.id}"></div>\n`;
    });
    html += `</div>`;
    setHtmlCode(html);
  }, [colSizes, rowSizes, colGap, rowGap, items]);

  // Drawing helpers
  const startDrawing = (row, col) => {
    setIsDrawing(true);
    setStartCell({ row, col });
    setHighlightedCells([{ row, col }]);
  };

  const updateDrawing = (row, col) => {
    if (!isDrawing || !startCell) return;
    const rMin = Math.min(startCell.row, row);
    const rMax = Math.max(startCell.row, row);
    const cMin = Math.min(startCell.col, col);
    const cMax = Math.max(startCell.col, col);
    const newHighlights = [];
    for (let r = rMin; r <= rMax; r++) {
      for (let c = cMin; c <= cMax; c++) {
        newHighlights.push({ row: r, col: c });
      }
    }
    setHighlightedCells(newHighlights);
  };

  const finishDrawing = () => {
    if (!isDrawing || highlightedCells.length === 0) return;

    // 1. Instantly turn off the drawing flag and wipe selection arrays
    // to force the background cells to lose their purple color right away
    setIsDrawing(false);
    setStartCell(null);

    let rStart = Infinity,
      rEnd = -Infinity;
    let cStart = Infinity,
      cEnd = -Infinity;

    highlightedCells.forEach(cell => {
      if (cell.row < rStart) rStart = cell.row;
      if (cell.row > rEnd) rEnd = cell.row;
      if (cell.col < cStart) cStart = cell.col;
      if (cell.col > cEnd) cEnd = cell.col;
    });

    // Clear highlights explicitly
    setHighlightedCells([]);

    // 2. Add the item using a functional state update to prevent batching race conditions
    setItems(prevItems => [
      ...prevItems,
      {
        id: itemCounter,
        rStart,
        cStart,
        rEnd: rEnd + 1,
        cEnd: cEnd + 1,
      },
    ]);

    setItemCounter(prev => prev + 1);
  };
  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  // reset everting
  const resetGrid = () => {
    setItems([]);
    setItemCounter(1);
    setNumCols(5);
    setNumRows(5);
    setColGap(0);
    setRowGap(0);
    setColSizes(Array(5).fill('1fr'));
    setRowSizes(Array(5).fill('1fr'));
  };

  const applyTemplate = tpl => {
    setNumCols(tpl.cols);
    setNumRows(tpl.rows);
    setColSizes(tpl.colSizes);
    setRowSizes(tpl.rowSizes);
    setItems(tpl.items);
    setItemCounter(tpl.items.length > 0 ? Math.max(...tpl.items.map(i => i.id)) + 1 : 1);
  };

  const generateRandomPattern = () => {
    // Random dimensions: 2 to 8 columns, 2 to 8 rows
    const cols = Math.floor(Math.random() * 7) + 2; // 2-8
    const rows = Math.floor(Math.random() * 7) + 2; // 2-8

    // Random track sizes: mix of '1fr', '2fr', '3fr', 'auto', 'minmax(50px, 1fr)'
    const trackOptions = ['1fr', '2fr', '3fr', 'auto', 'minmax(50px, 1fr)'];
    const randomTrack = () => trackOptions[Math.floor(Math.random() * trackOptions.length)];

    const colSizes = Array(cols)
      .fill()
      .map(() => randomTrack());
    const rowSizes = Array(rows)
      .fill()
      .map(() => randomTrack());

    // Generate random non-overlapping items
    const maxItems = Math.floor(Math.random() * 6) + 1; // 1 to 6 items
    const items = [];
    const occupied = new Set(); // tracks cells "row,col" strings

    const isOverlap = (rStart, cStart, rEnd, cEnd) => {
      for (let r = rStart; r < rEnd; r++) {
        for (let c = cStart; c < cEnd; c++) {
          if (occupied.has(`${r},${c}`)) return true;
        }
      }
      return false;
    };

    const markOccupied = (rStart, cStart, rEnd, cEnd) => {
      for (let r = rStart; r < rEnd; r++) {
        for (let c = cStart; c < cEnd; c++) {
          occupied.add(`${r},${c}`);
        }
      }
    };

    for (let id = 1; id <= maxItems; id++) {
      let attempts = 0;
      let placed = false;
      while (!placed && attempts < 50) {
        // random size: width 1-3, height 1-3, but not exceeding grid bounds
        const w = Math.min(Math.floor(Math.random() * 3) + 1, cols);
        const h = Math.min(Math.floor(Math.random() * 3) + 1, rows);
        const cStart = Math.floor(Math.random() * (cols - w + 1)) + 1;
        const rStart = Math.floor(Math.random() * (rows - h + 1)) + 1;
        const cEnd = cStart + w;
        const rEnd = rStart + h;

        if (!isOverlap(rStart, cStart, rEnd, cEnd)) {
          items.push({ id, rStart, cStart, rEnd, cEnd });
          markOccupied(rStart, cStart, rEnd, cEnd);
          placed = true;
        }
        attempts++;
      }
    }

    // Apply the generated pattern to state
    setNumCols(cols);
    setNumRows(rows);
    setColSizes(colSizes);
    setRowSizes(rowSizes);
    setItems(items);
    setItemCounter(items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1);
  };

  return {
    // state
    numCols,
    setNumCols,
    numRows,
    setNumRows,
    colGap,
    setColGap,
    rowGap,
    setRowGap,
    colSizes,
    setColSizes,
    rowSizes,
    setRowSizes,
    items,
    setItems,
    highlightedCells,
    cssCode,
    htmlCode,
    // actions
    startDrawing,
    updateDrawing,
    finishDrawing,
    deleteItem,
    resetGrid,
    applyTemplate,
    generateRandomPattern,
    setItemCounter,
  };
};

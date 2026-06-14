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

  // hooks/useGridGenerator.js (excerpt)
  const resetGrid = () => {
    setItems([]);
    setItemCounter(1);
    setNumCols(5);
    setNumRows(5);
    setColGap(0);
    setRowGap(0);
    setColSizes(Array(4).fill('1fr'));
    setRowSizes(Array(3).fill('1fr'));
  };

  const applyTemplate = tpl => {
    setNumCols(tpl.cols);
    setNumRows(tpl.rows);
    setColSizes(tpl.colSizes);
    setRowSizes(tpl.rowSizes);
    setItems(tpl.items);
    setItemCounter(tpl.items.length > 0 ? Math.max(...tpl.items.map(i => i.id)) + 1 : 1);
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
  };
};

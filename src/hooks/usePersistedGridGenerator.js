// src/hooks/usePersistedGridGenerator.js
import { useEffect, useRef } from 'react';
import { useGridGenerator } from './useGridGenerator';

const STORAGE_KEY = 'gridzzly-state';

export const usePersistedGridGenerator = () => {
  const gridState = useGridGenerator();
  const isInitialLoad = useRef(true);

  // Load from localStorage on mount (only once)
  useEffect(() => {
    if (!isInitialLoad.current) return;
    isInitialLoad.current = false;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        console.log('Loading saved state:', data);

        // Apply saved state
        if (data.numCols) gridState.setNumCols(data.numCols);
        if (data.numRows) gridState.setNumRows(data.numRows);
        if (data.colGap !== undefined) gridState.setColGap(data.colGap);
        if (data.rowGap !== undefined) gridState.setRowGap(data.rowGap);
        if (data.colSizes) gridState.setColSizes(data.colSizes);
        if (data.rowSizes) gridState.setRowSizes(data.rowSizes);
        if (data.items) gridState.setItems(data.items);
        if (data.itemCounter) gridState.setItemCounter(data.itemCounter);
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    } else {
      console.log('No saved state found. Using defaults.');
    }
  }, []); // Empty dependency array ensures it runs once

  // Save to localStorage on every state change
  useEffect(() => {
    // Skip saving on initial load to avoid overwriting
    if (isInitialLoad.current) return;

    const stateToSave = {
      numCols: gridState.numCols,
      numRows: gridState.numRows,
      colGap: gridState.colGap,
      rowGap: gridState.rowGap,
      colSizes: gridState.colSizes,
      rowSizes: gridState.rowSizes,
      items: gridState.items,
      itemCounter: gridState.itemCounter,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    console.log('Saved state:', stateToSave);
  }, [
    gridState.numCols,
    gridState.numRows,
    gridState.colGap,
    gridState.rowGap,
    gridState.colSizes,
    gridState.rowSizes,
    gridState.items,
    gridState.itemCounter,
  ]);

  // Clear all data
  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    gridState.resetGrid();
    console.log('Cleared all saved data');
  };

  return {
    ...gridState,
    clearAll,
  };
};

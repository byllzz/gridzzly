// data/templates.js

// Standard patterns (no items, just grid structure)
export const standardPatterns = [
  { name: '2x2', cols: 2, rows: 2, colSizes: ['1fr', '1fr'], rowSizes: ['1fr', '1fr'], items: [] },
  {
    name: '3x3',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: '4x4',
    cols: 4,
    rows: 4,
    colSizes: ['1fr', '1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: '2x3',
    cols: 2,
    rows: 3,
    colSizes: ['1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: '3x2',
    cols: 3,
    rows: 2,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [],
  },
  { name: '1x3', cols: 1, rows: 3, colSizes: ['1fr'], rowSizes: ['1fr', '1fr', '1fr'], items: [] },
  { name: '3x1', cols: 3, rows: 1, colSizes: ['1fr', '1fr', '1fr'], rowSizes: ['1fr'], items: [] },
  {
    name: '4x2',
    cols: 4,
    rows: 2,
    colSizes: ['1fr', '1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [],
  },
  {
    name: '2x4',
    cols: 2,
    rows: 4,
    colSizes: ['1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr', '1fr'],
    items: [],
  },
  {
    name: '5x5',
    cols: 5,
    rows: 5,
    colSizes: Array(5).fill('1fr'),
    rowSizes: Array(5).fill('1fr'),
    items: [],
  },
];

// Other patterns (complex layouts with items)
export const otherPatterns = [
  {
    name: 'Holy Grail',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '3fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 4 },
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
      { id: 4, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 },
      { id: 5, rStart: 3, cStart: 1, rEnd: 4, cEnd: 4 },
    ],
  },
  {
    name: 'Asymmetric Split',
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
    name: 'Dashboard',
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
  {
    name: 'Blog Layout',
    cols: 3,
    rows: 2,
    colSizes: ['1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 4 },
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 4 },
    ],
  },
  {
    name: 'Card Grid',
    cols: 3,
    rows: 3,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 2 },
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 3 },
      { id: 3, rStart: 1, cStart: 3, rEnd: 2, cEnd: 4 },
      { id: 4, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 5, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 },
      { id: 6, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 },
      { id: 7, rStart: 3, cStart: 1, rEnd: 4, cEnd: 2 },
      { id: 8, rStart: 3, cStart: 2, rEnd: 4, cEnd: 3 },
      { id: 9, rStart: 3, cStart: 3, rEnd: 4, cEnd: 4 },
    ],
  },
  {
    name: 'Magazine',
    cols: 4,
    rows: 3,
    colSizes: ['1fr', '1fr', '2fr', '1fr'],
    rowSizes: ['1fr', '2fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 5 },
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 },
      { id: 3, rStart: 2, cStart: 2, rEnd: 4, cEnd: 4 },
      { id: 4, rStart: 2, cStart: 4, rEnd: 3, cEnd: 5 },
      { id: 5, rStart: 3, cStart: 1, rEnd: 4, cEnd: 2 },
      { id: 6, rStart: 3, cStart: 4, rEnd: 4, cEnd: 5 },
    ],
  },
  {
    name: 'Header + 3 Cols',
    cols: 3,
    rows: 2,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '2fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 4 }, // header
      { id: 2, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 }, // left
      { id: 3, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 }, // center
      { id: 4, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 }, // right
    ],
  },
  {
    name: 'Sidebar + Main',
    cols: 2,
    rows: 1,
    colSizes: ['1fr', '3fr'],
    rowSizes: ['1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 2 }, // sidebar
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 3 }, // main
    ],
  },
  {
    name: 'Feature Grid',
    cols: 4,
    rows: 2,
    colSizes: ['1fr', '1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '1fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 3 }, // featured
      { id: 2, rStart: 1, cStart: 3, rEnd: 2, cEnd: 4 }, // small
      { id: 3, rStart: 1, cStart: 4, rEnd: 2, cEnd: 5 }, // small
      { id: 4, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 }, // small
      { id: 5, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 }, // small
      { id: 6, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 }, // small
      { id: 7, rStart: 2, cStart: 4, rEnd: 3, cEnd: 5 }, // small
    ],
  },
  {
    name: 'Pricing Table',
    cols: 3,
    rows: 2,
    colSizes: ['1fr', '1fr', '1fr'],
    rowSizes: ['1fr', '2fr'],
    items: [
      { id: 1, rStart: 1, cStart: 1, rEnd: 2, cEnd: 2 }, // header 1
      { id: 2, rStart: 1, cStart: 2, rEnd: 2, cEnd: 3 }, // header 2
      { id: 3, rStart: 1, cStart: 3, rEnd: 2, cEnd: 4 }, // header 3
      { id: 4, rStart: 2, cStart: 1, rEnd: 3, cEnd: 2 }, // price 1
      { id: 5, rStart: 2, cStart: 2, rEnd: 3, cEnd: 3 }, // price 2
      { id: 6, rStart: 2, cStart: 3, rEnd: 3, cEnd: 4 }, // price 3
    ],
  },
];

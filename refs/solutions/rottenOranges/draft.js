const { parse: p, stringify: s } = JSON;
const dd = (e) => p(s(e));

function runSingleCycle(grid) {
  const newGrid = dd(grid);
  let hasChanged = false;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // check current cell
      const currCell = grid[i][j];
      // if cell is a 2:
      if (currCell === 2) {
        // compile list of adjacent cells
        const adjacentCellsCoords = getAdjacentCells(
          j,
          i,
          grid[i].length,
          grid.length
        );
        // if any of adjacent cells are 1:
        // set hasChanged to true
        // change those 1's into 2's in newGrid

        for (const coords of adjacentCellsCoords) {
          const [x, y] = coords;
          const curr = grid[y][x];
          if (curr === 1) {
            hasChanged = true;
            newGrid[y][x] = 2;
          }
        }
      }
    }
  }
  // return hasChanged && newGrid;
  return {
    hasChanged,
    newGrid,
  };
}

function getAdjacentCells(x, y, w, h) {
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ].filter((el) => {
    const [x, y] = el;
    return x < w && y < h && x >= 0 && y >= 0;
  });
}
const gridHas1s = (g) => {
  return g.flat(Infinity).includes(1);
};

const orangesRotting = (g) => {
  if (!gridHas1s(g)) return 0;
  let cycleResult = runSingleCycle(g);
  if (!cycleResult.hasChanged) return -1;
  let i = 0;
  while (cycleResult.hasChanged) {
    i++;
    cycleResult = runSingleCycle(cycleResult.newGrid);
  }
  return gridHas1s(cycleResult.newGrid) ? -1 : i;
};

// const input1 = [
//   [2, 1, 1],
//   [1, 1, 0],
//   [0, 1, 1],
// ];

// const input2 = [
//   [2, 1, 1],
//   [0, 1, 1],
//   [1, 0, 1],
// ];

// const input3 = [[0, 2]];

// const ans = orangesRotting(input3);

// console.log(ans);

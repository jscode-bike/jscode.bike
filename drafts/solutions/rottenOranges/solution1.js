const orangesRotting = (g) => {
  let cycleResult = runSingleCycle(g);
  if (!cycleResult.hasOnes) return 0;
  if (!cycleResult.hasChanged) return -1;
  let i = 0;
  while (cycleResult.hasChanged) {
    i++;
    cycleResult = runSingleCycle(cycleResult.newGrid);
  }
  return cycleResult.hasOnes ? -1 : i;
};

function runSingleCycle(grid) {
  const newGrid = grid.map((row) => [...row]);
  let hasChanged = false;
  let hasOnes = false;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currCell = grid[i][j];
      if (currCell === 1) hasOnes = true;
      if (currCell === 2) {
        const adjacentCellsCoords = getAdjacentCells(
          j,
          i,
          grid[i].length,
          grid.length
        );

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
  return {
    hasChanged,
    newGrid,
    hasOnes,
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

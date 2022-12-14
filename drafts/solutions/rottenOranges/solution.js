const orangesRotting = (g) => {
  let cycleResult = runSingleCycle(g);
  if (!cycleResult.hasOnes) return 0;
  if (!cycleResult.hasChanged) return -1;
  let i = 0;
  while (cycleResult.hasChanged) {
    i++;
    cycleResult = runSingleCycle(cycleResult.newGrid, cycleResult.newTwos);
  }
  return cycleResult.hasOnes ? -1 : i;
};

function gridHasOnes(g) {
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (g[i][j] === 1) return true;
    }
  }
  return false;
}

const traverseWholeGrid = (grid) => {
  const newGrid = grid.map((row) => [...row]);
  let hasChanged = false;
  let hasOnes = false;
  const newTwos = [];

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
            newTwos.push(coords);
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
    newTwos,
  };
};

const justChangeNewTwos = (g, n2s) => {
  const newGrid = g.map((row) => [...row]);
  let hasChanged = false;
  const newTwos = [];

  for (let i = 0; i < n2s.length; i++) {
    const currCellCoords = n2s[i];
    const [x, y] = currCellCoords;
    const adjacentCellsCoords = getAdjacentCells(x, y, g[y].length, g.length);

    for (const coords of adjacentCellsCoords) {
      const [x, y] = coords;
      const curr = g[y][x];
      if (curr === 1) {
        hasChanged = true;
        newTwos.push(coords);
        newGrid[y][x] = 2;
      }
    }
  }

  return {
    hasChanged,
    newGrid,
    hasOnes: gridHasOnes(newGrid),
    newTwos,
  };
};

function runSingleCycle(grid, newTwos = []) {
  if (newTwos.length > 0) {
    return justChangeNewTwos(grid, newTwos);
  } else {
    return traverseWholeGrid(grid);
  }
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

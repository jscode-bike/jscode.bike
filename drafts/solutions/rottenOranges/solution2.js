const orangesRotting = (g) => {
  const q = [];
  const width = g.length;
  const height = g[0]?.length;
  let fresh = 0;

  for (let row = 0; row < g.length; row++) {
    for (let col = 0; col < g[row].length; col++) {
      const curr = g[row][col];
      if (curr === 2) {
        q.push([row, col]);
      } else if (curr === 1) {
        fresh++;
      }
    }
  }
  if (fresh.length === 0) return 0;

  let cycle = 0;
  while (q.length) {
    cycle++;
    const len = q.length;
    for (let idx = 0; idx < len; idx++) {
      const [row, col] = q.pop();
      const adjacentCells = getAdjacentCells(row, col, width, height);
      adjacentCells.forEach((cell) => {
        const [row, col] = cell;
        if (g[row][col] === 1) {
          q.push(cell);
        }
      });
    }
  }
  return cycle;
};

function getAdjacentCells(row, col, w, h) {
  return [
    [row, col - 1],
    [row, col + 1],
    [row - 1, col],
    [row + 1, col],
  ].filter((el) => {
    const [row, col] = el;
    return row < w && col < h && row >= 0 && col >= 0;
  });
}

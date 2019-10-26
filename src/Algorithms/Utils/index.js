
export function getAllNodes(grid) {
  const nodes = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      nodes.push(grid[y][x]);
    }
  }
  return nodes;
}
import { createNode } from './Node';

export function getInitialGrid(x, y, startNode, finishNode) {
  const nodes = []
  for (let j = 0; j < y; j++) {
    const currentRow = []
    for (let i = 0; i < x; i++) {
      let isStart = i === startNode.x && j === startNode.y ? true : false
      let isFinish = i === finishNode.x && j ===  finishNode.y ? true : false
      const currentNode = createNode(i, j, isStart, isFinish)
      currentRow.push(currentNode)
    }
    nodes.push(currentRow);
  }
  return nodes;
}

export function getNewGridWithWallToggled (nodes, x, y) {
  const newGrid = nodes.slice();
  const node = newGrid[y][x];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[y][x] = newNode;
  return newGrid;
};
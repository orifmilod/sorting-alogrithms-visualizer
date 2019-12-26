import { createNode } from './Node';
import * as nodeStates from '../../constants/nodeState';

export function getInitialGrid(x, y, startNode, finishNode) {
  const nodes = []
  for (let j = 0; j < y; j++) {
    const currentRow = []
    for (let i = 0; i < x; i++) {
      let state =
        i === startNode.x && j === startNode.y ? nodeStates.Start :
          i === finishNode.x && j === finishNode.y ? nodeStates.End :
            nodeStates.Default
      const currentNode = createNode(i, j, state);
      currentRow.push(currentNode)
    }
    nodes.push(currentRow);
  }
  return nodes;
}

export function getNewGridWithWallToggled(nodes, x, y) {
  const newGrid = nodes.slice();
  const node = newGrid[y][x];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[y][x] = newNode;
  return newGrid;
};
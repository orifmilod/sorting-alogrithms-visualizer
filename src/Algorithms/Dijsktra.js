/* 
  Performs Dijkstra's algorithm; returns *all* nodes in the order
  in which they were visited. Also makes nodes point back to their
  previous node, effectively allowing us to compute the shortest path
  by backtracking from the finish node.
*/
export function Dijkstra(nodes, startNode, finishNode) {
    if(!startNode || !finishNode || startNode === finishNode)
      return -1;

    const visitedNodesInOrder = [];
    nodes[startNode.col][startNode.row].distance = 0;
    const unvisitedNodes = getAllNodes(nodes);
    while (!!unvisitedNodes.length) {
      SortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // // If we encounter a wall, we skip it.
      // if (closestNode.isWall) continue;
      // // If the closest node is at a distance of infinity,
      // // we must be trapped and should therefore stop.
      // if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
      if(closestNode === finishNode)  
        return visitedNodesInOrder;

      UpdateUnvisitedNeighbors(closestNode, nodes);
    }
}

function UpdateUnvisitedNeighbors(currentNode, nodes) {
  const unvisitedNeighbors = GetUnvisitedNeighbors(currentNode, nodes);
  for (const neighbor of unvisitedNeighbors) {
    if(neighbor.distance > currentNode.distance + 1) {
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
    }
  }
}

function GetUnvisitedNeighbors(node, nodes) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function SortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function GetNodesInShortestPathOrder(finishNode)
{
  const nodesInShortestPathOrder = []
  let currentNode = finishNode;
  while(currentNode !== null)
  {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
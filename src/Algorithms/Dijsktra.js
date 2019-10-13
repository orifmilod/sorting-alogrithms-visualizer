/* 
  Performs Dijkstra's algorithm; returns *all* nodes in the order
  in which they were visited. Also makes nodes point back to their
  previous node, effectively allowing us to compute the shortest path
  by backtracking from the finish node.
*/

function Dijkstra(nodes, startNode, finishNode) {
    if(!startNode || !finishNode || startNode === finishNode)
      return -1;

    const visitedNodesInOrder = [];
    nodes[startNode].distance = 0;

    const unvisitedNodes = nodes.slice();
    while (!!unvisitedNodes.length) {
      const closestNode = SortNodesByDistance(unvisitedNodes);
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
      if(closestNode === finishNode)
        return 'Finished';

        UpdateUnvisitedNeighbors(closestNode, nodes);
    }
}


function SortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function UpdateUnvisitedNeighbors(closestNode, nodes) {
  const unvisitedNeighbors = GetUnvisitedNeighbors(closestNode, nodes);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode;
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

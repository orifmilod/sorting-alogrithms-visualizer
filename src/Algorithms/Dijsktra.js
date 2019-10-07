/* Performs Dijkstra's algorithm; returns *all* nodes in the order
in which they were visited. Also makes nodes point back to their
previous node, effectively allowing us to compute the shortest path
by backtracking from the finish node.*/

function Dijkstra(grid, startNode, finishNode) {
    if(!startNode || !finishNode || startNode === finishNode)
      return -1;
    
    nodes[startNode].distance = 0;
    while (unvisitedNodes.length) {
      SortNodesByDistance(unvisitedNodes);
    }
}


function SortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
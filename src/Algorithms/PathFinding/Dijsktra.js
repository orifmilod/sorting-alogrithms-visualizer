/* 
  Performs Dijkstra's algorithm; returns *all* nodes in the order
  in which they were visited. Also makes nodes point back to their
  previous node, effectively allowing us to compute the shortest path
  by backtracking from the finish node.
*/
import { getAllNodes } from '../Utils';
export default function Dijkstra(nodes, start, finish) {
    if(!start || !finish || start === finish)
      return -1;

    const startNode = nodes[start.y][start.x];
    const finishNode = nodes[finish.y][finish.x];
    const visitedNodesInOrder = [];
    nodes[startNode.y][startNode.x].distance = 0;
    const unvisitedNodes = getAllNodes(nodes);
    while (!!unvisitedNodes.length) {
      SortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) 
        return { checked: visitedNodesInOrder, path: -1 };
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
      if(closestNode === finishNode)   {
        const path = GetNodesInShortestPathOrder(finishNode);
        return { checked: visitedNodesInOrder, path };
      }

      UpdateUnvisitedNeighbors(closestNode, nodes);
    }
}

function UpdateUnvisitedNeighbors(currentNode, nodes) {
  const unvisitedNeighbors = GetUnvisitedNeighbors(currentNode, nodes);
  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    const neighbour = unvisitedNeighbors[i];
    if(neighbour.distance > currentNode.distance + 1) {
      neighbour.distance = currentNode.distance + 1;
      neighbour.previousNode = currentNode;
    }
  }
}

function GetUnvisitedNeighbors(node, nodes) {
  const neighbors = [];
  const { x, y } = node;
  //Top Side
  if (y > 0) neighbors.push(nodes[y - 1][x]);
  //Bottom side
  if (y < nodes.length - 1) neighbors.push(nodes[y  + 1][x]);
  //Right side
  if (x < nodes[0].length - 1) neighbors.push(nodes[y][x + 1]);
  //Left side
  if (x > 0) neighbors.push(nodes[y][x - 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}


function SortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


export function GetNodesInShortestPathOrder(finishNode)
{
  const nodesInShortestPathOrder = []
  let currentNode = finishNode;
  while(currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
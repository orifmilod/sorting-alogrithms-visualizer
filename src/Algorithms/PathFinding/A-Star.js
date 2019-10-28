import { getAllNodes } from '../Utils';

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function addNeighbours(nodes) {
  let row = nodes[0].length;
  let column = nodes.length;
  for (let y = 0; y < column; y++) {
    for (let x = 0; x < row; x++) {
      let neighbours = []
      if(y > 0)
        neighbours.push(nodes[y - 1][x]); //Top neighbour
      if(y < column - 1)
        neighbours.push(nodes[y + 1][x]); //Bottom neighbour
      if(x < row - 1)
        neighbours.push(nodes[y][x + 1]); //Right neighbour
      if(x > 0)
        neighbours.push(nodes[y][x - 1]); //Left neighbour

      //Diagonal neighbours
      if(x > 0 && y > 0)
        neighbours.push(nodes[y - 1][x - 1]); //Bottom-Left neighbour
      if(x < column - 1 && y > 0)
        neighbours.push(nodes[y - 1][x + 1]); //Bottom-Right neighbour
      if(x > 0 && y < column - 1)
        neighbours.push(nodes[y + 1][x - 1]); //Top-Left neighbour
      if(x < row - 1 && y < column - 1) //y > 0 && x < row - 1
        neighbours.push(nodes[y + 1][x + 1]); //Top-Right neighbour
      nodes[y][x].neighbours = neighbours;
    }
  }
  return nodes;
}

function getClosestNode(nodes) {
  //Keep checking the unchecked spots
  //Sorting by 2 priorities - Primary is totalDistance, if same we fallback for distance from startNode
  nodes.sort((a, b) => {
    const totalDistanceA = a.distance + a.heuristicDistance
    const totalDistanceB = b.distance + b.heuristicDistance
    if(totalDistanceA === totalDistanceB) return a.distance - b.distance;
    else return totalDistanceA - totalDistanceB
  });
  return nodes[0];
}

function calculateDistance(currentNode, neighbour) {
  const { x: nodeX, y: nodeY } = currentNode;
  const { x: neighbourX, y: neighbourY } = neighbour;
  if(
  (nodeX + 1 === neighbourX && nodeY === neighbourY ) ||
  (nodeX - 1 === neighbourX && nodeY === neighbourY) ||
  (nodeY + 1 === neighbourY && nodeX === neighbourX) ||
  (nodeY - 1 === neighbourY && nodeX === neighbourX))
    return 1
  if (
  (nodeX + 1 === neighbourX && nodeY + 1 === neighbourY) ||
  (nodeX + 1 === neighbourX && nodeY - 1 === neighbourY) ||
  (nodeX - 1 === neighbourY && nodeY - 1 === neighbourY) ||
  (nodeX - 1 === neighbourY && nodeY + 1 === neighbourY))
    return Math.sqrt(2)
}

export default function AStar(nodes, startNode, finishNode)
{
  //TODO: Catch edge cases.
  if(startNode.x === finishNode.x && startNode.y === finishNode.y)
    return -1;

  //Assigning Start Node distance.
  nodes[startNode.y][startNode.x].heuristicDistance = heuristic(startNode, finishNode);
  nodes[startNode.y][startNode.x].distance = 0;

  nodes = addNeighbours(nodes);  
  nodes = getAllNodes(nodes);
  let openNodes = [];
  let checked = [];
  openNodes.push(nodes[0]);

  while (openNodes.length > 0) {
    const currentNode = getClosestNode(openNodes);
    checked.push(currentNode);
    if(currentNode.x === finishNode.x && currentNode.y === finishNode.y) {
      let path = [];
      //Find the path -- trace back where it came from
      let temp = currentNode;
      path.push(temp);
      while(temp.previousNode) {
        path.push(temp.previousNode);
        temp = temp.previousNode;
      }
      return { checked, path }
    }
    openNodes = openNodes.filter(item => currentNode !== item);
    const neighbours = currentNode.neighbours;
  
    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      if(!neighbour.isWall && !checked.includes(neighbour)) {
        let distance = calculateDistance(currentNode, neighbour);
        distance += currentNode.distance;

        if(distance < neighbour.distance) {
          neighbour.previousNode = currentNode;
          const heuristicDist = heuristic(neighbour, finishNode);
          neighbour.heuristicDistance = heuristicDist;
          neighbour.distance = distance;
          checked.push(neighbour)
        }
        if(!openNodes.includes(neighbour)) {
          openNodes.push(neighbour);
        }
      }
    }
  }
  return 'There is no solution! 😓';
}

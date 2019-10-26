import { getAllNodes } from '../Utils';
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function addNeighbours(nodes)
{ 
  let row = nodes[0].length;
  let column = nodes.length;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < column; y++) {
      let neighbours = []
      if(y > 0)
        neighbours.push(nodes[y - 1][x]);   //Top neighbour
      if(y < row - 1)
        neighbours.push(nodes[y  + 1][x]);   //Bottom neighbour
      if(x < column - 1)
        neighbours.push(nodes[y][x + 1]);   //Right neighbour
      if(x > 0)
        neighbours.push(nodes[y][x - 1]);   //Left neighbour
      //Diagonal neighbours 
      if(x > 0 && y > 0)
        neighbours.push(nodes[y - 1][x - 1]); //Bottom-Left neighbour
      if(x < column - 1 && y > 0)
        neighbours.push(nodes[y - 1][x + 1]); //Bottom-Right neighbour
      if(x > 0 && y < row - 1)
        neighbours.push(nodes[y + 1][x - 1]); //Top-Left neighbour
      if(x < column - 1 && y < row - 1)
        neighbours.push(nodes[y + 1][x + 1]); //Top-Right neighbour
      nodes[y][x].neighbours = neighbours;

      nodes[y][x].totalDistance = Infinity;
    }
  }
  return nodes;
}  

function getClosestNode(nodes) {
  //Keep checking the unchecked spots
  nodes.sort((a, b) => a.totalDistance - b.totalDistance);
  return nodes[0];
}

function calculateDistance(currentNode, neighbour) {
  const { nodeX, nodeY } = currentNode;
  const { neighbourX, neighbourY } = neighbour;
  if( 
    (nodeX + 1 === neighbourX) || 
    (nodeX - 1 === neighbourX) || 
    (nodeY + 1 === neighbourY) || 
    (nodeY - 1 === neighbourY))
    return currentNode.distance + 1
  if (
    (nodeX + 1 === neighbourX && nodeY + 1 === neighbourY) || 
    (nodeX + 1 === neighbourX && nodeY - 1 === neighbourY) || 
    (nodeX - 1 === neighbourY && nodeY - 1 === neighbourY) || 
    (nodeX - 1 === neighbourY && nodeY + 1 === neighbourY))
    return currentNode.distance + Math.sqrt(2)
}

export default function AStar(nodes, startNode, finishNode) 
{
  //TODO: Catch edge cases.
  if(startNode.x === finishNode.x && startNode.y === finishNode.y)
    return 'Already In Finish'

  //Assigning Start Node distance.
  const heuristicDistance = heuristic(startNode, finishNode);
  nodes[startNode.y][startNode.x].heuristicDistance = heuristicDistance
  nodes[startNode.y][startNode.x].distance = 0;
  nodes[startNode.y][startNode.x].totalDistance = heuristicDistance;

  nodes = addNeighbours(nodes);            
  nodes = getAllNodes(nodes);
  let openNodes = [];
  let closedNodes = [];
  openNodes.push(nodes[0]);
  while (openNodes.length > 0)  {
    let currentNode = getClosestNode(openNodes);
    if(currentNode.x === finishNode.x && currentNode.y === finishNode.y) {
      let path = [];
      //Find the path -- trace back where it came from
      let temp = currentNode;
      path.push(temp);
      while(temp.prevNode) {
        path.push(temp.prevNode);
        temp = temp.prevNode;
      }
      return { closedNodes,  path }
    }
    openNodes = openNodes.filter(item => currentNode !== item);
    closedNodes.push(currentNode);
    let neighbours = currentNode.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if(!closedNodes.includes(neighbour) && !neighbour.isWall) {
        let tempDistance = calculateDistance(currentNode, neighbour); 
        if(tempDistance < neighbour.distance) {
          neighbour.heuristicDistance = heuristic(neighbour, finishNode);
          neighbour.totalDistance = tempDistance + neighbour.heuristicDistance;
          neighbour.distance = tempDistance;
          neighbour.prevNode = currentNode;
        }
        if(openNodes.includes(neighbour)) {
          openNodes.push(neighbour)
        }
      } 
    }
  }
  console.log('NO SOLUTION');
  return 'There is no solution! 😓';
}
import React, { useState, useEffect } from 'react'
import { Dijkstra, GetNodesInShortestPathOrder } from '../../Algorithms/PathFinding/Dijsktra';
import AStar from '../../Algorithms/PathFinding/A-Star';
import Node, {createNode} from './Node';
import './Pathfinding-Visualizer.css';

const START_NODE_Y = 0;
const START_NODE_X = 0;
const FINISH_NODE_Y = 20;
const FINISH_NODE_X = 15
export default function PathfindingVisualizer() {
  const [nodes, updateNodes] = useState([]);
  const [mouseIsPressed, updateMousePressed] = useState(false);
  
  const [startRow, updateRow] = useState(0);
  const [startCol, updateCol] = useState(0);
  
  useEffect(() => {
    const nodes = getInitialGrid(55, 25);
    updateNodes(nodes)
  }, [])

  function visualizeDijstra () {
    const startNode = nodes[START_NODE_Y][START_NODE_X]
    const finishNode = nodes[FINISH_NODE_Y][FINISH_NODE_X];
    const visitedNodesInOrder = Dijkstra(nodes, startNode, finishNode);
    const nodesInShortedPathOrder = GetNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortedPathOrder);
  }

  function visualizeAStar () {
    const startNode = nodes[START_NODE_Y][START_NODE_X]
    const finishNode = nodes[FINISH_NODE_Y][FINISH_NODE_X];
    const { checked, path } = AStar(nodes, startNode, finishNode);
    animateDijkstra(checked, path);
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  function handleMouseDown(x, y) {
    const newNodes = getNewGridWithWallToggled(nodes, x, y);
    updateNodes(newNodes)
    updateMousePressed(true);
  }

  function handleMouseEnter(x, y) {
    if (!mouseIsPressed) return;
    const newNodes = getNewGridWithWallToggled(nodes, x, y);
    updateNodes(newNodes)
  }

  function handleMouseUp() {
    updateMousePressed(false);
  }
  return (
    <div>
        <button type="primary" onClick={visualizeDijstra}> Visualize Dijkstra </button>
        <button type="primary" onClick={visualizeAStar}> Visualize A* </button>
        <div className='grid'>
          {nodes.map((row, indexRow) => {
            return (
              <div className='column' key={indexRow}> 
                {row.map((node, nodeIndex) => (
                  <Node key={nodeIndex} node={node} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter}/>
                ))}
              </div>
            )
          })}
      </div>
     </div>
  )  
}
function getInitialGrid(x, y) {
  const nodes = []
  for (let j = 0; j < y; j++) {
    const currentRow = []
    for (let i = 0; i < x; i++) {
      let isStart = i === START_NODE_X && j === START_NODE_Y ? true : false
      let isFinish = i === FINISH_NODE_X && j ===  FINISH_NODE_Y ? true : false
      const currentNode = createNode(i, j, isStart, isFinish)
      currentRow.push(currentNode)
    }
    nodes.push(currentRow);
  }
  return nodes;
}

function getNewGridWithWallToggled (nodes, x, y) {
  const newGrid = nodes.slice();
  const node = newGrid[y][x];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[y][x] = newNode;
  return newGrid;
};
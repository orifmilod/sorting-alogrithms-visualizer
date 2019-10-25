import React, { useState, useEffect } from 'react'
import { Dijkstra, GetNodesInShortestPathOrder } from '../Algorithms/Dijsktra';
import Node from './Node';
import './Pathfinding-Visualizer.css';

const START_NODE_Y = 0;
const START_NODE_X = 0;
const FINISH_NODE_Y = 18;
const FINISH_NODE_X = 9;

export default function PathfindingVisualizer(params) {
  const [nodes, updateNodes] = useState([]);
  const [mouseIsPressed, updateMousePressed] = useState(false);

  useEffect(() => {
    const nodes = getInitialGrid(65, 25);
    updateNodes(nodes)
  }, [])

  function visualizeDijstra () {
    const startNode = nodes[START_NODE_Y][START_NODE_X]
    const finishNode = nodes[FINISH_NODE_Y][FINISH_NODE_X];
    const visitedNodesInOrder = Dijkstra(nodes, startNode, finishNode);
    const nodesInShortedPathOrder = GetNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortedPathOrder);
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
    <>
    <button onClick={visualizeDijstra}> Visualize </button>
    <div className='grid'>
      {nodes.map((row, indexRow) => {
        return (
          <div key={indexRow}> 
            {row.map((node, nodeIndex) => (
              <Node key={nodeIndex} node={node} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter}/>
            ))}
          </div>
        )
      })}
    </div>
  </>
  )  
}
function getInitialGrid(x, y) {
  const nodes = []
  for (let j = 0; j < y; j++) {
    const currentRow = []
    for (let i = 0; i < x; i++) {
      const currentNode = createNode(i, j)
      currentRow.push(currentNode)
    }
    nodes.push(currentRow);
  }
  return nodes;
}

function createNode(x, y) {
  return {
    x,
    y,
    isStart: x === START_NODE_X && y === START_NODE_Y,
    isFinish: x === FINISH_NODE_X && y ===  FINISH_NODE_Y,
    distance: Infinity,
    isWall: false,
    isVisited: false,
    previousNode: null
  }
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
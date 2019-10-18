import React, { Component } from 'react'

import { Dijkstra, GetNodesInShortestPathOrder } from '../Algorithms/Dijsktra';
import Node from './Node';
import './Pathfinding-Visualizer.css';

const START_NODE_Y = 0;
const START_NODE_X = 0;
const FINISH_NODE_Y = 18;
const FINISH_NODE_X = 9;

export default class PathfindingVisualizer extends Component {
  state = {
    nodes: [], 
  }
  componentDidMount() {
    const nodes = getInitialGrid(65, 25)
    this.setState({ nodes });
  }
  visualizeDijstra = () => {
    const { nodes } = this.state;

    const startNode = nodes[START_NODE_Y][START_NODE_X]
    const finishNode = nodes[FINISH_NODE_Y][FINISH_NODE_X];
    const visitedNodesInOrder = Dijkstra(nodes, startNode, finishNode);
    const nodesInShortedPathOrder = GetNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortedPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }
  render() {
    const { nodes } = this.state;
    return (
      <>
        <button onClick={this.visualizeDijstra}> Visualize </button>
        <div className='grid'>
          {nodes.map((row, indexRow) => {
            return (
              <div key={indexRow}> 
                {row.map((node, nodeIndex) => <Node node={node}> </Node>)}
              </div>
            )
          })}
        </div>
      </>
    )
  }
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

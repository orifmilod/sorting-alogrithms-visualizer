import React, { Component } from 'react'
import Node from './Node';

import './Pathfinding-Visualizer.css';
import { Dijkstra, GetNodesInShortestPathOrder } from '../Algorithms/Dijsktra';
const START_NODE_COL = 0;
const START_NODE_ROW = 0;
const FINISH_NODE_COL = 3;
const FINISH_NODE_ROW = 4;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    }
  }
  componentDidMount() {
    const nodes = getInitialGrid(10, 10)
    this.setState({ nodes });
  }
  visualizeDijstra = () => {
    const { nodes } = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL]
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(nodes, startNode, finishNode);
    const nodesInShortedPathOrder = GetNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortedPathOrder);
  }
  animateDijkstra = (visitedNodesInOrder, nodesInShortedPathOrder) => {
    for (let i = 0; i < nodesInShortedPathOrder.length; i++) {
      const { row, col } = nodesInShortedPathOrder[i]
      document.getElementById(`node-${col}-${row}`).className = 'node node-visited'
    }
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
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
  render() {
    const { nodes } = this.state;
    return (
      <>
        <button onClick={this.visualizeDijstra}>
          Visualize
        </button>
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
function getInitialGrid(row, col) {
  const nodes = []
  for (let i = 0; i < row; i++) {
    const currentRow = []
    for (let j = 0; j < col; j++) {
      const currentNode = createNode(i, j)
      currentRow.push(currentNode)
    }
    nodes.push(currentRow);
  }
  return nodes;
}

function createNode(col, row) {
  return {
    col,
    row,
    isStart: col === START_NODE_COL && row === START_NODE_ROW,
    isFinish: col === FINISH_NODE_COL && row ===  FINISH_NODE_ROW,
    distance: Infinity,
    isWall: false,
    isVisited: false,
    previousNode: null
  }
}

import React, { Component } from 'react'
import Node from './Node';

import './Pathfinding-Visualizer.css';
import Dijsktra from '../Algorithms/Dijsktra';
const START_NODE_COL = 1;
const START_NODE_ROW = 1;
const FINISH_NODE_COL = 10;
const FINISH_NODE_ROW = 15;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    }
  }
  componentDidMount() {
    const nodes = getInitialGrid(20, 50)
    this.setState({ nodes });
  }
  visualizeDijstra = () => {
    const { nodes } = this.state;
    const startNode = nodes[START_NODE_ROW][START_NODE_COL]
    const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijsktra(nodes, startNode, finishNode);


    console.log('Visualize dijkstra')

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

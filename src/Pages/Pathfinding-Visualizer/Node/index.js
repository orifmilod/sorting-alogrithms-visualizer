import React from 'react'
import * as nodeStates from '../../../constants/nodeState';
import './Node.css';

export function createNode(x, y, state) {
  return {
    x,
    y,
    state,
    previousNode: null,
    distance: Infinity,
    heuristicDistance: Infinity,
  }
}

export function getNodeClass(state) {
  const stateClass = {
    [nodeStates.Wall]: 'wall',
    [nodeStates.End]: 'finish',
    [nodeStates.Start]: 'start',
    [nodeStates.Default]: 'open',
    [nodeStates.Visited]: 'visited',
    [nodeStates.ShortestPath]: 'shortest-path',
  }
  return `node ${stateClass[state]}`;
}

export function getNodeID(x, y) {
  return `node-${x}-${y}`
}

export default ({ node, onMouseDown, onMouseUp, onMouseEnter }) => {
  const { x, y, state } = node;
  return (
    <div
      id={getNodeID(x, y)}
      className={getNodeClass(state)}
      onMouseUp={() => onMouseUp(x, y)}
      onMouseDown={() => onMouseDown(x, y)}
      onMouseEnter={() => onMouseEnter(x, y)}
    />
  )
}


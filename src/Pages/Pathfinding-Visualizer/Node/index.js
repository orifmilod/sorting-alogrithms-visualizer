import React from 'react'
import './Node.css';

export function createNode(x, y, isStart, isFinish) {
  return {
    x,
    y,
    isStart,
    isFinish,
    isWall: false,
    isVisited: false,
    previousNode: null,
    distance: Infinity,
    heuristicDistance: Infinity,
  }
}

const Node = ({ node, onMouseDown, onMouseUp, onMouseEnter }) => {
  const { x, y, isStart, isFinish, isWall } = node;
  const extraClassess =
    isStart ? 'node-start'
      : isFinish ? 'node-finish'
        : isWall ? 'node-wall'
          : 'node-open'
  return (
    <div
      id={`node-${x}-${y}`}
      className={`node ${extraClassess}`}
      onMouseUp={() => onMouseUp(x, y)}
      onMouseDown={() => onMouseDown(x, y)}
      onMouseEnter={() => onMouseEnter(x, y)}
    />
  )
}

export default Node;

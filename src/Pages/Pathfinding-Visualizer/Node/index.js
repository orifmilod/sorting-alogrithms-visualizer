import React from 'react'
import './Node.css';

export function createNode(x, y, isStart, isFinish) {
  return {
    x,
    y,
    isStart,
    isFinish,
    distance: Infinity,
    heuristicDistance: Infinity,
    isWall: false,
    isVisited: false,
    previousNode: null,
  }
}

const Node = (props) => {
  const { node, onMouseDown, onMouseUp, onMouseEnter } = props;
  const { x, y, isStart, isFinish, isWall } = node;
  const extraClassess = 
    isStart ? 'node-start' 
    : isFinish ? 'node-finish' 
    : isWall ? 'node-wall'
    : ''
  return (
    <div
      id={`node-${x}-${y}`} 
      className={`node ${extraClassess}`}
      onMouseDown={() => onMouseDown(x, y)}
      onMouseUp={() => {console.log('UP'); onMouseUp(x, y)}}
      onMouseEnter={() => onMouseEnter(x, y)}
    />
  )
}
 
export default Node;

import React from 'react'
import './Node.css';

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
      onMouseUp={() => onMouseUp(x, y)}
      onMouseEnter={() => onMouseEnter(x, y)}
    />
  )
}
 
export default Node;

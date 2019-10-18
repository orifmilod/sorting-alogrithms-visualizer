import React from 'react'
import './Node.css';

const Node = (props) => {
  const { node } = props;
  const { x, y, isStart, isFinish } = node;
  const extraClassess = 
    isStart ? 'node-start' 
    : isFinish ? 'node-finish' 
    : ''
  return (
    <div id={`node-${x}-${y}`} className={`node ${extraClassess}`}/>
  )
}
 
export default Node;

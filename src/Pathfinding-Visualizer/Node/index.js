import React from 'react'
import './Node.css';

const Node = (props) => {
  const { node } = props;
  const { col, row, isStart, isFinish } = node;
  const extraClassess = 
    isStart ? 'node-start' 
    : isFinish ? 'node-finish' 
    : ''
  return (
    <div id={`node-${col}-${row}`} className={`node ${extraClassess}`}/>
  )
}
 
export default Node;

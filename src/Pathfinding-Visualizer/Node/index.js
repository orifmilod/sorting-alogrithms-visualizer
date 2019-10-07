import React, { Component } from 'react'
import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    const { node } = this.props;
    const { col, row, isStart, isFinish } = node;
    const extraClassess = 
      isStart ? 'node-start' 
      : isFinish ? 'node-finish' 
      : ''
    return (
      <div className={`node ${extraClassess}`}>
      </div>
    )
  }
}

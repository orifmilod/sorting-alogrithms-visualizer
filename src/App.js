import React, { Component } from 'react';
import PathfindingVisualizer from './Pathfinding-Visualizer'
import { BubbleSort } from './Algorithms/Sorting/Bubble';
import { MergeSort } from './Algorithms/Sorting/Merge';

class App extends Component {
  state = {
    numbers: []
  }
  componentDidMount(){
    let numbers = []
    for(let i = 1000000; i > 0; i--) {
      numbers.push(i)
    }
    this.setState({ numbers })
  }

  handleMergeSort = () => {
    const { numbers } = this.state
    const t1 = performance.now();
    const sorted = MergeSort(numbers)
    const t2 = performance.now();
    console.log(t2 - t1)
    console.log(sorted);
  }

  handleBubbleSort = () => {
    const { numbers } = this.state
    const t1 = performance.now();
    const sorted = BubbleSort(numbers)
    const t2 = performance.now();
    console.log(t2 - t1)
    console.log(sorted);
  }
  render() {    
    return (
      <>
        <PathfindingVisualizer/>
        {/* <button onClick={this.handleBubbleSort}> Bubble Sort </button>
        <button onClick={this.handleMergeSort}> Merge Sort </button> */}
      </>
    )
  }
}
export default App;

import React, { useState, useEffect } from 'react'
import { BubbleSort } from './Algorithms/Sorting/Bubble';
import { MergeSort } from './Algorithms/Sorting/Merge';

export default function SortingVisualizer() {
  const [numbers, updateNumbers] = useState([]);
  useEffect(() => {
    let numbers = []
    for(let i = 10000; i > 0; i--) {
      numbers.push(i)
    }
    updateNumbers({ numbers })
  }, []);
  function handleMergeSort(){
    const { numbers } = this.state
    const t1 = performance.now();
    const sorted = MergeSort(numbers)
    const t2 = performance.now();
    console.log(t2 - t1)
    console.log(sorted);
  }

  function handleBubbleSort(){
    const { numbers } = this.state
    const t1 = performance.now();
    const sorted = BubbleSort(numbers)
    const t2 = performance.now();
    console.log(t2 - t1)
    console.log(sorted);
  }
  return (
    <div>
      Sorting Visualizer
    </div>
  )
}

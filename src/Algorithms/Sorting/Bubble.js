import { createItem } from '../../Pages/Sorting-Visualizer/Item';
import * as itemStates from '../../constants/itemState';
import minimumValue from '../../constants/itemMinimum';

export default function bubbleSort(unsortedArray) {
  //Deep cloning array
  const arr = JSON.parse(JSON.stringify(unsortedArray));

  let sorted = false;
  const history = [];
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
      history.push(createItem(i, arr[i].value + minimumValue, itemStates.Comparing));
      history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Comparing));

      //swap the numbers
      if (arr[i].value > arr[i + 1].value) {
        arr[i].value = arr[i].value + arr[i + 1].value;
        arr[i + 1].value = arr[i].value - arr[i + 1].value
        arr[i].value = arr[i].value - arr[i + 1].value
        sorted = false;
        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Swapping));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Swapping));
      } else {
        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Sorted));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Sorted));
      }
    }

    if (sorted)
      return { sorted: arr, history };
  }
}


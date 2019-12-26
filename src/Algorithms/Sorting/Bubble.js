import { createItem } from '../../Pages/Sorting-Visualizer/Item';
import * as itemStates from '../../constants/itemState';
import minimumValue from '../../constants/itemMinimum';

export function bubblesSort(unsortedArray) {
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
      }
      history.push(createItem(i, arr[i].value + minimumValue, itemStates.Sorted));
      history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Sorted));
    }

    if (sorted)
      return { sorted: arr, history };
  }
}

export default function bubbleSort(unsortedArr) {
  var swapped;
  const arr = JSON.parse(JSON.stringify(unsortedArr));
  const history = []
  do {
    swapped = false;
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) {
        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Comparing));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Comparing));

        arr[i].value = arr[i].value + arr[i + 1].value;
        arr[i + 1].value = arr[i].value - arr[i + 1].value
        arr[i].value = arr[i].value - arr[i + 1].value
        swapped = true;

        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Swapping));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Swapping));

        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Default));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Default));
      }
      else {
        history.push(createItem(i, arr[i].value + minimumValue, itemStates.Sorted));
        history.push(createItem(i + 1, arr[i + 1].value + minimumValue, itemStates.Sorted));
      }
    }
  } while (swapped);
  return { sorted: arr, history };
}


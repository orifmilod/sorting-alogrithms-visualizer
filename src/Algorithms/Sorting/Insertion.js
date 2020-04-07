import { createItem } from '../../Pages/Sorting-Visualizer/Item';
import * as itemStates from '../../constants/itemState';
import minimumValue from '../../constants/itemMinimum';


export default function insertionSort(unsortedArray, arrayLength = unsortedArray.length) {
  const arr = JSON.parse(JSON.stringify(unsortedArray));
  const history = []

  for (let i = 1; i < arrayLength; i++) {
    let key = arr[i];
    let j = i - 1;
    history.push(createItem(i, arr[i].value + minimumValue, itemStates.Comparing))
    //Sort in the ascending order
    while (j >= 0 && arr[j].value > key.value) {
      history.push(createItem(j, arr[j].value + minimumValue, itemStates.Comparing))

      history.push(createItem(j, arr[j].value + minimumValue, itemStates.Swapping))
      history.push(createItem(j + 1, arr[j + 1].value + minimumValue, itemStates.Swapping))

      history.push(createItem(j + 1, arr[j + 1].value + minimumValue, itemStates.Default))
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;

    history.push(createItem(i, arr[i].value + minimumValue, itemStates.Default))
    history.push(createItem(j + 1, arr[j + 1].value + minimumValue, itemStates.Default))
  }
  return { sorted: arr, history };
}

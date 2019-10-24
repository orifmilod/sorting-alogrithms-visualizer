export function MergeSort(arr) {
  if(arr.length === 1)
    return arr;
  
  const middle = Math.floor(arr.length / 2);
  let arr2 = [...arr.splice(0, middle)];
  arr = MergeSort(arr);
  arr2 = MergeSort(arr2);
  let result = Merge(arr, arr2)
  return result
}

function Merge(arr1, arr2) {
  //check if start of one is smaller than 2 just return the merged one with concat
  let tempArr = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if(arr1[0] > arr2[0]) 
      tempArr.push(arr2.shift())
    else 
      tempArr.push(arr1.shift())
  }
  if(arr1.length > 0)
   tempArr = tempArr.concat(arr1.slice(0, arr1.length))
  else if(arr2.length > 0)
    tempArr = tempArr.concat(arr2.slice(0, arr2.length))
    
  return tempArr;
}


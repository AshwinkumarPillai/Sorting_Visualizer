function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].val > arr[j + 1].val) {
        arr = swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

export default bubbleSort;

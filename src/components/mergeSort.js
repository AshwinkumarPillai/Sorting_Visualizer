import React from "react";

const mergeSortColorHelper = async (props, arr, m, n, l, k) => {
  await props.setDelay(0);
  if (m + n === l) arr[k].bgcolor = props.successColor;
  else arr[k].bgcolor = props.successBufferColor;
  await props.updateMainArray(arr);
  return arr;
};

const merge = async (props, arr, low, mid, high) => {
  let l = arr.length,
    m = mid - low + 1,
    n = high - mid;
  let leftArray = new Array(m);
  let rightArray = new Array(n);

  let i, j, k;

  for (i = 0; i < m; i++) {
    await props.setDelay(0);
    arr[low + i].bgcolor = props.secondaryColor;
    leftArray[i] = arr[low + i].val;
    await props.updateMainArray(arr);
  }

  for (j = 0; j < n; j++) {
    await props.setDelay(0);
    arr[mid + j + 1].bgcolor = props.bufferColor;
    rightArray[j] = arr[mid + j + 1].val;
    await props.updateMainArray(arr);
  }

  await props.setDelay(0);
  i = 0;
  j = 0;
  k = low;
  while (i < m && j < n) {
    if (leftArray[i] <= rightArray[j]) {
      arr = await mergeSortColorHelper(props, arr, m, n, l, k);
      arr[k].val = leftArray[i];
      i++;
      k++;
    } else {
      arr = await mergeSortColorHelper(props, arr, m, n, l, k);
      arr[k].val = rightArray[j];
      j++;
      k++;
    }
  }

  while (i < m) {
    arr = await mergeSortColorHelper(props, arr, m, n, l, k);
    arr[k].val = leftArray[i];
    i++;
    k++;
  }

  while (j < n) {
    arr = await mergeSortColorHelper(props, arr, m, n, l, k);
    arr[k].val = rightArray[j];
    j++;
    k++;
  }
};

const mergeSortHelper = async (props, arr, low, high) => {
  if (low >= high) return;
  let mid = low + Math.floor((high - low) / 2);
  await mergeSortHelper(props, arr, low, mid);
  await mergeSortHelper(props, arr, mid + 1, high);
  await merge(props, arr, low, mid, high);
};

const mergeSortAnimation = async (props) => {
  props.disableButtons();
  let arr = props.array;
  let n = arr.length;
  await mergeSortHelper(props, arr, 0, n - 1);
  await props.updateMainArray(arr);
  props.endAlgo();
};

export default function mergeSort(props) {
  return (
    <button
      className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
      onClick={() => mergeSortAnimation(props)}
      disabled={props.isDisabled}
    >
      Merge Sort
    </button>
  );
}

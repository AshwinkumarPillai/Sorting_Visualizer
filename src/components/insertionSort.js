import React from "react";

const insertionSortAnimation = async (props) => {
  props.disableButtons();

  let arr = props.array;
  let n = arr.length;
  let i, j, k;

  arr = await props.setColor(arr, 0, props.successColor);

  for (i = 1; i < n; i++) {
    arr = await props.setColor(arr, i, props.secondaryColor);

    await props.setDelay(0);

    k = arr[i].val;
    j = i - 1;
    while (j >= 0 && arr[j].val > k) {
      arr = await props.setColor(arr, j, props.secondaryColor);
      arr[j + 1].val = arr[j].val;
      j -= 1;
      await props.setDelay(0);
      for (let t = i; t >= 0; t--) {
        arr = await props.setColor(arr, t, props.successColor);
      }
    }
    arr[j + 1].val = k;
    arr = await props.setColor(arr, i, props.successColor);
  }
  await props.updateMainArray(arr);
  props.endAlgo();
};

export default function insertionSort(props) {
  return (
    <button
      className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
      onClick={() => insertionSortAnimation(props)}
      disabled={props.isDisabled}
    >
      Insertion Sort
    </button>
  );
}

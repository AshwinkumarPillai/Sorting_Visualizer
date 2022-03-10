import React from "react";

const bubbleSortAnimation = async (props) => {
  props.disableButtons();
  let arr = props.array;
  let n = props.array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      arr = await props.setColor(arr, j, props.secondaryColor);
      arr = await props.setColor(arr, j + 1, props.secondaryColor);

      await props.setDelay(0);

      if (arr[j].val > arr[j + 1].val) {
        arr = props.swap(arr, j, j + 1);
      }

      arr = await props.setColor(arr, j, props.primaryColor);
      arr = await props.setColor(arr, j + 1, props.primaryColor);
    }
    arr[n - i - 1].bgcolor = props.successColor;
    arr = await props.setColor(arr, n - i - 1, props.successColor);
    props.updateMainArray(arr);
  }
  arr = await props.setColor(arr, 0, props.successColor);
  props.endAlgo();
};

export default function bubbleSort(props) {
  return (
    <button
      className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
      onClick={() => bubbleSortAnimation(props)}
      disabled={props.isDisabled}
    >
      Bubble Sort
    </button>
  );
}

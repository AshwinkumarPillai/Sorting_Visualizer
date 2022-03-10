import React from "react";

const selectionSortAnimation = async (props) => {
  props.disableButtons();
  let arr = props.array;
  let n = arr.length;
  let i, j, minIndex;

  for (i = 0; i < n - 1; i++) {
    minIndex = i;
    arr = await props.setColor(arr, minIndex, "black");
    for (j = i + 1; j < n; j++) {
      arr = await props.setColor(arr, j, props.secondaryColor);
      await props.setDelay(0);
      if (arr[j].val < arr[minIndex].val) {
        if (minIndex !== i) {
          arr = await props.setColor(arr, minIndex, props.primaryColor);
        }
        minIndex = j;
      } else {
        arr = await props.setColor(arr, j, props.primaryColor);
      }
    }

    await props.setDelay(0);

    arr = props.swap(arr, minIndex, i);
    arr = await props.setColor(arr, minIndex, props.primaryColor);
    arr = await props.setColor(arr, i, props.successColor);
  }
  arr = await props.setColor(arr, n - 1, props.successColor);
  props.endAlgo();
};

export default function selectionSort(props) {
  return (
    <button
      className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
      onClick={() => selectionSortAnimation(props)}
      disabled={props.isDisabled}
    >
      Selection Sort
    </button>
  );
}

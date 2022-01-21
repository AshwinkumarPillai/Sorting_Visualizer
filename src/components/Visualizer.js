import React, { Component } from "react";
import "../css/visualizer.css";
// import bubbleSort from "./bubbleSort";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.colorSetPrimary = ["#54a0ff", "#0C2461", "#ff9f43"];
    this.colorSetSecondary = ["#be2edd", "yellow", "#ee5253"];
    this.state = {
      array: [],
      arraySize: 60,
      primaryColor: this.colorSetPrimary[0],
      secondaryColor: this.colorSetSecondary[0],
      successColor: "#6ab04c",
      visSpeed: 100,
      containerColor: "white",
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  setDelay = async (speed) => {
    let delay = speed === 0 ? this.state.visSpeed : speed;
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
  };

  generateArray = () => {
    const array = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      array.push({ val: this.getRandomValue(10, 500), bgcolor: this.state.primaryColor });
    }
    this.setState({ array });
  };

  getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  changeArraySize = async (e) => {
    await this.setState({ arraySize: e.target.value });
    this.generateArray();
  };

  choosePrimaryColor = async (i) => {
    await this.setState({ primaryColor: this.colorSetPrimary[i] });
  };

  swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    arr[i].bgcolor = this.state.primaryColor;
    arr[j].bgcolor = this.state.primaryColor;
    return arr;
  };

  setColor = async (arr, i, color) => {
    arr[i].bgcolor = color;
    await this.setState({ array: arr });
    return arr;
  };

  bubbleSort = async () => {
    let arr = this.state.array;
    let n = this.state.arraySize;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        arr = await this.setColor(arr, j, this.state.secondaryColor);
        arr = await this.setColor(arr, j + 1, this.state.secondaryColor);

        await this.setDelay(0);

        if (arr[j].val > arr[j + 1].val) {
          arr = this.swap(arr, j, j + 1);
        }
        arr = await this.setColor(arr, j, this.state.primaryColor);
        arr = await this.setColor(arr, j + 1, this.state.primaryColor);
      }
      arr[n - i - 1].bgcolor = this.state.successColor;
      arr = await this.setColor(arr, n - i - 1, this.state.successColor);
      this.setState({ array: arr });
    }
    arr = await this.setColor(arr, 0, this.state.successColor);
  };

  selectionSort = async () => {
    let arr = this.state.array;
    let n = arr.length;
    let i, j, minIndex;
    for (i = 0; i < n - 1; i++) {
      minIndex = i;
      arr = await this.setColor(arr, minIndex, "black");
      for (j = i + 1; j < n; j++) {
        arr = await this.setColor(arr, j, this.state.secondaryColor);

        if (arr[j].val < arr[minIndex].val) {
          if (minIndex !== i) {
            arr = await this.setColor(arr, minIndex, this.state.primaryColor);
          }
          minIndex = j;
        } else {
          arr = await this.setColor(arr, j, this.state.primaryColor);
        }
      }

      await this.setDelay(0);

      arr = this.swap(arr, minIndex, i);
      arr = await this.setColor(arr, minIndex, this.state.primaryColor);
      arr = await this.setColor(arr, i, this.state.successColor);
    }
    arr = await this.setColor(arr, n - 1, this.state.successColor);
  };

  insertionSort = async () => {
    let arr = this.state.array;
    let n = arr.length;
    let i, j, k;
    arr = await this.setColor(arr, 0, this.state.successColor);
    for (i = 1; i < n; i++) {
      arr = await this.setColor(arr, i, this.state.secondaryColor);

      await this.setDelay(0);

      k = arr[i].val;
      j = i - 1;
      while (j >= 0 && arr[j].val > k) {
        arr = await this.setColor(arr, j, this.state.secondaryColor);
        arr[j + 1].val = arr[j].val;
        j -= 1;
        await this.setDelay(0);
        for (let t = i; t >= 0; t--) {
          arr = await this.setColor(arr, t, this.state.successColor);
        }
      }
      arr[j + 1].val = k;
      arr = await this.setColor(arr, i, this.state.successColor);
    }
    await this.setState({ array: arr });
  };

  endAlgo = async () => {
    await this.setState({ disableButtons: false, containerColor: "black" });
    await this.setDelay(300);
    await this.setState({ containerColor: "white" });
  };

  visualizeAlgo = async (algo) => {
    await this.setState({ disableButtons: true });

    switch (algo) {
      case "bubble":
        await this.bubbleSort();
        await this.endAlgo();
        break;
      case "selection":
        await this.selectionSort();
        await this.endAlgo();
        break;
      case "insertion":
        await this.insertionSort();
        await this.endAlgo();
        break;
      default:
        break;
    }
  };

  changeVisSpeed = (e) => {
    this.setState({ visSpeed: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="indigo darken-1 navbar">
          <div className="nav-wrapper">
            <span className="nav_heading">Sorting Visualizer</span>
            <ul className="right nav_btn_container">
              <li>
                <button
                  className="nav_btn btn btn-small black-text text-darken-2 teal lighten-2"
                  onClick={this.generateArray}
                  disabled={this.state.disableButtons}
                >
                  Generate New Array
                </button>
              </li>
              <li>
                <button
                  className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
                  onClick={() => this.visualizeAlgo("bubble")}
                  disabled={this.state.disableButtons}
                >
                  Bubble Sort
                </button>
              </li>
              <li>
                <button
                  className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
                  onClick={() => this.visualizeAlgo("selection")}
                  disabled={this.state.disableButtons}
                >
                  Selection Sort
                </button>
              </li>
              <li>
                <button
                  className="nav_btn btn btn-small black-text text-darken-2 purple accent-1"
                  onClick={() => this.visualizeAlgo("insertion")}
                  disabled={this.state.disableButtons}
                >
                  Insertion Sort
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid controls_container">
          <div className="container controls_container_inner">
            <div className="row">
              <div className="col s2">
                <label className="controls_label">Number</label>
              </div>
              <div className="col s10">
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={this.state.arraySize}
                  onChange={this.changeArraySize}
                  disabled={this.state.disableButtons}
                  className="controls control_size"
                />
              </div>
            </div>

            <div className="row">
              <div className="col s2">
                <label className="controls_label">Speed</label>
              </div>

              <div className="col s10">
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={this.state.visSpeed}
                  onChange={this.changeVisSpeed}
                  className="controls control_speed speedInput"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container">
          {this.colorSetPrimary.map((color, index) => (
            <span
              className="color_palette"
              style={{
                background: `${color}`,
              }}
              key={index}
              onClick={() => this.choosePrimaryColor(index)}
            >
              H
            </span>
          ))}
        </div> */}
        <div className="container array_container" style={{ display: "flex", backgroundColor: this.state.containerColor }}>
          {this.state.array.map((obj, index) => (
            <div
              className="arr_bars"
              key={index}
              style={{
                flex: 1,
                margin: "1px",
              }}
            >
              <div
                className="arr_bars_span"
                key={index}
                style={{
                  backgroundColor: obj.bgcolor,
                  height: `${obj.val}px`,
                  margin: "1px",
                }}
              ></div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Visualizer;

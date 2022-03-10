import React, { Component } from "react";
import "../css/visualizer.css";
import { isMobile } from "react-device-detect";
import BubbleSort from "../components/bubbleSort";
import SelectionSort from "../components/selectionSort";
import InsertionSort from "../components/insertionSort";
import MergeSort from "../components/mergeSort";

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
      bufferColor: "#642771",
      successColor: "#6ab04c",
      successBufferColor: "#274e13",
      visSpeed: 100,
      containerColor: "white",
      selectedAlgo: "bubble",
      showNumbers: false,
      disableButtons: false,
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

  updateMainArray = async (arr) => {
    await this.setState({ array: arr });
  };

  disableButtons = async () => {
    await this.setState({ disableButtons: true });
  };

  endAlgo = async () => {
    await this.setState({ disableButtons: false, containerColor: "black" });
    await this.setDelay(300);
    await this.setState({ containerColor: "white" });
  };

  selectAlgo = async (algo) => {
    await this.setState({ selectedAlgo: algo.target.value });
  };

  changeVisSpeed = (e) => {
    this.setState({ visSpeed: e.target.value });
  };

  toggleShowNumbers = () => {
    this.setState({ showNumbers: !this.state.showNumbers });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="indigo darken-1 navbar">
          <div className="nav-wrapper">
            <span className="nav_heading">Sorting Visualizer</span>
            <ul className="right nav_btn_container">
              {!isMobile ? (
                <React.Fragment>
                  <li>
                    <button className="nav_btn btn btn-small black-text text-darken-2 teal lighten-2" onClick={this.toggleShowNumbers}>
                      Show Numbers
                    </button>
                  </li>
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
                    <BubbleSort
                      array={this.state.array}
                      isDisabled={this.state.disableButtons}
                      setColor={this.setColor}
                      setDelay={this.setDelay}
                      updateMainArray={this.updateMainArray}
                      swap={this.swap}
                      primaryColor={this.state.primaryColor}
                      secondaryColor={this.state.secondaryColor}
                      successColor={this.state.successColor}
                      endAlgo={this.endAlgo}
                      disableButtons={this.disableButtons}
                    />
                  </li>
                  <li>
                    <SelectionSort
                      array={this.state.array}
                      isDisabled={this.state.disableButtons}
                      setColor={this.setColor}
                      setDelay={this.setDelay}
                      swap={this.swap}
                      primaryColor={this.state.primaryColor}
                      secondaryColor={this.state.secondaryColor}
                      successColor={this.state.successColor}
                      endAlgo={this.endAlgo}
                      disableButtons={this.disableButtons}
                    />
                  </li>
                  <li>
                    <InsertionSort
                      array={this.state.array}
                      isDisabled={this.state.disableButtons}
                      setColor={this.setColor}
                      setDelay={this.setDelay}
                      updateMainArray={this.updateMainArray}
                      swap={this.swap}
                      primaryColor={this.state.primaryColor}
                      secondaryColor={this.state.secondaryColor}
                      successColor={this.state.successColor}
                      endAlgo={this.endAlgo}
                      disableButtons={this.disableButtons}
                    />
                  </li>
                  <li>
                    <MergeSort
                      array={this.state.array}
                      isDisabled={this.state.disableButtons}
                      setColor={this.setColor}
                      setDelay={this.setDelay}
                      updateMainArray={this.updateMainArray}
                      swap={this.swap}
                      primaryColor={this.state.primaryColor}
                      secondaryColor={this.state.secondaryColor}
                      successColor={this.state.successColor}
                      successBufferColor={this.state.successBufferColor}
                      bufferColor={this.state.bufferColor}
                      endAlgo={this.endAlgo}
                      disableButtons={this.disableButtons}
                    />
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    {this.state.selectedAlgo === "bubble" ? (
                      <BubbleSort
                        array={this.state.array}
                        isDisabled={this.state.disableButtons}
                        setColor={this.setColor}
                        setDelay={this.setDelay}
                        updateMainArray={this.updateMainArray}
                        swap={this.swap}
                        primaryColor={this.state.primaryColor}
                        secondaryColor={this.state.secondaryColor}
                        successColor={this.state.successColor}
                        endAlgo={this.endAlgo}
                        disableButtons={this.disableButtons}
                      />
                    ) : null}
                    {this.state.selectedAlgo === "selection" ? (
                      <SelectionSort
                        array={this.state.array}
                        isDisabled={this.state.disableButtons}
                        setColor={this.setColor}
                        setDelay={this.setDelay}
                        swap={this.swap}
                        primaryColor={this.state.primaryColor}
                        secondaryColor={this.state.secondaryColor}
                        successColor={this.state.successColor}
                        endAlgo={this.endAlgo}
                        disableButtons={this.disableButtons}
                      />
                    ) : null}
                    {this.state.selectedAlgo === "insertion" ? (
                      <InsertionSort
                        array={this.state.array}
                        isDisabled={this.state.disableButtons}
                        setColor={this.setColor}
                        setDelay={this.setDelay}
                        updateMainArray={this.updateMainArray}
                        swap={this.swap}
                        primaryColor={this.state.primaryColor}
                        secondaryColor={this.state.secondaryColor}
                        successColor={this.state.successColor}
                        endAlgo={this.endAlgo}
                        disableButtons={this.disableButtons}
                      />
                    ) : null}

                    {this.state.selectedAlgo === "mergeSort" ? (
                      <MergeSort
                        array={this.state.array}
                        isDisabled={this.state.disableButtons}
                        setColor={this.setColor}
                        setDelay={this.setDelay}
                        updateMainArray={this.updateMainArray}
                        swap={this.swap}
                        primaryColor={this.state.primaryColor}
                        secondaryColor={this.state.secondaryColor}
                        successColor={this.state.successColor}
                        successBufferColor={this.state.successBufferColor}
                        bufferColor={this.state.bufferColor}
                        endAlgo={this.endAlgo}
                        disableButtons={this.disableButtons}
                      />
                    ) : null}
                  </li>
                  <li>
                    <div className="input-field col s12">
                      <select
                        onChange={this.selectAlgo}
                        style={{ width: "20px", height: "30px", marginTop: "5px" }}
                        className="browser-default purple accent-1"
                        disabled={this.state.disableButtons}
                      >
                        <option value={"bubble"}>Bubble Sort</option>
                        <option value={"selection"}>Selection Sort</option>
                        <option value={"insertion"}>Insertion Sort</option>
                        <option value={"mergeSort"}>Merge Sort</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <button
                      className="nav_btn btn btn-small black-text text-darken-2 teal lighten-2"
                      onClick={this.generateArray}
                      disabled={this.state.disableButtons}
                    >
                      New Array
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
        <div className="container-fluid controls_container">
          <div className="container controls_container_inner">
            <div className="row controls_row">
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
              >
                {this.state.showNumbers ? obj.val : null}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Visualizer;

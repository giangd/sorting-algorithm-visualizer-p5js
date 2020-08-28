import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
import bubbleSketch from "./sketches/bubble";
import quickSketch from "./sketches/quick";
import insertionSketch from "./sketches/insertion";
import mergeSketch from "./sketches/merge";
import selectionSketch from "./sketches/selection";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./custom.scss";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            randomArray: [],
            nearlySortedArray: [],
            reversedArray: [],
            fewSortedArray: [],
            speed: 20,
            // numBars: 20,
            numBars: 40,
            canvasWidth: 160,
            canvasHeight: 120,
            isPlaying: false,
            shouldReset: false,
        };
    }

    handleSpeedChange = (event) => {
        this.setState({
            speed: Number(event.target.value),
        });
    };

    handleNumBarsChange = (event) => {
        let newNumBars = Number(event.target.value);
        this.initializeData(newNumBars);
        this.setState({ isPlaying: true });
    };

    handleClick = () => {
        this.setState((prevState) => {
            return {
                isPlaying: !prevState.isPlaying,
            };
        });
    };

    handleReset = () => {
        this.setState(
            {
                shouldReset: true,
                isPlaying: true,
            },
            () => {
                this.setState({
                    shouldReset: false,
                });
            }
        );
    };

    componentDidMount() {
        this.initializeData();
    }

    initializeData = (newNumBars = undefined) => {
        // since this function is called when component mounts but also when user changes numBars, have to decide and use the most up-to-date version of numBars
        let numBars = newNumBars ? newNumBars : this.state.numBars;

        const randomArray = [];
        const nearlySortedArray = [];
        const reversedArray = [];
        for (let i = 0; i < numBars; i++) {
            randomArray.push(Math.random() * numBars);
            nearlySortedArray[i] = randomArray[i];
            reversedArray[i] = randomArray[i];
        }

        nearlySortedArray.sort((a, b) => a - b);
        for (let i = 0; i < numBars / 5; i++) {
            let i1 = Math.floor(Math.random() * numBars);
            let i2 = Math.floor(Math.random() * numBars);
            [nearlySortedArray[i1], nearlySortedArray[i2]] = [
                nearlySortedArray[i2],
                nearlySortedArray[i1],
            ];
        }

        reversedArray.sort((a, b) => b - a);

        const fewSortedArray = [];
        const groupSize = 5;
        for (let i = 0; i < Math.ceil(numBars / groupSize); i++) {
            let repeatedValue = Math.random() * numBars;
            for (let j = 0; j < groupSize; j++) {
                fewSortedArray.push(repeatedValue);
            }
        }

        // todo: test fewSortedArrays

        console.log(fewSortedArray);
        console.log(
            randomArray.length,
            nearlySortedArray.length,
            reversedArray.length,
            fewSortedArray
        );

        this.setState({
            randomArray: randomArray,
            nearlySortedArray: nearlySortedArray,
            reversedArray: reversedArray,
            fewSortedArray: fewSortedArray,
            // isPlaying: true,
            numBars: numBars,
        });
    };

    render() {
        const {
            randomArray,
            nearlySortedArray,
            reversedArray,
            fewSortedArray,
            ...data
        } = this.state;
        // console.log(`randomArray: ${randomArray} data: ${data}`);
        // console.log(data);
        let playButtonText = this.state.isPlaying ? "Pause" : "Play";
        let playButtonVariant = this.state.isPlaying ? "warning" : "success";

        // console.log(
        //     `width: ${this.state.canvasWidth} type: ${typeof this.state
        //         .canvasWidth}`
        // );
        console.log(window.innerWidth);
        return (
            <div className="app">
                <h1 className="headline">Sorting Algorithm Visualizer</h1>
                <div className="controls">
                    {/* <button onClick={this.handleClick}>{buttonText}</button> */}
                    <div className="buttons">
                        <Button
                            className="play-button"
                            variant={playButtonVariant}
                            onClick={this.handleClick}
                        >
                            {playButtonText}
                        </Button>
                        <Button
                            className="reset-button"
                            onClick={this.handleReset}
                            variant="secondary"
                        >
                            Reset
                        </Button>
                    </div>

                    <div className="speed-controls">
                        <Form.Label>Speed</Form.Label>
                        <Form.Control
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            id="speed"
                            onChange={this.handleSpeedChange}
                            value={this.state.speed}
                        />
                    </div>

                    <div className="num-bar-controls">
                        <Form.Label>Number of Bars</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.numBars}
                            onChange={this.handleNumBarsChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="80">80</option>
                            <option value="160">160</option>
                        </Form.Control>
                    </div>
                </div>

                {/* <P5Wrapper sketch={sketch} color={this.state.color}></P5Wrapper> */}
                <div className="grid-container">
                    {/* 1st row */}
                    <div></div>
                    <p className="sort-name">Bubble</p>
                    <p className="sort-name">Insertion</p>
                    <p className="sort-name">Merge</p>
                    <p className="sort-name">Quick</p>
                    <p className="sort-name">Selection</p>

                    {/* 2nd row */}
                    <p className="array-name">Random</p>
                    <P5Wrapper
                        sketch={bubbleSketch}
                        array={randomArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={insertionSketch}
                        array={randomArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={mergeSketch}
                        array={randomArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={quickSketch}
                        array={randomArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={selectionSketch}
                        array={randomArray}
                        {...data}
                    ></P5Wrapper>

                    {/* 3rd row */}
                    <p className="array-name">Almost Sorted</p>
                    <P5Wrapper
                        sketch={bubbleSketch}
                        array={nearlySortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={insertionSketch}
                        array={nearlySortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={mergeSketch}
                        array={nearlySortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={quickSketch}
                        array={nearlySortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={selectionSketch}
                        array={nearlySortedArray}
                        {...data}
                    ></P5Wrapper>

                    {/* 4th row */}
                    <p className="array-name">Reversed</p>
                    <P5Wrapper
                        sketch={bubbleSketch}
                        array={reversedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={insertionSketch}
                        array={reversedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={mergeSketch}
                        array={reversedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={quickSketch}
                        array={reversedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={selectionSketch}
                        array={reversedArray}
                        {...data}
                    ></P5Wrapper>

                    {/* 5th row */}
                    <p className="array-name">Many Similar</p>
                    <P5Wrapper
                        sketch={bubbleSketch}
                        array={fewSortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={insertionSketch}
                        array={fewSortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={mergeSketch}
                        array={fewSortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={quickSketch}
                        array={fewSortedArray}
                        {...data}
                    ></P5Wrapper>
                    <P5Wrapper
                        sketch={selectionSketch}
                        array={fewSortedArray}
                        {...data}
                    ></P5Wrapper>
                </div>
            </div>
        );
    }
}

export default App;
// 1920-890-126-180

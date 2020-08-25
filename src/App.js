import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
import bubbleSketch from "./sketches/bubble";
import heapSketch from "./sketches/heap";
import insertionSketch from "./sketches/insertion";
import mergeSketch from "./sketches/merge";
import selectionSketch from "./sketches/selection";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            speed: 1,
            // numBars: 20,
            numBars: 50,
            randomArray: [],
            canvasWidth: 300,
            canvasHeight: 200,
            isPlaying: false,
        };
        // this.randomColor = this.randomColor.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: Number(event.target.value),
        });
    };

    handleClick = (event) => {
        this.setState((prevState) => {
            return {
                isPlaying: !prevState.isPlaying,
            };
        });
    };

    componentDidMount() {
        const newRandomArray = [];
        for (let i = 0; i < this.state.numBars; i++) {
            newRandomArray.push(Math.floor(Math.random() * 100));
        }
        this.setState((prevState) => {
            return {
                randomArray: newRandomArray,
            };
        });
    }

    render() {
        let buttonText = this.state.isPlaying ? "Pause" : "Play";
        return (
            <div>
                <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    id="speed"
                    onChange={this.handleChange}
                    value={this.state.speed}
                />
                <button onClick={this.handleClick}>{buttonText}</button>
                <P5Wrapper sketch={sketch} color={this.state.color}></P5Wrapper>
                <P5Wrapper sketch={bubbleSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={heapSketch}></P5Wrapper>
                <P5Wrapper sketch={insertionSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={mergeSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={selectionSketch} {...this.state}></P5Wrapper>
            </div>
        );
    }
}

export default App;

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
            numBars: 20,
            randomArray: [],
            canvasWidth: 300,
            canvasHeight: 200,
        };
        // this.randomColor = this.randomColor.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: Number(event.target.value),
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
                <button onClick={this.randomColor}>Random Color</button>
                <P5Wrapper sketch={sketch} color={this.state.color}></P5Wrapper>
                <P5Wrapper
                    sketch={bubbleSketch}
                    speed={this.state.speed}
                    randomArray={this.state.randomArray}
                    canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}
                ></P5Wrapper>
                <P5Wrapper sketch={heapSketch}></P5Wrapper>
                <P5Wrapper
                    sketch={insertionSketch}
                    speed={this.state.speed}
                    randomArray={this.state.randomArray}
                    canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}
                ></P5Wrapper>
                <P5Wrapper sketch={mergeSketch}></P5Wrapper>
                <P5Wrapper
                    sketch={selectionSketch}
                    speed={this.state.speed}
                    randomArray={this.state.randomArray}
                    canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}
                ></P5Wrapper>
            </div>
        );
    }
}

export default App;

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
            color: [
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
            ],
            speed: 5,
        };
        // this.randomColor = this.randomColor.bind(this);
    }

    randomColor = () => {
        this.setState({
            color: [
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
            ],
        });
    };

    handleChange = (event) => {
        console.log("change");
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

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
                ></P5Wrapper>
                <P5Wrapper sketch={heapSketch}></P5Wrapper>
                <P5Wrapper sketch={insertionSketch}></P5Wrapper>
                <P5Wrapper sketch={mergeSketch}></P5Wrapper>
                <P5Wrapper sketch={selectionSketch}></P5Wrapper>
            </div>
        );
    }
}

export default App;

import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
import bubbleSketch from "./sketches/bubble";
import quickSketch from "./sketches/quick";
import insertionSketch from "./sketches/insertion";
import mergeSketch from "./sketches/merge";
import selectionSketch from "./sketches/selection";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            speed: 20,
            // numBars: 20,
            numBars: 40,
            randomArray: [],
            canvasWidth: 300,
            canvasHeight: 200,
            isPlaying: false,
        };
    }

    handleSpeedChange = (event) => {
        this.setState({
            speed: Number(event.target.value),
        });
    };

    handleNumBarsChange = (event) => {
        // this.setState(
        //     {
        //         numBars: Number(event.target.value),
        //     },
        //     this.initializeData
        // );
        let newNumBars = Number(event.target.value);
        // console.log(`   newNumBars: ${newNumBars}`);
        this.initializeData(newNumBars);
        // console.log(`size changed to ${Number(event.target.value)}`);
        // ();
    };

    handleClick = () => {
        this.setState((prevState) => {
            return {
                isPlaying: !prevState.isPlaying,
            };
        });
    };

    componentDidMount() {
        this.initializeData();
    }

    initializeData = (newNumBars = undefined) => {
        // since this function is called when component mounts but also when user changes numBars, have to decide and use the most up-to-date version of numBars
        let numBars = newNumBars ? newNumBars : this.state.numBars;

        const newRandomArray = [];
        for (let i = 0; i < numBars; i++) {
            newRandomArray.push(Math.floor(Math.random() * 100));
        }

        this.setState((prevState) => {
            return {
                randomArray: newRandomArray,
                isPlaying: false,
                numBars: numBars,
            };
        });
    };

    render() {
        let buttonText = this.state.isPlaying ? "Pause" : "Play";
        return (
            <div>
                <div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        id="speed"
                        onChange={this.handleSpeedChange}
                        value={this.state.speed}
                    />
                    <label htmlFor="speed">Speed</label>
                </div>

                <div>
                    <label>
                        Number of bars:
                        <select
                            value={this.state.numBars}
                            onChange={this.handleNumBarsChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>
                <button onClick={this.handleClick}>{buttonText}</button>
                <P5Wrapper sketch={sketch} color={this.state.color}></P5Wrapper>
                <P5Wrapper sketch={bubbleSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={insertionSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={mergeSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={quickSketch} {...this.state}></P5Wrapper>
                <P5Wrapper sketch={selectionSketch} {...this.state}></P5Wrapper>
            </div>
        );
    }
}

export default App;

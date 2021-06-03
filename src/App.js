import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./custom.scss";
import "./App.css";

import Controls from "./components/Controls";
import Graphs from "./components/Graphs";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            randomArray: [],
            nearlySortedArray: [],
            reversedArray: [],
            fewSortedArray: [],
            speed: 20,
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

        // console.log(fewSortedArray);
        // console.log(
        //     randomArray.length,
        //     nearlySortedArray.length,
        //     reversedArray.length,
        //     fewSortedArray
        // );

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
        const controlProps = {
            handleClick: this.handleClick,
            handleReset: this.handleReset,
            handleSpeedChange: this.handleSpeedChange,
            handleNumBarsChange: this.handleNumBarsChange,
            isPlaying: this.state.isPlaying,
            speed: this.state.speed,
            numBars: this.state.numBars,
        };

        return (
            <div className="app">
                <h1 className="headline">Sorting Algorithm Visualizer</h1>
                <Graphs {...this.state}></Graphs>
                <Controls {...controlProps}></Controls>
            </div>
        );
    }
}

export default App;

import React from "react";
import P5Wrapper from "react-p5-wrapper";
import bubbleSketch from "../sketches/bubble";
import quickSketch from "../sketches/quick";
import insertionSketch from "../sketches/insertion";
import mergeSketch from "../sketches/merge";
import selectionSketch from "../sketches/selection";
import "../custom.scss";
import "../App.css";

function Graphs(props) {
    const {
        randomArray,
        nearlySortedArray,
        reversedArray,
        fewSortedArray,
        ...data
    } = props;

    return (
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
    );
}

export default Graphs;

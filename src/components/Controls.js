import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../custom.scss";
import "../App.css";

function Controls(props) {
    return (
        <div className="controls">
            <div className="buttons">
                <Button
                    className="play-button"
                    variant={props.isPlaying ? "warning" : "success"}
                    onClick={props.handleClick}
                >
                    {props.isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                    className="reset-button"
                    onClick={props.handleReset}
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
                    max="60"
                    step="1"
                    id="speed"
                    onChange={props.handleSpeedChange}
                    value={props.speed}
                />
            </div>

            <div className="num-bar-controls">
                <Form.Label>Number of Bars</Form.Label>
                <Form.Control
                    as="select"
                    value={props.numBars}
                    onChange={props.handleNumBarsChange}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="80">80</option>
                    <option value="160">160</option>
                </Form.Control>
            </div>
        </div>
    );
}

export default Controls;

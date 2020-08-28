import createBar from "./createBar";

export default function sketch(p) {
    let canvas;
    const colors = {
        normalColor: "#2B2D42",
        swapColor: "#ff851b",
        inspectingColor: "#297373",
        doneColor: "#219724",
        backgroundColor: "#fff6f8",
    };
    let bars = [];
    let barsCopy = [];
    let numBars = 20;
    let animation = [];

    let randomArray = [];
    let dataIsInitialized = false;

    let canvasWidth;
    let canvasHeight;

    let frameCount = 0;

    let drawOnce = false;

    p.setup = () => {
        // p.randomSeed(1);
        canvas = p.createCanvas(canvasWidth, canvasHeight);

        p.frameRate(1);
        p.noLoop();
        frameCount = 0;
    };

    function stepThroughAnimation(frameCount, bars) {
        if (frameCount >= animation.length || frameCount < 0) {
            // console.log(
            //     `frameCount >= animation.length: ${
            //         frameCount >= animation.length
            //     } frameCount < 0: ${frameCount < 0}
            //     frameCount: ${frameCount}`
            // );
            for (let i = 0; i < numBars; i++) {
                bars[i].color = colors.doneColor;
                bars[i].index = i; // always update the bar's index before calling show()
                bars[i].show();
            }
            p.noLoop();
            return;
        }

        if ("colorInspecting" in animation[frameCount]) {
            // console.log(`color inspecting`);
            let j = animation[frameCount].colorInspecting;
            bars[j].color = colors.inspectingColor;
            // bars[j + 1].color = colors.inspectingColor;
        } else if ("colorUninspecting" in animation[frameCount]) {
            // console.log(`color uninspecting`);
            let j = animation[frameCount].colorUninspecting;
            bars[j].color = colors.normalColor;
            // bars[j + 1].color = colors.normalColor;
        } else if ("colorSwap" in animation[frameCount]) {
            // console.log(`colorSwap ${animation[frameCount].colorSwap}`);

            // let i1, i2;
            let [i1, i2] = animation[frameCount].colorSwap;
            // console.log(`colorSwap: ${i1}, ${i2}`);
            bars[i1].color = colors.swapColor;
            bars[i2].color = colors.swapColor;
        } else if ("swap" in animation[frameCount]) {
            let j = animation[frameCount].swap;
            // console.log(`swap: ${j}`);
            [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        } else if ("colorUnswap" in animation[frameCount]) {
            let [i1, i2] = animation[frameCount].colorUnswap;
            // console.log(`colorUnswap: ${i1}, ${i2}`);
            bars[i1].color = colors.normalColor;
            bars[i2].color = colors.normalColor;
        }

        for (let i = 0; i < numBars; i++) {
            // console.log(barsCopy[i]);
            bars[i].index = i; // always update the bar's inex before calling show()
            bars[i].show();
        }
        // console.log(`   drew`);
    }

    p.draw = () => {
        // console.log("draw()");
        p.background(colors.backgroundColor);
        if (dataIsInitialized) {
            // console.log(`   before frameCount: ${frameCount}`);

            stepThroughAnimation(frameCount, barsCopy);
            frameCount++;
            // console.log(`   after frameCount: ${frameCount}`);
        }

        // p.textSize(10);
        // p.fill(0);
        // p.text(p.round(p.getFrameRate()), 5, 10);

        if (drawOnce) {
            p.noLoop();
            drawOnce = false;
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (canvas) {
            // runs during any change
            p.setFrameRate(props.speed); // updated by slider
            if (props.isPlaying) {
                // updated by play/pause button
                // console.log("play");
                p.loop();
            } else {
                // console.log("pause");
                p.noLoop();
            }
            if (props.numBars !== numBars || props.shouldReset === true) {
                // console.log(
                //     `   different numbars detected old: ${numBars} new: ${props.numBars}`
                // );
                numBars = props.numBars;
                dataIsInitialized = false;
                // console.log(`1 old array: ${randomArray}`);
                // console.log(`1 new array: ${props.array}`);
            }
        }
        if (!dataIsInitialized && props.array.length > 0) {
            frameCount = 0;
            // runs during componentDidMount

            canvasWidth = props.canvasWidth; // sync local variables
            canvasHeight = props.canvasHeight;
            // console.log(`2 old array: ${randomArray}`);
            // console.log(`2 new array: ${props.array}`);

            randomArray = props.array;
            numBars = props.numBars;
            dataIsInitialized = true;

            bars = [];
            barsCopy = [];
            animation = [];

            for (let i = 0; i < numBars; i++) {
                bars.push(
                    createBar(
                        p,
                        randomArray[i],
                        i,
                        numBars,
                        colors.normalColor,
                        canvasWidth,
                        canvasHeight
                    )
                );
                barsCopy.push(bars[bars.length - 1]);
            }

            // sort the bars array and use it as a template to add animations
            animation.push({});
            for (let i = 0; i < numBars; i++) {
                for (let j = 0; j < numBars - i - 1; j++) {
                    animation.push({
                        colorInspecting: j,
                    });
                    if (bars[j].value > bars[j + 1].value) {
                        animation.push({
                            colorSwap: [j, j + 1],
                        });
                        animation.push({
                            swap: j,
                        });
                        animation.push({
                            colorUnswap: [j, j + 1],
                        });

                        const tempBar = bars[j];
                        bars[j] = bars[j + 1];

                        bars[j + 1] = tempBar;
                    } else {
                        animation.push({
                            colorUninspecting: j,
                        });
                    }
                }
            }

            // console.log(
            //     `barsCopy.length: ${barsCopy.length} dataIsInitialized: ${dataIsInitialized}`
            // );
            if (props.isPlaying) {
                // make sure sketch is in sync with play/pause button at start
                // console.log("play");
                p.loop();
            } else {
                // console.log("pause");
                drawOnce = true;
                p.loop();
            }
        }
    };
}

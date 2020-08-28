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
    };

    function stepThroughAnimation(frameCount, bars) {
        if (frameCount >= animation.length || frameCount < 0) {
            for (let i = 0; i < numBars; i++) {
                bars[i].color = colors.doneColor;
                bars[i].index = i; // always update the bar's index before calling show()
                bars[i].show();
            }
            p.noLoop();
            return;
        }

        if ("colorInspecting" in animation[frameCount]) {
            let j = animation[frameCount].colorInspecting;
            bars[j].color = colors.inspectingColor;
            // bars[j + 1].color = colors.inspectingColor;
        } else if ("colorUninspecting" in animation[frameCount]) {
            let [i, j] = animation[frameCount].colorUninspecting;
            if (i !== undefined) {
                bars[i].color = colors.normalColor;
            }
            if (j !== undefined) {
                bars[j].color = colors.normalColor;
            }
            // bars[j + 1].color = colors.normalColor;
        } else if ("colorSwap" in animation[frameCount]) {
            // let i1, i2;
            let [i1, i2] = animation[frameCount].colorSwap;
            bars[i1].color = colors.swapColor;
            bars[i2].color = colors.swapColor;
            // [bars[i1], bars[i2]] = [bars[i2], bars[i1]];
        } else if ("swap" in animation[frameCount]) {
            let [j, minIndex] = animation[frameCount].swap;

            [bars[j], bars[minIndex]] = [bars[minIndex], bars[j]];
            bars[j].color = colors.normalColor;
            bars[minIndex].color = colors.normalColor;
        } else if ("colorUnswap" in animation[frameCount]) {
            let [i1, i2] = animation[frameCount].colorUnswap;
            bars[i1].color = colors.normalColor;
            bars[i2].color = colors.normalColor;
        } else if ("colorIndexMin" in animation[frameCount]) {
            let i1 = animation[frameCount].colorIndexMin;
            bars[i1].color = colors.swapColor;
        } else if ("colorUnindexMin" in animation[frameCount]) {
            let i1 = animation[frameCount].colorUnindexMin;
            bars[i1].color = colors.normalColor;
        }

        for (let i = 0; i < numBars; i++) {
            bars[i].index = i; // always update the bar's index before calling show()
            bars[i].show();
        }
    }

    p.draw = () => {
        p.background(colors.backgroundColor);


        if (dataIsInitialized) {
            stepThroughAnimation(frameCount, barsCopy);
            frameCount++;
            // stepThroughAnimation(p.frameCount - 1, barsCopy);
            // for (let i = 0; i < numBars; i++) {
            //     bars[i].index = i; // always update the bar's index before calling show()
            //     bars[i].show();
            // }
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
                p.loop();
            } else {
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

            // runs during componentDidMount


            frameCount = 0;
            bars = [];
            barsCopy = [];
            animation = [];


            canvasWidth = props.canvasWidth; // sync local variables
            canvasHeight = props.canvasHeight;
            randomArray = props.array;
            numBars = props.numBars;
            dataIsInitialized = true;

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
            bars.push(
                createBar(
                    p,
                    Infinity,
                    Infinity,
                    numBars,
                    colors.normalColor,
                    canvasWidth,
                    canvasHeight
                )
            );
            barsCopy.push(
                createBar(
                    p,
                    Infinity,
                    Infinity,
                    numBars,
                    colors.normalColor,
                    canvasWidth,
                    canvasHeight
                )
            );
            quickSort(bars, 0, bars.length - 1);
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

    function quickSort(array, low, high) {
        if (low < high) {
            let j = partition(array, low, high);
            quickSort(array, low, j);
            quickSort(array, j + 1, high);
        }
    }
    function partition(array, low, high) {
        let pivot = array[low];
        let i = low;
        let j = high;
        while (i < j) {
            do {
                i++;
                animation.push({
                    colorInspecting: i,
                });
                if (array[i].value <= pivot.value) {
                    animation.push({
                        colorUninspecting: [i],
                    });
                }
            } while (array[i].value <= pivot.value);
            do {
                j--;
                animation.push({
                    colorInspecting: j,
                });

                if (array[j].value > pivot.value) {
                    animation.push({
                        colorUninspecting: [j],
                    });
                }
            } while (array[j].value > pivot.value);

            if (i < j) {
                [array[i], array[j]] = [array[j], array[i]];

                animation.push({
                    colorSwap: [i, j],
                });
                animation.push({
                    swap: [i, j],
                });

                animation.push({
                    colorUnswap: [i, j],
                });
            } else {
                animation.push({
                    colorUninspecting: [i, j],
                });
            }
        }
        [array[low], array[j]] = [array[j], array[low]];
        animation.push({
            colorSwap: [low, j],
        });
        animation.push({
            swap: [low, j],
        });
        // animation.push({
        //     colorUnswap: [low, j],
        // });
        return j;
    }
}

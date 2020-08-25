import createBar from "./createBar";

export default function sketch(p) {
    let canvas;
    const colors = {
        normalColor: "#2B2D42",
        swapColor: "#FE5F55",
        inspectingColor: "#297373",
    };
    let bars = [];
    let barsCopy = [];
    let numBars = 20;
    let animation = [];

    let randomArray = [];
    let arrayFilled = false;

    let canvasWidth;
    let canvasHeight;

    p.setup = () => {
        // p.randomSeed(1);
        canvas = p.createCanvas(canvasWidth, canvasHeight);

        p.frameRate(1);
    };

    function stepThroughAnimation(frameCount, bars) {
        if (frameCount >= animation.length || frameCount < 0) {
            for (let i = 0; i < numBars; i++) {
                bars[i].color = colors.inspectingColor;
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
            // [bars[i1], bars[i2]] = [bars[i2], bars[i1]];
        } else if ("swap" in animation[frameCount]) {
            let [j, minIndex] = animation[frameCount].swap;

            // console.log(`swap: ${j}`);
            [bars[j], bars[minIndex]] = [bars[minIndex], bars[j]];
        } else if ("colorUnswap" in animation[frameCount]) {
            let [i1, i2] = animation[frameCount].colorUnswap;
            // console.log(`colorUnswap: ${i1}, ${i2}`);
            bars[i1].color = colors.normalColor;
            bars[i2].color = colors.normalColor;
        } else if ("colorIndexMin" in animation[frameCount]) {
            let i1 = animation[frameCount].colorIndexMin;
            // console.log(`colorUnswap: ${i1}, ${i2}`);
            bars[i1].color = colors.swapColor;
        } else if ("colorUnindexMin" in animation[frameCount]) {
            let i1 = animation[frameCount].colorUnindexMin;
            // console.log(`colorUnswap: ${i1}, ${i2}`);
            bars[i1].color = colors.normalColor;
        }

        for (let i = 0; i < numBars; i++) {
            bars[i].index = i; // always update the bar's index before calling show()
            bars[i].show();
        }
    }

    p.draw = () => {
        // console.log("drew");
        p.background("#BDD5EA");

        if (arrayFilled) {
            // stepThroughAnimation(p.frameCount - 1, barsCopy);
            for (let i = 0; i < numBars; i++) {
                bars[i].index = i; // always update the bar's index before calling show()
                bars[i].show();
            }
        }
        p.textSize(10);
        p.fill(0);
        p.text(p.round(p.getFrameRate()), 5, 10);
    };

    let recursiveCount = 0;

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
        }
        if (!arrayFilled && props.randomArray.length > 0) {
            // runs during componentDidMount
            if (props.isPlaying) {
                // make sure sketch is in sync with play/pause button at start
                // console.log("play");
                p.loop();
            } else {
                // console.log("pause");
                p.noLoop();
            }

            canvasWidth = props.canvasWidth; // sync local variables
            canvasHeight = props.canvasHeight;
            randomArray = props.randomArray;
            numBars = props.numBars;
            arrayFilled = true;

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
            // console.log("quick sort");
            // console.log(bars);
            // let array = [10, 16, 8, 12, 15, 6, 3, 9, 5, 999];
            // console.log(`before array: ${array}`);
            // quickSort(array, 0, array.length - 1);
            // console.log(`after array: ${array}`);
            for (let i = 0; i < 1000; i++) {
                let array = [];
                for (let i = 0; i < 1000; i++) {
                    array.push(Math.floor(Math.random() * 100));
                }
                array.push(1001);
                let quickSortArray = [...array];
                let expectedSolution = [...array];
                expectedSolution.sort((a, b) => a - b);

                // console.log(`before array: ${quickSortArray}`);
                quickSort(quickSortArray, 0, quickSortArray.length - 1);
                // console.log(`after array: ${quickSortArray}`);

                // console.log(quickSortArray);
                // console.log(expectedSolution);
                if (expectedSolution.length !== quickSortArray.length) {
                    console.error("lengths does not match");
                } else {
                    let isEqual = true;
                    for (let i = 0; i < expectedSolution.length; i++) {
                        if (expectedSolution[i] !== quickSortArray[i]) {
                            console.error("values do not match");
                            isEqual = false;
                        }
                    }
                    if (isEqual) {
                        console.log("pass");
                    } else {
                        console.error("not passed");
                    }
                }
            }
        }
    };

    function quickSort(array, low, high) {
        // recursiveCount++;
        // if (recursiveCount > 500) {
        //     console.error("rc > 50");
        //     return;
        // }
        if (low < high) {
            let j = partition(array, low, high);
            // console.log(`l: ${low} j: ${j} rc: ${recursiveCount}`);
            quickSort(array, low, j);
            // console.log(`j + 1: ${j + 1} j: ${high} rc: ${recursiveCount}`);
            quickSort(array, j + 1, high);
            // console.log("");
        }
    }
    function partition(array, low, high) {
        let pivot = array[low];
        let i = low;
        let j = high;
        while (i < j) {
            // while (array[i] <= pivot) {
            //     i++;
            // }

            do {
                i++;
            } while (array[i] <= pivot);

            // console.log(`new i: ${i} array[i]: ${array[i]}`);
            // while (array[j] > pivot) {
            //     j--;
            // }

            do {
                j--;
            } while (array[j] > pivot);
            // console.log(`new j: ${j} array[j]: ${array[j]}`);

            if (i < j) {
                [array[i], array[j]] = [array[j], array[i]];
            }
            // console.log(`new array: ${array}`);
            // console.log("");
        }
        [array[low], array[j]] = [array[j], array[low]];
        // console.log(`j: ${j}`);
        return j;
    }
}

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
            console.log("before:");
            // console.log(bars);

            // sort the bars array and use it as a template to add animations
            animation.push({});
            formGroups(bars);
            /*
            merge 2 = 1
            0  1
            ->
            01

            merge 5 = 3
            0  1  2  3  4
            ->
            01  23  4
            ->
            0123  4
            ->
            01234

            merge 6 = 3
            0  1  2  3  4  5
            ->
            01  23  45
            ->
            0123  45
            ->
            012345

            merge 13 = 4
            a  b  c  d  e  f  g  h  i  j  k  l  m
            ab  cd  ef  gh  ij  kl  m
            abcd  efgh  ijkl  m
            abcdefgh  ijklm
            abcdefghijklm  
            */
        }
    };

    function formGroups(array) {
        // make groups of 1
        // make groups of 2
        // make groups of 4
        let groupSize = 1;
        let arrayCopy = [];

        while (!(groupSize >= array.length)) {
            console.log(`   begin groupSize: ${groupSize}`);
            const indices = [];
            for (
                let numTimesLoop = 0;
                numTimesLoop < Math.ceil(array.length / groupSize);
                numTimesLoop++
            ) {
                let beginIndex = numTimesLoop * groupSize;
                let endIndex = beginIndex + groupSize;

                if (endIndex >= array.length) {
                    endIndex = endIndex + (array.length - endIndex); // get remainder index
                }

                indices.push({
                    beginIndex: beginIndex,
                    endIndex: endIndex,
                });

                console.log(`beginIndex: ${beginIndex} endIndex: ${endIndex}`);
                // if (groupSize >= array.length) {
                //     console.log(`DONE!`);
                // }
            }
            console.log(indices);

            for (let i = 0; i < indices.length; i++) {
                if (!(i + 1 < indices.length)) {
                    break;
                }

                console.log(
                    `merging indices: (${indices[i].beginIndex}, ${
                        indices[i].endIndex
                    }) and (${indices[i + 1].beginIndex}, ${
                        indices[i + 1].endIndex
                    })`
                );

                // call merge function
                merge(
                    array,
                    indices[i].beginIndex,
                    indices[i].endIndex,
                    indices[i + 1].beginIndex,
                    indices[i + 1].endIndex
                );
                // console.log(array);
                i++;
            }

            console.log(`   end groupSize: ${groupSize}
            `);
            groupSize *= 2;
        }

        // for (let i = 0; i < 6; i++) {
        //     console.log(`i: ${i}`);
        // }

        // console.log(
        //     `array.length: ${
        //         array.length
        //     }, groupSize: ${groupSize}, i < ${Math.ceil(
        //         array.length / groupSize
        //     )}`
        // );
    }

    function merge(array, beginIndex1, endIndex1, beginIndex2, endIndex2) {
        // source: https://www.youtube.com/watch?v=6pV2IF0fgKY
        let i = 0;
        let j = 0;
        let k = 0;
        let A = array.slice(beginIndex1, endIndex1);
        let B = array.slice(beginIndex2, endIndex2);
        console.log(`
begin merge()`);

        console.log(
            `merging indices: (${beginIndex1}, ${endIndex1}) and (${beginIndex2}, ${endIndex2})`
        );
        console.log(A);
        console.log(B);

        let C = [];

        while (i < A.length && j < B.length) {
            if (A[i].value < B[j].value) {
                C[k++] = A[i++];
            } else {
                C[k++] = B[j++];
            }
        }
        for (; i < A.length; i++) {
            C[k++] = A[i];
        }
        for (; j < B.length; j++) {
            C[k++] = B[j];
        }

        // todo: check if it is correctly replacing the old contents

        console.log(C);
        array.splice(beginIndex1, C.length, ...C);
        console.log("result:");
        console.log(array);
        console.log(`end merge
        `);
        return C;
    }
}

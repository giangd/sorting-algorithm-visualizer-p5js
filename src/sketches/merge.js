import createBar from "./createBar";

export default function sketch(p) {
    let canvas;
    const colors = {
        normalColor: "#2B2D42",
        swapColor: "#FE5F55",
        inspectingColor: "#297373",
        doneColor: "#66ff00"

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

        if ("colorMergeMarkers" in animation[frameCount]) {
            let [beginIndex1, beginIndex2] = animation[
                frameCount
            ].colorMergeMarkers;

            bars[beginIndex1].color = colors.swapColor;
            bars[beginIndex2].color = colors.swapColor;

            // console.log(beginIndex1, beginIndex2);
        } else if ("unColorMergeMarkers" in animation[frameCount]) {
            let [beginIndex1, beginIndex2] = animation[
                frameCount
            ].unColorMergeMarkers;

            bars[beginIndex1].color = colors.normalColor;
            bars[beginIndex2].color = colors.normalColor;

            // console.log(beginIndex1, beginIndex2);
        } else if ("merge" in animation[frameCount]) {
            let [beginIndex1, C] = animation[frameCount].merge;
            // console.log("merge");
            // console.log(beginIndex1);
            // console.log(C);
            bars.splice(beginIndex1, C.length, ...C);
        } else if ("colorInspect" in animation[frameCount]) {
            let [index1, index2] = animation[frameCount].colorInspect;
            // console.log(index1, index2);
            if (index1 !== undefined) {
                bars[index1].color = colors.inspectingColor;
            }
            if (index2 !== undefined) {
                bars[index2].color = colors.inspectingColor;
            }
        } else if ("unColorInspect" in animation[frameCount]) {
            let [index1, index2] = animation[frameCount].unColorInspect;
            // console.log(index1, index2);
            if (index1 !== undefined) {
                bars[index1].color = colors.normalColor;
            }
            if (index2 !== undefined) {
                bars[index2].color = colors.normalColor;
            }
        }

        // colorInspect: [indexA, indexB];

        // animation.push({
        //     merge: [beginIndex1, C],
        // });
        // array.splice(beginIndex1, C.length, ...C);
        for (let i = 0; i < numBars; i++) {
            bars[i].index = i; // always update the bar's index before calling show()
            bars[i].show();
        }
    }

    p.draw = () => {
        // console.log("drew");
        p.background("#BDD5EA");

        if (dataIsInitialized) {
            stepThroughAnimation(frameCount, barsCopy);
            frameCount++;
            // stepThroughAnimation(p.frameCount - 1, barsCopy);
            // for (let i = 0; i < numBars; i++) {
            // bars[i].index = i; // always update the bar's index before calling show()
            // bars[i].show();
            // }
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
            if (props.numBars != numBars) {
                // console.log(
                //     `   different numbars detected old: ${numBars} new: ${props.numBars}`
                // );
                numBars = props.numBars;
                dataIsInitialized = false;
                // console.log(`1 old array: ${randomArray}`);
                // console.log(`1 new array: ${props.randomArray}`);
            }
        }
        if (!dataIsInitialized && props.randomArray.length > 0) {

            // runs during componentDidMount
            if (props.isPlaying) {
                // make sure sketch is in sync with play/pause button at start
                // console.log("play");
                p.loop();
            } else {
                // console.log("pause");
                p.noLoop();
            }

            frameCount = 0;
            bars = [];
            barsCopy = [];
            animation = [];


            canvasWidth = props.canvasWidth; // sync local variables
            canvasHeight = props.canvasHeight;
            randomArray = props.randomArray;
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
            // console.log("before:");
            // console.log(bars);

            // sort the bars array and use it as a template to add animations
            animation.push({});
            formGroups(bars);
            // console.log(bars);
            // console.log(animation);
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
        // let arrayCopy = [];

        while (!(groupSize >= array.length)) {
            // console.log(`   begin groupSize: ${groupSize}`);
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

                // console.log(`beginIndex: ${beginIndex} endIndex: ${endIndex}`);
                // if (groupSize >= array.length) {
                //     console.log(`DONE!`);
                // }
            }
            // console.log(indices);

            for (let i = 0; i < indices.length; i++) {
                if (!(i + 1 < indices.length)) {
                    break;
                }

                // call merge function

                merge(
                    array,
                    indices[i].beginIndex,
                    indices[i].endIndex,
                    indices[i + 1].beginIndex,
                    indices[i + 1].endIndex
                );

                i++;
            }
            // console.log("-------------------------------");
            groupSize *= 2;
        }
    }

    function merge(array, beginIndex1, endIndex1, beginIndex2, endIndex2) {
        // source: https://www.youtube.com/watch?v=6pV2IF0fgKY
        let i = 0;
        let j = 0;
        let k = 0;
        let A = array.slice(beginIndex1, endIndex1);
        let B = array.slice(beginIndex2, endIndex2);
        // todo: color merge markers
        animation.push({
            colorMergeMarkers: [beginIndex1, beginIndex2],
        });

        // if (A.length !== B.length) {
        //     if (A.length > B.length) {

        //     } else {

        //     }
        // } else {
        let loopEndCondition = A.length >= B.length ? A.length : B.length;
        for (let i = 1; i < loopEndCondition; i++) {
            let indexA = beginIndex1 + i;
            let indexB = beginIndex2 + i;

            if (indexA >= endIndex1) {
                indexA = undefined;
                // console.log("A");
            }
            if (indexB >= endIndex2) {
                indexB = undefined;
                // console.log("B");
            }
            // console.log("   " + indexA, indexB);

            animation.push({
                colorInspect: [indexA, indexB],
            });
            animation.push({
                unColorInspect: [indexA, indexB],
            });
        }

        // console.log("");
        // }

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

        animation.push({
            unColorMergeMarkers: [beginIndex1, beginIndex2],
        });

        animation.push({
            merge: [beginIndex1, C],
        });
        array.splice(beginIndex1, C.length, ...C);
    }
}

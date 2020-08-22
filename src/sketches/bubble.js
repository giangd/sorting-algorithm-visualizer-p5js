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

    p.setup = () => {
        canvas = p.createCanvas(300, 200);
        for (let i = 0; i < numBars; i++) {
            bars.push(
                createBar(p, p.random(0, 100), i, numBars, colors.normalColor)
            );
            barsCopy.push(bars[bars.length - 1]);
        }

        // sort the bars array and use it as a template to add animations
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

        // console.log(animation);
        p.frameRate(5);
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
            barsCopy[i].index = i; // always update the bar's index before calling show()
            barsCopy[i].show();
        }
    }

    p.draw = () => {
        p.background("#BDD5EA");
        stepThroughAnimation(p.frameCount - 1, barsCopy);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (canvas) {
            p.setFrameRate(Number(props.speed));
        }
    };
}

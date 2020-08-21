import Bar from "./createBar";
import createBar from "./createBar";

export default function sketch(p) {
    let speed = 1;
    // let canvas;
    const colors = {
        normalColor: "#2B2D42",
        swapColor: "#FE5F55",
        inspectingColor: "#297373",
    };
    let bars = [];
    let barsCopy = [];

    let numBars = 10;

    let animation = [];

    p.setup = () => {
        p.createCanvas(300, 200);
        for (let i = 0; i < numBars; i++) {
            bars.push(
                createBar(p, p.random(0, 100), i, numBars, colors.normalColor)
            );
            barsCopy.push(bars[bars.length - 1]);
        }

        for (let i = 0; i < numBars; i++) {
            for (let j = 0; j < numBars - i - 1; j++) {
                animation.push({
                    colorInspecting: j,
                });
                if (bars[j].value > bars[j + 1].value) {
                    animation.push({
                        colorSwap: [j, j + 1],
                    });
                    // animation.push({
                    //     colorInspecting: j,
                    // });
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
            console.log(`color inspecting`);
            let j = animation[frameCount].colorInspecting;
            bars[j].color = colors.inspectingColor;
            // bars[j + 1].color = colors.inspectingColor;
        } else if ("colorUninspecting" in animation[frameCount]) {
            console.log(`color uninspecting`);
            let j = animation[frameCount].colorUninspecting;
            bars[j].color = colors.normalColor;
            // bars[j + 1].color = colors.normalColor;
        } else if ("colorSwap" in animation[frameCount]) {
            // console.log(`colorSwap ${animation[frameCount].colorSwap}`);

            // let i1, i2;
            let [i1, i2] = animation[frameCount].colorSwap;
            console.log(`colorSwap: ${i1}, ${i2}`);
            bars[i1].color = colors.swapColor;
            bars[i2].color = colors.swapColor;
        } else if ("swap" in animation[frameCount]) {
            let j = animation[frameCount].swap;
            console.log(`swap: ${j}`);

            const tempBar = bars[j];
            bars[j] = bars[j + 1];

            bars[j + 1] = tempBar;
        } else if ("colorUnswap" in animation[frameCount]) {
            let [i1, i2] = animation[frameCount].colorUnswap;
            console.log(`colorUnswap: ${i1}, ${i2}`);
            bars[i1].color = colors.normalColor;
            bars[i2].color = colors.normalColor;
        }

        for (let i = 0; i < numBars; i++) {
            bars[i].index = i; // always update the bar's index before calling show()
            bars[i].show();
        }

        // p.frameRate(speed);
    }

    p.draw = () => {
        // p.frameRate(speed);
        p.background("#BDD5EA");
        console.log(`speed: ${speed}`);
        // p.text("bubble sort", 150, 100);
        // bar.show();

        // const tempBar = bars[0];
        // bars[0] = bars[bars.length - 1];

        // bars[bars.length] = tempBar;

        // for (const bar of bars) {
        //     bar.show();
        // }

        console.log(p.frameCount);
        stepThroughAnimation(p.frameCount - 1, barsCopy);
        // stepThroughAnimation(0, barsCopy);
        // p.background("grey");

        // stepThroughAnimation(1, barsCopy);
        // p.background("grey");

        // stepThroughAnimation(2, barsCopy);

        // for (let i = 0; i < animation.length; i++) {
        //     stepThroughAnimation(i, barsCopy);
        // }

        // for (let i = 0; i < numBars; i++) {
        //     bars[i].index = i; // always update the bar's index before calling show()
        //     bars[i].show();
        // }

        // for (let i = 0; i < numBars; i++) {
        //     barsCopy[i].index = i; // always update the bar's index before calling show()
        //     barsCopy[i].show();
        // }

        // p.noLoop();
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        // if (canvas)
        //     //Make sure the canvas has been created
        //     p.fill(newProps.color);
        // if () {}

        // todo: see schedule.txt
        speed = props.speed;
        p.frameRate(speed);
        console.log(`new speed: ${speed}`);
    };
}

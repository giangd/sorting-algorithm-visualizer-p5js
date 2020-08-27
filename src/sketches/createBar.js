export default function createBar(
    p,
    value,
    index,
    numBars,
    color = "black",
    canvasWidth,
    canvasHeight
) {
    // console.log(
    //     `   createBar p.round(p.width/numbars): ${p.round(p.width / numBars)}`
    // );
    // console.log(`p.width: ${p.width} numBars: ${numBars}`);
    // console.log("hello");
    return {
        p,
        value,
        index,
        numBars,
        color,
        width: Math.floor(canvasWidth / numBars),
        height: p.round(p.map(value, 0, numBars, 10, canvasHeight)),
        show() {
            p.noStroke();
            p.fill(this.color);
            p.rect(
                this.index * this.width,
                canvasHeight,
                this.width,
                -this.height
            );
        },
    };
}
/*





  |
| |
0 1 2 3


*/

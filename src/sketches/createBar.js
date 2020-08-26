export default function createBar(
    p,
    id,
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
        id,
        index,
        numBars,
        color,
        width: p.round(canvasWidth / numBars),
        value: id,
        height: p.round(p.map(id, 0, 100, 40, canvasHeight)),
        show() {
            // if (this.value === Infinity) {
            //     // return;
            //     console.log("im infinity");
            // }
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

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
            // console.log(
            //     `index: ${this.index} height: ${this.height} xPos: ${
            //         this.index * this.width
            //     }`
            // );
            // console.log(
            //     `xPos: ${this.index * this.width} height: ${this.height}`
            // );
            p.noStroke();
            p.fill(this.color);
            // console.log(
            //     this.index * this.width,
            //     p.height,
            //     this.width,
            //     -this.height
            // );

            // console.log(
            //     p.width,
            //     numBars,
            //     this.width,
            //     p.round(p.width / numBars)
            // );
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

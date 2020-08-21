export default function createBar(p, id, index, numBars, color = "black") {
    return {
        p,
        id,
        index,
        numBars,
        color,
        width: p.round(p.width / numBars),
        value: id,
        height: p.round(p.map(id, 0, 100, 40, p.height)),
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
            p.rect(this.index * this.width, p.height, this.width, -this.height);
        },
    };
}
/*





  |
| |
0 1 2 3


*/

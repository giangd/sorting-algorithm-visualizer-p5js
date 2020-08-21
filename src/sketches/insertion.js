export default function sketch(p) {
    // let canvas;

    p.setup = () => {
        p.createCanvas(300, 200);
    };

    p.draw = () => {
        p.background("grey");
        // p.ellipse(150, 100, 100, 100);
        p.text("insertion sort", 150, 100);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // if (canvas)
        //     //Make sure the canvas has been created
        //     p.fill(newProps.color);
    };
}

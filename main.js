import Cat, { load_cat } from "./cat.js";
import { Animations } from "./animation.js";

var canvas;
var ctx;

var cat;

var last_time;

async function main(canvas2d) {
    canvas = canvas2d;
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let cat_svg = await load_cat("./cats/cat2.svg");

    cat = new Cat(100, 100, 500, 300, cat_svg);
    cat.start_animation(Animations.Walking);

    last_time = performance.now();

    update();
}

function update() {
    requestAnimationFrame(update);

    let curr_time = performance.now();
    let delta_time = curr_time - last_time;
    last_time = curr_time;

    cat.update(delta_time);
    draw();
}

function draw() {
    cat.draw(ctx);
}

export default main;
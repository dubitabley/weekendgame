import Cat, { load_cat } from "./cat.js";
import { Animations } from "./animation.js";
import { add_events } from "./input.js";
import Wall from "./wall.js";

var screen_canvas;
var screen_ctx;

var canvas;
var ctx;

var cat;

var last_time;

var walls = [];

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 700;

async function main(canvas2d) {
    screen_canvas = canvas2d;
    screen_ctx = screen_canvas.getContext("2d");

    screen_canvas.width = window.innerWidth;
    screen_canvas.height = window.innerHeight;

    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx = canvas.getContext("2d");

    let cat_svg = await load_cat("./cats/cat2.svg");

    cat = new Cat(100, 100, 300, 200, cat_svg);
    cat.start_animation(Animations.Walking);

    add_events();

    setup_walls();

    last_time = performance.now();

    update();
}

function setup_walls() {
    walls.push(new Wall(-100, 0, 100, 100000));
    walls.push(new Wall(100, 100, 100, 20));
    walls.push(new Wall(100, 100, 50, 50));
}

function get_cat() {
    return cat;
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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //flip upside down lol
    ctx.transform(1, 0, 0, -1, 0, CANVAS_HEIGHT);

    let x_translate = -cat.AABB.x + CANVAS_WIDTH/2;
    let y_translate = -cat.AABB.y + CANVAS_HEIGHT/2;
    if (cat.AABB.x < CANVAS_WIDTH/2) {
        //x_translate = -CANVAS_WIDTH/2;
        x_translate = 0;
    }
    if (cat.AABB.y < CANVAS_HEIGHT/2) {
        //y_translate = -CANVAS_HEIGHT/2;
        y_translate = 0;
    }

    cat.set_pos(x_translate, y_translate);

    ctx.translate(x_translate, y_translate);

    //ctx.clearRect(cat.AABB.x - CANVAS_WIDTH/2, cat.AABB.y - CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);

    //ctx.rect(cat.AABB.x - CANVAS_WIDTH/2, cat.AABB.y - CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fill();
    //ctx.clearRect(cat.AABB.x - CANVAS_WIDTH/2, cat.AABB.y - CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);

    cat.draw(ctx);
    for (let wall of walls) {
        wall.draw(ctx);
    }

    screen_ctx.clearRect(0, 0, screen_canvas.width, screen_canvas.height);
    screen_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, screen_canvas.width, screen_canvas.height);
}

export { get_cat, CANVAS_WIDTH, CANVAS_HEIGHT };
export default main;
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./main.js";
import { AABB, Vector2 } from "./misc.js";

const SPEED = 10;
const GRAVITY = 0.01;
const MAX_FALLING_SPEED = -20;

const States = {
    Idle: 1,
    Falling: 2,
    Jumping: 3,
    Sliding: 4,
};

function Cat(x, y, width, height, svg) {
    this.svg = svg;
    this.AABB = new AABB(x, y, width, height);

    this.speed = new Vector2(0, 0);
    this.grounded = false;
    this.left_wall = false;
    this.right_wall = false;
    this.ceiling = false;

    this.state = States.Idle;

    this.animations = [];
}

/* Cat.prototype.set_svg = function() {
    this.svg.style.left = (this.AABB.x - this.AABB.half_width) + "px";
    this.svg.style.top = ((CANVAS_HEIGHT - this.AABB.y) - this.AABB.half_height) + "px";
    this.svg.style.width = ((CANVAS_WIDTH/window.innerWidth) * this.AABB.width) + "px";
    this.svg.style.height = ((CANVAS_HEIGHT/window.innerHeight) * this.AABB.height) + "px";
} */

Cat.prototype.set_pos = function(x_translate, y_translate) {

    let x_ratio = window.innerWidth/CANVAS_WIDTH;
    let y_ratio = window.innerHeight/CANVAS_HEIGHT;
    //if 0,
    if (x_translate == 0) {
        this.svg.style.left = (x_ratio * (this.AABB.x - this.AABB.half_width)) + "px";
    } else {
        this.svg.style.left = (window.innerWidth/2 - x_ratio * this.AABB.half_width) + "px";
    }

    if (y_translate == 0) {
        this.svg.style.top = (y_ratio * (CANVAS_HEIGHT - this.AABB.y - this.AABB.half_height)) + "px";
    } else {
        this.svg.style.top = (window.innerHeight/2 - y_ratio * this.AABB.half_height) + "px";
    }
    this.svg.setAttribute("width", x_ratio * this.AABB.width);
    this.svg.setAttribute("height", y_ratio * this.AABB.height);
}

Cat.prototype.update = function(delta_time) {
    this.AABB.x += this.speed.x * delta_time;
    this.AABB.y += this.speed.y * delta_time;

    this.speed.y = Math.max(MAX_FALLING_SPEED, this.speed.y - GRAVITY * delta_time);

    this.speed.x *= 0.8;
    this.speed.y *= 0.8;

    if (this.AABB.y < this.AABB.half_height) {
        this.AABB.y = this.AABB.half_height;
        this.grounded = true;
        this.speed.y = 0;
    } else {
        this.grounded = false;
    }

    if (this.AABB.x < this.AABB.half_width) {
        this.AABB.x = this.AABB.half_width;
        this.speed.x = 0;
    }
    
}

Cat.prototype.draw = function(ctx) {
    //ctx.drawImage(this.svg, this.AABB.x, this.AABB.y, this.AABB.width, this.AABB.height);
    
}

Cat.prototype.add_speed = function(x_amount, y_amount) {
    if (this.grounded) {
        this.speed.x += x_amount * 0.1;
        this.speed.y += y_amount * 0.1;
    } else {
        this.speed.x += x_amount * 0.01;
        this.speed.y += y_amount * 0.01;
    }
}


/* async function load_cat(path) {
    let response = await fetch(path);
    let blob = await response.blob();
    let url = URL.createObjectURL(blob);
    let svg = new Image();
    svg.src = url;
    document.body.appendChild(svg);
    svg.style.display = "none";
    await svg.decode();
    return svg;
} */

async function load_cat(path) {
    let response = await fetch(path);
    let text = await response.text();
    document.body.insertAdjacentHTML('beforeend', text);
    let svg_cat = document.getElementById("svg_cat");
    svg_cat.style.position = "absolute";

    return svg_cat;
}

/* async function load_cat(path) {
    let response = await fetch(path);
    let text = await response.text();
    document.body.innerHTML += text;
    let svg_obj = document.getElementById("svg_cat");
    return make_svg_obj(svg_obj);
}

function make_svg_obj(svg_obj) {
    let obj = {}
    for (let child of svg_obj.children) {
        if (child instanceof SVGGElement) {
            obj[child.id] = make_svg_obj(child);
        } else if (child instanceof SVGPathElement) {
            obj[child.id] = {
                style: child.getAttribute("style"),
                path: new Path2D(child.getAttribute("d"))
            };
        }
    }
    return obj;
} */

export { load_cat };
export default Cat;
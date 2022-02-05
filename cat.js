import { AABB, Vector2 } from "./misc.js";

function Cat(x, y, width, height, svg) {
    this.svg = svg;
    this.AABB = new AABB(x, y, width, height);
    this.set_svg();

    this.speed = new Vector2(0, 0);
    this.grounded = false;
    this.left_wall = false;
    this.right_wall = false;
    this.ceiling = false;

    this.animations = [];
}

Cat.prototype.set_svg = function() {
    this.svg.style.left = this.AABB.x + "px";
    this.svg.style.top = this.AABB.y + "px";
    this.svg.style.width = this.AABB.width + "px";
    this.svg.style.height = this.AABB.height + "px";
}

Cat.prototype.update = function(delta_time) {
    this.AABB.x += this.speed.x * delta_time;
    this.AABB.y += this.speed.y * delta_time;

    if (this.AABB.y < 0) {
        this.AABB.y = 0;
        this.grounded = true;
    } else {
        this.grounded = false;
    }
}

Cat.prototype.draw = function(ctx) {
    //ctx.drawImage(this.svg, this.AABB.x, this.AABB.y, this.AABB.width, this.AABB.height);

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
    document.body.innerHTML += text;
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
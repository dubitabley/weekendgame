import { AABB, Vector2 } from "./misc.js";

function Cat(x, y, width, height, svg) {
    this.svg = svg;
    this.AABB = new AABB(x, y, width, height);

    this.speed = new Vector2(0, 0);
    this.grounded = false;
    this.left_wall = false;
    this.right_wall = false;
    this.ceiling = false;


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
    ctx.drawImage(this.svg, this.AABB.x, this.AABB.y, this.AABB.width, this.AABB.height);
}


async function load_cat(path) {
    let response = await fetch(path);
    let blob = await response.blob();
    let url = URL.createObjectURL(blob);
    let image = new Image();
    image.src = url;
    await image.decode();
    return image;
}

export { load_cat };
export default Cat;
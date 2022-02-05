
//x and y are the centre
function AABB(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.half_width = width/2;
    this.half_height = height/2;
}

AABB.prototype.overlaps = function(other) {
    if (Math.abs(this.x - other.x) > this.half_width + other.half_width &&
        Math.abs(this.y - other.y) > this.half_height + other.half_height) {

        return true;
    } 
    return false;
}

function Vector2(x, y) {
    this.x = x;
    this.y = y;
}

export { AABB, Vector2 }
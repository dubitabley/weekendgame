function Wall(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Wall.prototype.draw = function(ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
}

export default Wall;
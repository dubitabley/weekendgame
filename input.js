import { get_cat } from "./main.js";

var is_mouse_down = false;

function mouse_down(e) {
    is_mouse_down = true;
}

function mouse_move(e) {
    if (is_mouse_down) {
        let cat = get_cat();
        cat.add_speed(e.movementX, e.movementY);
    }
}

function mouse_up(e) {
    is_mouse_down = false;
}

function add_events() {
    document.addEventListener("mousedown", mouse_down);
    document.addEventListener("mousemove", mouse_move);
    document.addEventListener("mouseup", mouse_up);
}

export { add_events };
import Cat from "./cat.js";

var Animations = {
    Walking: 1,
};

var walking_anim = {
    anim: [
        { 
            transform: 'rotate(-10deg)',
            transformOrigin: 'top',
        },
        { 
            transform: 'rotate(10deg)',
            transformOrigin: 'top',
        },
        { 
            transform: 'rotate(-10deg)',
            transformOrigin: 'top',
        },
    ],
    timing: {
        duration: 500,
        iterations: Infinity,
    },
};

Cat.prototype.start_animation = function(anim) {
    switch (anim) {
        case Animations.Walking:
            let anim = walking_animation(this.svg);
            this.animations.push(anim);
            break;
    }
}

Cat.prototype.update_animations = function(delta_time) {

}

function walking_animation(cat_svg) {
    cat_svg.querySelector("#leg1").animate(walking_anim.anim, walking_anim.timing);
    cat_svg.querySelector("#leg2").animate(walking_anim.anim, walking_anim.timing);
    cat_svg.querySelector("#leg3").animate(walking_anim.anim, walking_anim.timing);
    cat_svg.querySelector("#leg4").animate(walking_anim.anim, walking_anim.timing);
}

function update_animations() {


}


export { Animations };

let resize =()=> {
    [canvas.height, canvas.width] = [window.innerHeight, window.innerWidth];
    gl.viewport(0, 0, canvas.width, canvas.height);
}

// mouse events

let mousestate = {
    left: false, // left mouse button
    right: false, // right mouse button
    middle: false, // middle mouse button
    wheel: 0, // amount of mouse wheel movement
    x: 0, // mouse x
    y: 0, // mouse y
    propx: 0, // proportional x
    propy: 0, // proportional y
}

let mousemove =(event)=> {
    [mousestate.x, mousestate.y] = [event.clientX, event.clientY];
}

let mousedown =(event)=> {
    mousestate[["left", "middle", "right"][event.button]] = true;
}

let mouseup =(event)=> {
    mousestate[["left", "middle", "right"][event.button]] = false;
}

let wheel =(event)=> {
    mousestate.wheel += event.deltaY;
}

// touch events

let touchstart =(event)=> {
    event.preventDefault();
}

let touchmove =(event)=> {
    event.preventDefault();

    if (event.touches.length >= 2) {

    }
}

let touchend =(event)=> {
    event.preventDefault();
}

// add event listeners

window.addEventListener('resize', resize);
window.addEventListener('mousemove', mousemove);
window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);
window.addEventListener('wheel', wheel);
window.addEventListener('touchstart', touchstart);
window.addEventListener('touchmove', touchmove);
window.addEventListener('touchend', touchend);

window.oncontextmenu =()=> false; // disable right click menu

// preset

class MapPreset {
    constructor(map, scrollx, scrolly, zoom) {
        this.map = map;
        this.scrollx = scrollx;
        this.scrolly = scrolly;
        this.zoom = zoom;
    }

    apply(dx, dy) {
        this.map.split('\n').forEach((line, y) => 
            line.split('').forEach((char, x) => 
                char == '*' && cw(dx + x - (line.lastIndexOf(" ") + 1), dy + y, true)
            )
        );
        [scrollx, scrolly, zoom] = [this.scrollx, this.scrolly, this.zoom];
    }
}

// query

let paramaters = new URLSearchParams(location.search);
/**
 * preset: preset
 * speed: speed
 * gpf: generations per frame
 */

const presets = {
    galaxy:
        new MapPreset(`
            ******.**
            ******.**
            .......**
            **.....**
            **.....**
            **.....**
            **.......
            **.******
            **.******
        `, 400, 500, 0.5),
    glidergun: 
        new MapPreset(`
            ........................*
            ......................*.*
            ............**......**............**
            ...........*...*....**............**
            **........*.....*...**
            **........*...*.**....*.*
            ..........*.....*.......*
            ...........*...*
            ............**
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            .
            ........................................**
            ........................................*.*
            ..........................................*
            ..........................................**
        `, 2150, 1500, 0.2),
    acorn: 
        new MapPreset(`
            .*
            ...*
            **..***
        `, -3000, -2000, 0.0375), // 5206 generations
    rabbits:
        new MapPreset(`
            ..*....*
            **
            .**.***
        `, -3000, 1000, 0.03), // 17331 generations
    "23334m":
        new MapPreset(`
            ..*
            **
            .*
            *..*
            ....*
            .*..*
            ..*.*
            .*
        `, -1800, 400, 0.0175), // 23334 generations
};

// resize and begin mainloop

resize();

(presets[paramaters.get('preset') ?? "glidergun"]).apply(0, 0);

let gpf = (paramaters.get("gpf") ?? 1) * 1;
let speed = (paramaters.get("speed") ?? 100) * 1;
let generations = 0;

setInterval(() => {
    generations += gpf;
    for (let i = 0; i < gpf; i++) ep = e(ep);
}, speed)
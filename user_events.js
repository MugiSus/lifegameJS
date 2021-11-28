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
    cellx: 0, // cell x
    celly: 0, // cell y
}

let mousemove =(event)=> {
    [mousestate.x, mousestate.y] = [event.clientX, event.clientY];
    [mousestate.cellx, mousestate.celly] = [
        Math.floor(((mousestate.x - canvas.width / 2) / zoom + 50 + scrollx) / 100),
        Math.floor(((mousestate.y - canvas.height / 2) / zoom + 50 + scrolly) / 100)
    ]
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

// touch events (wip)

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
        this.map.split('\n').filter(x => x).forEach((line, y) => 
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
        `, 400, 400, 0.5),
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
        `, 2150, 1400, 0.2),
    acorn: 
        new MapPreset(`
            .*
            ...*
            **..***
        `, -3000, -1900, 0.0375), // 5206 generations
    rabbits:
        new MapPreset(`
            ..*....*
            **
            .**.***
        `, -3000, 900, 0.03), // 17331 generations
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
        `, -1800, 300, 0.0175), // 23334 generations
    pentadecathlon:
        new MapPreset(`
            ...........................*..*....*..*..
            .........................***..******..***
            ...........................*..*....*..*..
            .........................................
            ..*..*....*..*...........................
            ***..******..***..*......................
            ..*..*....*..*...*.......................
            .................***.....................
        `, 1900, 300, 0.2), // 
};

// resize and begin mainloop

resize();

(presets[paramaters.get('preset') ?? "glidergun"]).apply(0, 0);

let gpf = (paramaters.get("gpf") || 1) * 1;
let speed = (paramaters.get("speed") ?? 100) * 1;
let generations = 0;

let evaluateLoop =()=> {
    generations += gpf;
    for (let i = 0; i < gpf; i++) ep = e(ep);
}

setInterval(evaluateLoop, speed);

let mouseflag = false;
let clientWriteMode = false;

let clientWriteLoop =()=> {
    requestAnimationFrame(clientWriteLoop);
    if (mousestate.left) {
        if (!mouseflag) {
            mouseflag = true;
            clientWriteMode = !r(mousestate.cellx, mousestate.celly);
        }
        cw(mousestate.cellx, mousestate.celly, clientWriteMode);
    } else {
        mouseflag = false;
    }
}

clientWriteLoop();
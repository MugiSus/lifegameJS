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
    dx: 0, // mouse x delta
    dy: 0, // mouse y delta
    
    cellx: 0, // cell x
    celly: 0, // cell y
}

let mousemove =(event)=> {
    [mousestate.x, mousestate.y] = [event.clientX, event.clientY];
    [mousestate.cellx, mousestate.celly] = [
        Math.floor(((mousestate.x - canvas.width / 2) / zoom + scrollx + 50) / 100),
        Math.floor(((mousestate.y - canvas.height / 2) / zoom + scrolly + 50) / 100)
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

// set preset

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
        `, 1900, 300, 0.2),
    puffertrain: 
        new MapPreset(`
            ...*.
            ....*
            *...*
            .****
            .....
            .....
            .....
            *....
            .**..
            ..*..
            ..*..
            .*...
            .....
            .....
            ...*.
            ....*
            *...*
            .****
        `, 0, 900, 0.3),
    puffertrain2: 
        new MapPreset(`
            .****.........
            *...*.........
            ....*.........
            ...*..........
            ..........****
            .........*...*
            .............*
            .....**..*..*.
            .....***......
            .....**..*..*.
            .............*
            .........*...*
            ..........****
            ...*..........
            ....*.........
            *...*.........
            .****.........
        `, 0, 900, 0.3),
    max: 
        new MapPreset(`
            ..................*........
            .................***.......
            ............***....**......
            ...........*..***..*.**....
            ..........*...*.*..*.*.....
            ..........*....*.*.*.*.**..
            ............*....*.*...**..
            ****.....*.*....*...*.***..
            *...**.*.***.**.........**.
            *.....**.....*.............
            .*..**.*..*..*.**..........
            .......*.*.*.*.*.*.....****
            .*..**.*..*..*..**.*.**...*
            *.....**...*.*.*...**.....*
            *...**.*.**..*..*..*.**..*.
            ****.....*.*.*.*.*.*.......
            ..........**.*..*..*.**..*.
            .............*.....**.....*
            .**.........**.***.*.**...*
            ..***.*...*....*.*.....****
            ..**...*.*....*............
            ..**.*.*.*.*....*..........
            .....*.*..*.*...*..........
            ....**.*..***..*...........
            ......**....***............
            .......***.................
            ........*..................
        `, 1350, 1300, 0.1), // pretty heavy
};

// resize and begin mainloop

const ZOOM_RATE = 0.999; // n < 1

let gpf = (paramaters.get("gpf") || 1) * 1;
let speed = (paramaters.get("speed") ?? 100) * 1;
let generations = 0;

let mouseflag = {
    left: false,
    middle: false,
    right: false,
};

let lastWheel = 0;

let simulating = false;
let intervalID = null;

let scrollOffsetX, scrollOffsetY, scrollFromX, scrollFromY;
let clientWriteMode = false;

let evaluateLoop =()=> {
    generations += gpf;
    for (let i = 0; i < gpf; i++) ep = e(ep);
}
let clientControllLoop =()=> {
    // client write

    if (mousestate.left) {
        if (!mouseflag.left) {
            mouseflag.left = true;
            clientWriteMode = !r(mousestate.cellx, mousestate.celly);
        }
        cw(mousestate.cellx, mousestate.celly, clientWriteMode);
    } else {
        mouseflag.left = false;
    }

    // stop/start simulation

    if (mousestate.right) {
        if (!mouseflag.right) {
            mouseflag.right = true;
            [scrollFromX, scrollFromY, scrollOffsetX, scrollOffsetY] = [scrollx, scrolly, mousestate.x, mousestate.y];
        }
        scrollx = scrollFromX + (scrollOffsetX - mousestate.x) / zoom;
        scrolly = scrollFromY + (scrollOffsetY - mousestate.y) / zoom;
    } else {
        if (mouseflag.right && scrollx == scrollFromX && scrolly == scrollFromY) {
            simulating = !simulating;
            if (simulating) 
                intervalID = setInterval(evaluateLoop, speed);
            else
                clearInterval(intervalID);
        }
        mouseflag.right = false;
    }

    if (mousestate.wheel != lastWheel) {
        lastWheel = mousestate.wheel;
        let [scaleCenterX, scaleCenterY] = [
            scrollx + (mousestate.x - canvas.width / 2) / zoom,
            scrolly + (mousestate.y - canvas.height / 2) / zoom
        ];
        zoom = ZOOM_RATE ** mousestate.wheel;
        scrollx = -(mousestate.x - canvas.width / 2) / zoom + scaleCenterX,
        scrolly = -(mousestate.y - canvas.height / 2) / zoom + scaleCenterY
    }

    // run evaluater

    requestAnimationFrame(clientControllLoop);
}

// start mainloop

resize();
(presets[paramaters.get('preset')] ?? presets.glidergun).apply(0, 0);

mousestate.wheel = Math.log(zoom) / Math.log(ZOOM_RATE);
lastWheel = mousestate.wheel;

clientControllLoop();

if (paramaters.get("alivesonly") == "true") {
    gl.useProgram(program_alive);
    visualize_gl_onlyAlive();
} else {
    visualize_gl_bothDeadAndAlive();
}
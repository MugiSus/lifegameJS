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

let resize =()=> {
    [canvas.height, canvas.width] = [window.innerHeight, window.innerWidth];
    gl.viewport(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('touchstart', touchstart);
canvas.addEventListener('touchmove', touchmove);
canvas.addEventListener('touchend', touchend);
window.addEventListener('resize', resize);

resize();

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
        `, 400, 500, 1),
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
        `, 2150, 1500, 0.4),
    acorn: 
        new MapPreset(`
            .*
            ...*
            **..***
        `, -3000, -2000, 0.075), // 5206 generations
    rabbits:
        new MapPreset(`
            ..*....*
            **
            .**.***
        `, -3000, 1000, 0.06), // 17331 generations
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
        `, -1800, 400, 0.035), // 23334 generations
};

(presets[paramaters.get('preset') ?? "glidergun"]).apply(0, 0);

let gpf = (paramaters.get("gpf") ?? 1) * 1;
let speed = (paramaters.get("speed") ?? 100) * 1;
let generations = 0;

setInterval(() => {
    generations += gpf;
    for (let i = 0; i < gpf; i++) ep = e(ep);
}, speed)
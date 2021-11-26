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

let setFullMap =(map, sx, sy, z)=> {
    map.split('\n').forEach((line, y) => 
        line.split('').forEach((char, x) => 
            char == '*' && cw(x - (line.lastIndexOf(" ") + 1), y, true)
        )
    );
    [scrollx, scrolly, zoom] = [sx, sy, z];
}

// query

let paramaters = new URLSearchParams(location.search);
/**
 * preset: preset
 * speed: speed
 * gpf: generations per frame
 */

switch (paramaters.get('preset')) {
    case "galaxy": {
        setFullMap(`
            ******.**
            ******.**
            .......**
            **.....**
            **.....**
            **.....**
            **.......
            **.******
            **.******
        `, 400, 500, 1);
    } break;
    case "glidergun": {
        setFullMap(`
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
        `, 2150, 1500, 0.4);
    } break;
    case "acorn": {
        setFullMap(`
            .*
            ...*
            **..***
        `, -3000, -2000, 0.075)
    } break;
    default: {
        setFullMap("", 0, 0, 1);
    }
}

setInterval(() => {
    for (let i = 0; i < Math.max(paramaters.get("gpf"), 1); i++) ep = e(ep);
}, (paramaters.get("speed") ?? 100) * 1)
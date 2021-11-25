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

// default

let setFullMap =(map, sx, sy, z)=> {
    map.split('\n').forEach((line, y) => 
        line.split('').forEach((char, x) => 
            char == '*' && cw(x - (line.lastIndexOf(" ") + 1), y, true)
        )
    );
    [scrollx, scrolly, zoom] = [sx, sy, z];
}

// // galaxy

// setFullMap(`
    // ******.**
    // ******.**
    // .......**
    // **.....**
    // **.....**
    // **.....**
    // **.......
    // **.******
    // **.******
// `, 1400, 1400, 1);

// glider gun

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
`, 2100, 1500, 0.4);

setInterval(() => ep = e(ep), 60)
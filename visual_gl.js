const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

let viewportSize = 0;

gl.clearColor(0.08, 0.08, 0.08, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

const vertShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader_alive = gl.createShader(gl.FRAGMENT_SHADER);
const fragShader_dead = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertShader, `
    precision mediump float;
    attribute vec2 vertex;
    void main() {
        gl_Position = vec4(vertex, 0.0, 1.0);
    }
`);
gl.shaderSource(fragShader_alive, `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.125, 0.75, 0.625, 1.0);
    }
`);
gl.shaderSource(fragShader_dead, `
    precision mediump float;
    void main() {
        vec2 pos = gl_FragCoord.xy * 0.1;  
        gl_FragColor = vec4(0.125, 0.75, 0.625, 1.0) * (0.15 + abs(step(0.5, fract(pos.x + pos.y))) * 0.15);
    }
`);

gl.compileShader(vertShader);
gl.compileShader(fragShader_alive);
gl.compileShader(fragShader_dead);

const program_alive = gl.createProgram();
const program_dead = gl.createProgram();
gl.attachShader(program_alive, vertShader);
gl.attachShader(program_dead, vertShader);
gl.attachShader(program_alive, fragShader_alive);
gl.attachShader(program_dead, fragShader_dead);
gl.linkProgram(program_alive);
gl.linkProgram(program_dead);

const vertex_alive = gl.getAttribLocation(program_alive, "vertex");
const vertex_dead = gl.getAttribLocation(program_dead, "vertex");
gl.enableVertexAttribArray(vertex_alive);
gl.enableVertexAttribArray(vertex_dead);
gl.vertexAttribPointer(vertex_alive, 2, gl.FLOAT, false, 0, 0);
gl.vertexAttribPointer(vertex_dead, 2, gl.FLOAT, false, 0, 0);

// begin drawing

let scrollx = 0, scrolly = 0, zoom = 1;

let getVertices =(scrollx, scrolly, zoom)=> {
    let vertices = {
        alive: [],
        dead: [],
    };

    Object.keys(m).forEach(x => 
        Object.keys(m[x]).forEach(y => 
            m[x][y] && vertices.alive.push(
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 + 45,
            ) || vertices.dead.push(
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 + 45,
            )
        )
    );

    Object.keys(vertices).forEach(key => {
        vertices[key] = new Float32Array(vertices[key]).map((value, index) => 
            index % 2 ?
            -(value - scrolly) * zoom / (canvas.height / 2) :
            (value - scrollx) * zoom / (canvas.width / 2)
        );
    })

    return vertices;
}

// main

function visualize_gl_bothDeadAndAlive() {
    let vertices = getVertices(scrollx, scrolly, zoom);

    gl.clear(gl.COLOR_BUFFER_BIT);

    if (vertices.alive.length) {
        gl.useProgram(program_alive);
        gl.bufferData(gl.ARRAY_BUFFER, vertices.alive, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.alive.length / 2);
    }

    if (vertices.dead.length) {
        gl.useProgram(program_dead);
        gl.bufferData(gl.ARRAY_BUFFER, vertices.dead, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.dead.length / 2);
    }

    requestAnimationFrame(visualize_gl_bothDeadAndAlive);
}

function visualize_gl_onlyAlive() {
    let vertices = getVertices(scrollx, scrolly, zoom);

    gl.clear(gl.COLOR_BUFFER_BIT);

    if (vertices.alive.length) {
        gl.bufferData(gl.ARRAY_BUFFER, vertices.alive, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.alive.length / 2);
    }

    requestAnimationFrame(visualize_gl_onlyAlive);
}
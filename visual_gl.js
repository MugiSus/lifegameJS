const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

let resize =()=> {
    [canvas.height, canvas.width] = [window.innerHeight, window.innerWidth];
    gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);

let viewportSize = 0;

gl.clearColor(0.08, 0.08, 0.08, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, `
    precision mediump float;
    attribute vec2 vertex;
    void main(void) {
        gl_Position = vec4(vertex, 0.0, 1.0);
    }
`);
gl.compileShader(vertShader);
gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, `
    precision mediump float;
    void main(void) {
        gl_FragColor = vec4(0.125, 0.75, 0.625, 1.0);
    }
`);
gl.compileShader(fragShader);
gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);

const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.getProgramParameter(program, gl.LINK_STATUS);
gl.useProgram(program);

const vertex = gl.getAttribLocation(program, "vertex");
gl.enableVertexAttribArray(vertex);
gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

// begin drawing

let scrollx = 0, scrolly = 0, zoom = 1;

let getVertices =(scrollx, scrolly, zoom)=> {
    let vertices = [];

    Object.keys(m).forEach(x => 
        Object.keys(m[x]).forEach(y => 
            m[x][y] && vertices.push(
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 - 45,
                x * 100 + 45, y * 100 + 45,
                x * 100 - 45, y * 100 + 45,
            )
        )
    );

    return Float32Array.from(vertices).map((value, index) => 
        index % 2 ?
        -(value - scrolly) * zoom / canvas.height :
        (value - scrollx) * zoom / canvas.width
    );
}

function main() {
    let vertices = getVertices(scrollx, scrolly, zoom);

    if (vertices.length) {
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    }

    requestAnimationFrame(main);
}

// galaxy

cw(10, 10, 1);
cw(11, 10, 1);
cw(12, 10, 1);
cw(13, 10, 1);
cw(14, 10, 1);
cw(15, 10, 1);
cw(10, 11, 1);
cw(11, 11, 1);
cw(12, 11, 1);
cw(13, 11, 1);
cw(14, 11, 1);
cw(15, 11, 1);

cw(17, 10, 1);
cw(17, 11, 1);
cw(17, 12, 1);
cw(17, 13, 1);
cw(17, 14, 1);
cw(17, 15, 1);
cw(18, 10, 1);
cw(18, 11, 1);
cw(18, 12, 1);
cw(18, 13, 1);
cw(18, 14, 1);
cw(18, 15, 1);

cw(10, 13, 1);
cw(10, 14, 1);
cw(10, 15, 1);
cw(10, 16, 1);
cw(10, 17, 1);
cw(10, 18, 1);
cw(11, 13, 1);
cw(11, 14, 1);
cw(11, 15, 1);
cw(11, 16, 1);
cw(11, 17, 1);
cw(11, 18, 1);

cw(13, 17, 1);
cw(14, 17, 1);
cw(15, 17, 1);
cw(16, 17, 1);
cw(17, 17, 1);
cw(18, 17, 1);
cw(13, 18, 1);
cw(14, 18, 1);
cw(15, 18, 1);
cw(16, 18, 1);
cw(17, 18, 1);
cw(18, 18, 1);

scrollx = 1400;
scrolly = 1400;

setInterval(() => ep = e(ep), 100)

// main

resize();
main();
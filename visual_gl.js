const canvas = document.getElementById('canvas');
[canvas.height, canvas.width] = [window.innerHeight, window.innerWidth];

const gl = canvas.getContext('webgl');

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

let vertices = new Float32Array([
    0.5, -0.5,
    -0.5, -0.5,
    -0.5, 0.5,
    0.5, 0.5,
]);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW)
gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);

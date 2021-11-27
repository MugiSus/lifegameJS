const canvas = document.getElementById('canvas');
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

function main() {
    let vertices = getVertices(scrollx, scrolly, zoom);

    gl.clear(gl.COLOR_BUFFER_BIT);

    if (vertices.alive.length) {
        gl.bufferData(gl.ARRAY_BUFFER, vertices.alive, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.alive.length / 2);
    }

    // if (vertices.dead.length) {
    //     gl.bufferData(gl.ARRAY_BUFFER, vertices.dead, gl.DYNAMIC_DRAW);
    //     gl.drawArrays(gl.TRIANGLES, 0, vertices.dead.length / 2);
    // }

    requestAnimationFrame(main);
}

// main

main();
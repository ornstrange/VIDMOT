var vertexShaderSource = `#version 300 es

in vec2 a_position;

uniform vec2 u_rotation;

void main() {
  vec2 position = vec2(
    a_position.x * u_rotation.y + a_position.y * u_rotation.x,
    a_position.y * u_rotation.y - a_position.x * u_rotation.x);
  gl_Position = vec4(position, 0, 1);
}`;

var fragmentShaderSource = `#version 300 es

precision mediump float;

out vec4 outColor;

void main() {
  outColor = vec4(0.98, 0.12, 0.02, 1);
}`;

var main = function() {
  var canvas = document.getElementById('c'); // þarf ekkert að kommenta allt erþaaaaaa?
  var gl = canvas.getContext('webgl2');
  resize(gl.canvas);

  // búa til shaders úr source
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // búa til program og smella shaders þar inn
  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // ehv voodoo að finna a_position
  // Búa til buffer
  var positionBuffer = gl.createBuffer();

  var rotationLocation = gl.getUniformLocation(program, "u_rotation"); // finnur u_rotation


  // búa til vertex attribute array og benda því á a_position
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  // benda ARRAY_BUFFER á positionBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var triangleVertices = [ // Hnit fyrir þríhyrning og pakka þeim saman í fallegan pakka fyrir skjákortið
    -.35,  .5,
     .35,  .5,
       0, -.5
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
  // Stillingar fyrir vertex attribute array
  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  var angle = 0;
  var rotation = [0, 1];

  function draw() { // Hér teiknum við
    resize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // passa að hann fara ekki yfir mörkin
    gl.clearColor(0, 0, 0, 1) // svartur bakgrunnslitur
    gl.clear(gl.COLOR_BUFFER_BIT); // og fylla skjáinn með honum

    gl.useProgram(program); // segir sig sjálft
    gl.bindVertexArray(vao); // undirbúið bufferinn fyrir flutning

    gl.uniform2fv(rotationLocation, rotation); // smella snúningum í shaderinn

    // teiknar þrihyrninginn
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);

    if (angle <= Math.PI*2) { angle += 0.0015; }
    else { angle = 0; }

    rotation[0] = Math.sin(angle);
    rotation[1] = Math.cos(angle);
  }

  window.setInterval(draw, 60 / 1000);
}

/* ---------------------------------------------------------------------------- */
// HELPER FUNCTIONS
/* ---------------------------------------------------------------------------- */
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
  gl.deleteProgram(program);
  return undefined;
}

function resize(canvas) {
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight) {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}
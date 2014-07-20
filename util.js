function InitWebGL(gl_element_id)
{
  var glwin = document.getElementById(gl_element_id);

  try
  {
    gl = glwin.getContext('experimental-webgl');
    gl.viewportWidth  = glwin.width;
    gl.viewportHeight = glwin.height;
    gl.clearColor(0.0, 0.0, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }  
  catch(e)
  {
    alert("init error!");
  }

  return gl;
}


function ShaderFromString(gl, str, type)
{
  //console.log(str);
  var shader = gl.createShader(type);
  gl.shaderSource(shader, str);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
    throw gl.getShaderInfoLog(shader);
    //alert("shader create error!");
  }
  return shader;
}

function CreateProgram(gl, vs, fs)
{
  var program = gl.createProgram();
  console.log('Creating VS');
  var vshader = ShaderFromString(gl, vs, gl.VERTEX_SHADER);
  console.log('Creating FS');
  var fshader = ShaderFromString(gl, fs, gl.FRAGMENT_SHADER);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  {
    alert("shader init error!");
    //throw gl.getProgramInfoLog(program);
  }
  return program;
}



/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           return window.setTimeout(callback, 10);
         };
})();
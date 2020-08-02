var random = Math.random;
export function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1
  };
}

export const _$ = selector => document.querySelector(selector);

// 通过script源码来创建着色器
export function createShaderFromScript(gl, shaderType, scriptId) {
  // 获取着色器源代码
  const shaderSource = _$(`#${scriptId}`).innerHTML;
  const type = shaderType.toUpperCase() + '_SHADER';
  // 创建着色器对象
  const shader = gl.createShader(gl[type]);
  // 传递源码到着色器
  gl.shaderSource(shader, shaderSource);
  // 编译做色器程序
  gl.compileShader(shader);

  return shader;
}

// 创建着色器程序
export const createSimpleProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  return program;
}

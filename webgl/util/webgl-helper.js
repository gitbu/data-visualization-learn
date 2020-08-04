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

// 创建buffer
export const createBuffer = (gl, attribute, vertexAttribPointerOptions) => {
  let {
    size,
    type = gl.FLOAT,
    normalize = false,
    stride = 0,
    offset = 0,
  } = vertexAttribPointerOptions;
  // 激活属性
  gl.enableVertexAttribArray(attribute);
  // 创建buffer
  const buffer = gl.createBuffer();
  // 指定绑定点
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 设置读取数据的方式
  gl.vertexAttribPointer(
    attribute,
    size,
    type,
    normalize,
    stride,
    offset
  );

  return buffer;
}

// 切换buffer
export const changeBuffer = (gl, buffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
}

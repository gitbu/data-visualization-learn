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

// 加载纹理
export const loadTexture = (gl, src, attribute, callback) => {
  // 创建img对象
  const img = new Image();
  // 图片加载成功后纹理的处理
  img.onload = () => {
    // 激活纹理0号通道 
    gl.activeTexture(gl.TEXTURE0);
    // 创建纹理对象
    const texture = gl.createTexture();
    // 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // 将图片数据传递到片元着色器
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); 
    // 设置图片缩放算法
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 设置attribute的值
    gl.uniform1i(attribute, 0);
    callback && callback()
  }
  // 加载img图片
  img.src = src;
}

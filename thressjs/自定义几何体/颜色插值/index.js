// 创建场景
const scene = new THREE.Scene();

const geometry = new THREE.BufferGeometry();
//类型数组创建顶点数据
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);

//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 1, 0, //顶点2颜色
  0, 0, 1, //顶点3颜色

  1, 1, 0, //顶点4颜色
  0, 1, 1, //顶点5颜色
  1, 0, 1, //顶点6颜色
]);

// 创建顶点缓冲区对象
const vecticesAttribute = new THREE.BufferAttribute(vertices, 3);
// 创建顶点颜色缓冲区对象
const vecticesColorAttribute = new THREE.BufferAttribute(colors, 3);

geometry.attributes.position = vecticesAttribute;
geometry.attributes.color = vecticesColorAttribute;

// // 点渲染模式
// var material = new THREE.PointsMaterial({
//   vertexColors: THREE.VertexColors,
//   size: 10.0 //点对象像素尺寸
// }); //材质对象
// var points = new THREE.Points(geometry, material); //点模型对象
// scene.add(points); //点对象添加到场景中

// 三角面(网格)渲染模式
var material = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors
});
//材质对象
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh);

// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 300;
camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
}
render();

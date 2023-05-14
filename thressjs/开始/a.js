// 创建场景
const scene = new THREE.Scene();

// 创建网格模型
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  opacity:0.7,
  transparent:true,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 1000);
scene.add(point);
//环境光
// const ambient = new THREE.AmbientLight(0xffffff);
// scene.add(ambient);

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
  mesh.rotateY(0.01);
  // requestAnimationFrame(render);

}
render();

var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.addEventListener('change', render);
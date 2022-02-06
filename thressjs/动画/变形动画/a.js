// 创建场景
const scene = new THREE.Scene();

var geometry = new THREE.BoxGeometry(50, 50, 50); //立方体几何对象
console.log(geometry.vertices);
// 为geometry提供变形目标的数据
var box1 = new THREE.BoxGeometry(100, 5, 100); //为变形目标1提供数据
var box2 = new THREE.BoxGeometry(5, 200, 5); //为变形目标2提供数据
// 设置变形目标的数据
geometry.morphTargets[0] = {name: 'target1',vertices: box1.vertices};
geometry.morphTargets[1] = {name: 'target2',vertices: box2.vertices};

var material = new THREE.MeshLambertMaterial({
  morphTargets: true, //允许变形
  color: 0x0000ff
}); //材质对象
var mesh = new THREE.Mesh(geometry, material); //网格模型对象
// 设置第一组顶点对几何体形状影响的变形系数
mesh.morphTargetInfluences[0] = 0.5;
// 设置第二组顶点对几何体形状影响的变形系数
mesh.morphTargetInfluences[1] = 1;
/**
 * 设置关键帧数据
 */
// 设置变形目标1对应权重随着时间的变化
var Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0,10,20], [0,1, 0]);
// 设置变形目标2对应权重随着时间的变化
var Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20,30, 40], [0, 1,0]);
// 创建一个剪辑clip对象，命名"default"，持续时间40
var clip = new THREE.AnimationClip("default", 40, [Track1,Track2]);
/**
 * 播放编辑好的关键帧数据
 */
var mixer = new THREE.AnimationMixer(mesh); //创建混合器
var AnimationAction = mixer.clipAction(clip); //返回动画操作对象
AnimationAction.timeScale = 5; //默认1，可以调节播放速度
// AnimationAction.loop = THREE.LoopOnce; //不循环播放
// AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
AnimationAction.play(); //开始播放


scene.add(mesh); //网格模型添加到场景中



// 创建点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
//环境光
const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

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


// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

  //clock.getDelta()方法获得两帧的时间间隔
  // 更新混合器相关的时间
  mixer.update(clock.getDelta());
}
render();
import * as THREE from "three";
import Stats from "../../lib/jsm/utils/stats.module.js";

// 存储一些需要操作的全局变量，统一规整到 global 中
const global = {
	Clock: new THREE.Clock(),
};

//新建一个场景
function setScene() {
	global.scene = new THREE.Scene();
}

// 新建透视相机
function setCamera() {
	// 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
	global.camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		5000
	);
	// 相机放在哪个点
	global.camera.position.set(0, 15, 50);
	//默认 (0,0,0) 就行
	global.camera.lookAt(new THREE.Vector3(0, 0, 0));
}

// 设置渲染器  global.renderer
function setRenderer() {
	// antialias 抗锯齿
	global.renderer = new THREE.WebGLRenderer({ antialias: true });
	// 设置画布的大小
	global.renderer.setSize(window.innerWidth, window.innerHeight);

	global.renderer.shadowMap.enabled = true;
	global.renderer.shadowMap.type = THREE.PCFShadowMap;
	//这里 其实就是canvas 画布  renderer.domElement
	document.body.appendChild(global.renderer.domElement);
}

//性能插件 global.stats
//会在左上角显示帧率等情况
function setStats() {
	global.stats = new Stats();
	global.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(global.stats.dom);
}

//创建光源
function setLight() {
	//创建一个平行光光源照射到物体上
	global.light = new THREE.DirectionalLight(0xffffff, 3.5);
	//设置平型光照射方向，照射方向为设置的点照射到原点
	global.light.position.set(0, 0, 10);
	//将灯光放到场景当中
	global.scene.add(global.light);
}

//创建辅助工具
function setHelper() {
	//坐标参考线
	const posHelper = new THREE.AxesHelper(100);
	// 网格参考线
	const gridHelper = new THREE.GridHelper(10, 10, 0x2c2c2c, 0x888888);
	const cameraHelper = new THREE.CameraHelper(global.camera);
	global.scene.add(posHelper);
	global.scene.add(gridHelper);
	global.scene.add(cameraHelper);
}

// keyboard 状态机, 记录哪一个键被按下
function keyboardStateMachine() {
	global.keyState = {
		w: false,
		a: false,
		s: false,
		d: false,
	};
	document.addEventListener(
		"keydown",
		function (event) {
			global.keyState[event.key] = true;
		},
		false
	);
	document.addEventListener(
		"keyup",
		function () {
			global.keyState[event.key] = false;
		},
		false
	);
}
export {
	global,
	setScene,
	setCamera,
	setRenderer,
	setLight,
	setStats,
	setHelper,
	keyboardStateMachine,
};

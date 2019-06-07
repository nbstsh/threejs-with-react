import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';

const GLTF_MODEL_PATH = '3dmodels/old_guy/scene.gltf';
let scene, renderer, camera, controls, loader, obj3D;

export const init = ref => {
	initScene();
	initCamera();
	initRenderer(ref);
	initControls();

	load3Model();
	generateLight();
};

const initScene = () => {
	scene = new THREE.Scene();
};

const initCamera = () => {
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 5;
};

const initRenderer = ref => {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor('#eeeeee');
	renderer.setSize(window.innerWidth, window.innerHeight);
	ref.current.appendChild(renderer.domElement);
};

const initControls = () => {
	controls = new OrbitControls(camera, renderer.domElement);
};

const load3Model = () => {
	loader = new GLTFLoader();
	loader.load(
		GLTF_MODEL_PATH,
		// called when the resource is loaded
		gltf => {
			obj3D = gltf.scene.children[0];
			obj3D.scale.set(0.1, 0.1, 0.1);
			obj3D.rotateZ(90);
			scene.add(gltf.scene);
		},
		// called while loading is progressing
		xhr => {
			console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
		},
		// called when loading has errors
		error => {
			console.error('An error happened', error);
		}
	);
};

const generateLight = () => {
	const light = new THREE.PointLight(0xffffff, 1, 500);
	light.position.set(10, 0, 25);
	scene.add(light);

	// const dLight = new THREE.DirectionalLight(0xffffff, 100);
	// dLight.position.set(0, 1, 0);
	// dLight.castShadow = true;
	// scene.add(dLight);
	// const light1 = new THREE.PointLight(0xc4c4c4, 10);
	// light1.position.set(0, 300, 500);
	// scene.add(light1);
	// const light2 = new THREE.PointLight(0xc4c4c4, 10);
	// light2.position.set(500, 100, 0);
	// scene.add(light2);
	// const light3 = new THREE.PointLight(0xc4c4c4, 10);
	// light3.position.set(0, 100, -500);
	// scene.add(light3);
	// const light4 = new THREE.PointLight(0xc4c4c4, 10);
	// light4.position.set(-500, 300, 0);
	// scene.add(light4);
};

export const render = () => {
	requestAnimationFrame(render);
	renderer.render(scene, camera);

	// rotate 3d object
	if (obj3D) {
		obj3D.rotation.z += 0.01;
	}
};

export const handleResize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
};

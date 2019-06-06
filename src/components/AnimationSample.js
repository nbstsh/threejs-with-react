import React, { useRef, useEffect, useReducer } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo, Power1 } from 'gsap';

const reducer = (state, action) => {
	switch (action.type) {
		case 'scale':
			return { ...state, scale: action.payload };
		case 'rotate':
			return { ...state, rotation: action.payload };
		case 'position':
			return { ...state, position: action.payload };
		default:
			throw new Error();
	}
};

const initialState = {
	scale: { x: 1, y: 1, z: 1 },
	rotation: { x: 0, y: 0, z: 0 },
	position: { x: 0, y: 0, z: 0 }
};

let scene, renderer, camera, box;
const tl = new TimelineMax();

const scaleTimeLine = (x, y, z) => {
	tl.to(box.scale, 0.3, { x, ease: Expo.easeOut });
	tl.to(box.scale, 0.3, { y, ease: Expo.easeOut });
	tl.to(box.scale, 0.3, { z, ease: Expo.easeOut });
};

const AnimationSample = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const containerRef = useRef(null);

	const init = () => {
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor('#eeeeee');
		renderer.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(renderer.domElement);

		generateBox();
		generateLight();
	};

	const generateBox = () => {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshLambertMaterial({ color: '#ef5555' });
		box = new THREE.Mesh(geometry, material);
		box.position.set(...Object.values(state.position));
		box.rotation.set(...Object.values(state.rotation));
		scene.add(box);
	};

	const generateLight = () => {
		const light = new THREE.PointLight(0xffffff, 1, 500);
		light.position.set(10, 0, 25);
		scene.add(light);
	};

	const render = () => {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	useEffect(() => {
		init();
		render();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;

			camera.updateProjectionMatrix();
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const scaleUp = () => {
		let { x, y, z } = state.scale;
		x++;
		y++;
		z++;

		dispatch({
			type: 'scale',
			payload: { x, y, z }
		});
		scaleTimeLine(x, y, z);
	};

	const scaleDown = () => {
		let { x, y, z } = state.scale;
		x--;
		y--;
		z--;

		dispatch({
			type: 'scale',
			payload: { x, y, z }
		});
		scaleTimeLine(x, y, z);
	};

	const rotateX = () => {
		let { x } = state.rotation;
		x += 10;
		dispatch({ type: 'rotate', payload: { ...state.rotation, x } });
		tl.to(box.rotation, 0.5, {
			x: (Math.PI * x) / 100,
			ease: Power1.easeInOut
		});
	};

	const rotateY = () => {
		let { y } = state.rotation;
		y += 10;
		dispatch({ type: 'rotate', payload: { ...state.rotation, y } });
		tl.to(box.rotation, 0.5, {
			y: (Math.PI * y) / 100,
			ease: Power1.easeInOut
		});
	};

	const rotateZ = () => {
		let { z } = state.rotation;
		z += 10;
		dispatch({ type: 'rotate', payload: { ...state.rotation, z } });
		tl.to(box.rotation, 0.5, {
			z: (Math.PI * z) / 100,
			ease: Power1.easeInOut
		});
	};

	const translateX = () => {
		let { x } = state.position;
		x += 1;
		dispatch({ type: 'position', payload: { ...state.position, x } });
		tl.to(box.position, 0.5, { x, ease: Power1.easeInOut });
	};

	const translateY = () => {
		let { y } = state.position;
		y += 1;
		dispatch({ type: 'position', payload: { ...state.position, y } });
		tl.to(box.position, 0.5, { y, ease: Power1.easeInOut });
	};

	const translateZ = () => {
		let { z } = state.position;
		z += 1;
		dispatch({ type: 'position', payload: { ...state.position, z } });
		tl.to(box.position, 0.5, { z, ease: Power1.easeInOut });
	};

	const translateXNegative = () => {
		let { x } = state.position;
		x -= 1;
		dispatch({ type: 'position', payload: { ...state.position, x } });
		tl.to(box.position, 0.5, { x, ease: Power1.easeInOut });
	};

	const translateYNegative = () => {
		let { y } = state.position;
		y -= 1;
		dispatch({ type: 'position', payload: { ...state.position, y } });
		tl.to(box.position, 0.5, { y, ease: Power1.easeInOut });
	};

	const translateZNegative = () => {
		let { z } = state.position;
		z -= 1;
		dispatch({ type: 'position', payload: { ...state.position, z } });
		tl.to(box.position, 0.5, { z, ease: Power1.easeInOut });
	};

	return (
		<div>
			<h1 style={{ padding: '5rem' }}>Animation Sample</h1>
			<div>
				<button onClick={() => scaleUp()}>scaleUp</button>
				<button onClick={() => scaleDown()}>scaleDown</button>
				<button onClick={() => rotateX()}>rotateX</button>
				<button onClick={() => rotateY()}>rotateY</button>
				<button onClick={() => rotateZ()}>rotateZ</button>
				<button onClick={() => translateX()}>positionX</button>
				<button onClick={() => translateY()}>positionY</button>
				<button onClick={() => translateZ()}>positionZ</button>
				<button onClick={() => translateXNegative()}>
					positionX Negative
				</button>
				<button onClick={() => translateYNegative()}>
					positionY Negative
				</button>
				<button onClick={() => translateZNegative()}>
					positionZ Negative
				</button>
			</div>
			<div ref={containerRef} />
		</div>
	);
};

export default AnimationSample;

import React, { useState, useRef, useEffect } from 'react';

import * as THREE from 'three';

const Sample1 = () => {
	const divRef = useRef(null);
	let scene, renderer, camera;
	const [boxes, setBoxes] = useState([]);

	// init scene, renderer, camera
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
		renderer.setClearColor('#e5e5e5');
		renderer.setSize(window.innerWidth, window.innerHeight);
		divRef.current.appendChild(renderer.domElement);
	};

	const addBox = (positionX = 0, positionY = 0, positionZ = 0) => {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(positionX, positionY, positionZ);
		// mesh.rotation.set(1, 3, 1);
		// mesh.scale.set(10, 1, 1);
		scene.add(mesh);
		setBoxes(boxes => [...boxes, mesh]);
	};

	const addLight = () => {
		const light = new THREE.PointLight(0xffffff, 1, 500);
		light.position.set(10, 0, 25);
		scene.add(light);
	};

	const render = () => {
		requestAnimationFrame(render);

		// mesh.rotation.x += 0.05;
		// mesh.rotation.y += 0.05;
		renderer.render(scene, camera);
	};

	useEffect(() => {
		init();
		addBox();
		addLight();
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
	}, []);

	const positionXInput = useFormInput(0);
	const positionYInput = useFormInput(0);
	const positionZInput = useFormInput(0);
	const px = positionXInput.value;
	const py = positionYInput.value;
	const pz = positionZInput.value;
	const rotationXInput = useFormInput(0);
	const rotationYInput = useFormInput(0);
	const rotationZInput = useFormInput(0);
	const rx = rotationXInput.value;
	const ry = rotationYInput.value;
	const rz = rotationZInput.value;

	useEffect(() => {
		if (boxes.length === 0) return;
		boxes[0].position.set(px / 10, py / 10, pz / 10);
		boxes[0].rotation.set(rx / 10, ry / 10, rz / 10);
	}, [px, py, pz, rx, ry, rz]);

	return (
		<>
			<div ref={divRef} />
			<section>
				<legend>position</legend>
				<input type='number' name='positionX' {...positionXInput} />
				<input type='number' name='positionY' {...positionYInput} />
				<input type='number' name='positionZ' {...positionZInput} />
			</section>
			<section>
				<legend>rotation</legend>
				<input type='number' name='rotationX' {...rotationXInput} />
				<input type='number' name='rotationY' {...rotationYInput} />
				<input type='number' name='rotationZ' {...rotationZInput} />
			</section>
		</>
	);
};

const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue);
	const onChange = e => {
		setValue(e.target.value);
	};
	return {
		value,
		onChange
	};
};

export default Sample1;

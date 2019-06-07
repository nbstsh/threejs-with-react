import React, { useRef, useEffect } from 'react';
import { init, render, handleResize } from '../utils/3d-model-sample';

const ModelSample = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		init(containerRef);
		render();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	return (
		<div>
			<h1>3D Model Sample</h1>
			<div ref={containerRef} />
		</div>
	);
};

export default ModelSample;

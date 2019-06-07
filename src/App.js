import React from 'react';
import './App.css';
import Sample1 from './components/Sample1';
import AnimationSample from './components/AnimationSample';
import ModelSample from './components/ModelSample';

function App() {
	return (
		<div className='App'>
			<Sample1 />
			<AnimationSample />
			<ModelSample />
		</div>
	);
}

export default App;

import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import List from './components/main/List';

function App() {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<Nav />
				<List />
			</div>
		</div>
	);
}

export default App;

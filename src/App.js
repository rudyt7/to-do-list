import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import List from './components/main/List';
import LabelContextProvider from './context/labelContext';

function App() {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<LabelContextProvider>
					<Nav />
					<List />
				</LabelContextProvider>
			</div>
		</div>
	);
}

export default App;

import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import List from './components/main/List';
import LabelContextProvider from './context/LabelContext';
import ActionContextProvider from './context/ActionContext';

const App = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<ActionContextProvider>
					<LabelContextProvider>
						<Nav />
						<List />
					</LabelContextProvider>
				</ActionContextProvider>
			</div>
		</div>
	);
};

export default App;

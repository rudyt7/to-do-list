import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import List from './components/main/List';
import Auth from './components/auth/Auth';
import LabelContextProvider from './context/LabelContext';
import ActionContextProvider from './context/ActionContext';
import AuthContextProvider, { AuthContext } from './context/AuthContext';

const App = () => {
	const auth = useContext(AuthContext);

	let routes;
	let content = (
		<main>
			<AuthContextProvider>
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
			</AuthContextProvider>
		</main>
	);

	if (!auth.isLoggedIn) {
		routes = (
			<Switch>
				<Route path="/to-do-list" exact>
					{content}
				</Route>
				<Route path="/to-do-list/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/to-do-list" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/to-do-list" exact>
					{content}
				</Route>
				<Redirect to="/to-do-list" />
			</Switch>
		);
	}

	return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;

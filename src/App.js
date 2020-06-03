import React, { useCallback, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import List from './components/main/List';
import Auth from './components/auth/Auth';
import LabelContextProvider from './context/LabelContext';
import ActionContextProvider from './context/ActionContext';
import { AuthContext } from './context/AuthContext';

const App = () => {
	const [auth, setAuth] = useState(false);
	const [userId, setUserId] = useState(null);

	const loginHandler = useCallback((uid) => {
		setAuth(true);
		setUserId(uid);
	}, []);

	const logoutHandler = useCallback(() => {
		setAuth(false);
		setUserId(null);
	}, []);

	let routes;
	let content = (
		<main>
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

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: auth,
				userId: userId,
				login: loginHandler,
				logout: logoutHandler,
			}}
		>
			<BrowserRouter>{routes}</BrowserRouter>;
		</AuthContext.Provider>
	);
};

export default App;

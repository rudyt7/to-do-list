import React, { useState } from 'react';

export const AuthContext = React.createContext({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

const AuthContextProvider = (props) => {
	const [auth, setAuth] = useState(false);

	const loginHandler = () => {
		setAuth(true);
	};

	const logoutHandler = () => {
		setAuth(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: auth,
				login: loginHandler,
				logout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

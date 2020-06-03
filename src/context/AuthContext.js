import React from 'react';

export const AuthContext = React.createContext({
	isLoggedIn: false,
	userId: null,
	login: () => {},
	logout: () => {},
});

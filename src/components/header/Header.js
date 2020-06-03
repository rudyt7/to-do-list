import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { AuthContext } from '../../context/AuthContext';

const Header = (props) => {
	const auth = useContext(AuthContext);

	return (
		<header className="header">
			<h1 className="header__title">Task-A-Lot</h1>
			{!auth.isLoggedIn && (
				<Link to="/to-do-list/auth">
					<div className="header__signup--btn" aria-label="login-button">
						<i data-feather="user" className="header-icon"></i>
					</div>
				</Link>
			)}
			{auth.isLoggedIn && (
				<div
					className="header__signup--btn"
					onClick={auth.logout}
					aria-label="logout-button"
				>
					<i data-feather="log-out" className="header-icon"></i>
				</div>
			)}
		</header>
	);
};

export default Header;

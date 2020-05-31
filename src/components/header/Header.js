import React from 'react';
import './Header.css';

const Header = (props) => {
	return (
		<header className="header">
			<h1 className="header__title">Task-A-Lot</h1>
			<div className="header__signup--btn">
				<i data-feather="user" className="header-icon"></i>
			</div>
		</header>
	);
};

export default Header;

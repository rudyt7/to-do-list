import React, { useContext } from 'react';
import './Nav.css';

import { LabelContext } from '../../context/LabelContext';

const Nav = (props) => {
	const labelContext = useContext(LabelContext);

	const personalLabelHandler = () => {
		labelContext.setPersonalLabel();
	};
	const workLabelHandler = () => {
		labelContext.setWorkLabel();
	};
	const shoppingLabelHandler = () => {
		labelContext.setShoppingLabel();
	};
	const othersLabelHandler = () => {
		labelContext.setOthersLabel();
	};
	const removeLabelHandler = () => {
		labelContext.clearLabel();
	};

	return (
		<nav className="nav">
			<div>
				<p>Labels</p>
				<button onClick={removeLabelHandler}>All</button>
				<br />
				<br />
				<button onClick={personalLabelHandler}>Personal</button>
				<br />
				<br />
				<button onClick={workLabelHandler}>Work</button>
				<br />
				<br />
				<button onClick={shoppingLabelHandler}>Shopping</button>
				<br />
				<br />
				<button onClick={othersLabelHandler}>Others</button>
				<br />
			</div>
		</nav>
	);
};

export default Nav;

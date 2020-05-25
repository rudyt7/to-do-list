import React, { useContext } from 'react';
import './Nav.css';

import { LabelContext } from '../../context/labelContext';

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
				<p>New</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>
			<br />

			<div>
				<p>In Progress</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>

			<br />
			<div>
				<p>Completed</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>

			<br />
			<div>
				<p>Labels</p>
				<button onClick={removeLabelHandler}>All</button>
				<br />
				<button onClick={personalLabelHandler}>Personal</button>
				<br />
				<button onClick={workLabelHandler}>Work</button>
				<br />
				<button onClick={shoppingLabelHandler}>Shopping</button>
				<br />
				<button onClick={othersLabelHandler}>Others</button>
				<br />
			</div>
		</nav>
	);
};

export default Nav;

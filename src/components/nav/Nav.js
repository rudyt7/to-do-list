import React, { useContext } from 'react';
import './Nav.css';

import { LabelContext } from '../../context/LabelContext';
import { ActionContext } from '../../context/ActionContext';

const Nav = (props) => {
	const labelContext = useContext(LabelContext);
	const actionContext = useContext(ActionContext);

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

	const newTaskHandler = () => {
		actionContext.setNew();
	};
	const completedTaskHandler = () => {
		actionContext.setCompleted();
	};
	const inProgressTaskHandler = () => {
		actionContext.setInProgress();
	};
	const missedTaskHandler = () => {
		actionContext.setMissed();
	};

	return (
		<nav className="nav">
			<div>
				<p>Actions</p>
				<button onClick={newTaskHandler}>New</button>
				<br />
				<button onClick={completedTaskHandler}>In Progress</button>
				<br />
				<button onClick={inProgressTaskHandler}>Completed</button>
				<br />
				<button onClick={missedTaskHandler}>Missed</button>
				<br />
			</div>
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

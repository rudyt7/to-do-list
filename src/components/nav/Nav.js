import React, { useState, useContext } from 'react';
import './Nav.css';

import { LabelContext } from '../../context/LabelContext';
import { motion } from 'framer-motion';

const Nav = (props) => {
	const labelContext = useContext(LabelContext);
	const [toggle, setToggle] = useState(true);

	const personalLabelHandler = () => {
		labelContext.setPersonalLabel();
		if (labelContext.label === 'personal') {
			labelContext.clearLabel();
		}
	};
	const workLabelHandler = () => {
		labelContext.setWorkLabel();
		if (labelContext.label === 'work') {
			labelContext.clearLabel();
		}
	};
	const shoppingLabelHandler = () => {
		labelContext.setShoppingLabel();
	};
	const othersLabelHandler = () => {
		labelContext.setOthersLabel();
	};
	const removeLabelHandler = () => {
		labelContext.clearLabel();
		setToggle(!toggle);
	};

	const toggleClassName = `nav-toggle ${toggle ? 'on' : 'off'}`;

	return (
		<nav className="nav">
			<li>
				<p className="title">Labels</p>
				<div>
					<p clasName="label-title">All</p>
					<motion.ul
						className={toggleClassName}
						{...props}
						animate
						onClick={removeLabelHandler}
					>
						<motion.div animate />
					</motion.ul>
				</div>
				<br />
				<br />
				<motion.ul
					className={toggleClassName}
					{...props}
					animate
					onClick={personalLabelHandler}
				>
					<motion.div animate />
				</motion.ul>
				<br />
				<br />
				<motion.ul
					className={toggleClassName}
					animate
					{...props}
					onClick={workLabelHandler}
				>
					<motion.div animate />
				</motion.ul>
				<br />
				<br />
				<motion.ul
					className={toggleClassName}
					animate
					{...props}
					onClick={shoppingLabelHandler}
				>
					<motion.div animate />
				</motion.ul>
				<br />
				<br />
				<motion.ul
					className={toggleClassName}
					animate
					{...props}
					onClick={othersLabelHandler}
				>
					<motion.div animate />
				</motion.ul>
				<br />
			</li>
		</nav>
	);
};

export default Nav;

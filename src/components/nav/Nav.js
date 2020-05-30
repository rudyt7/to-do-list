import React, { useContext } from 'react';
import './Nav.css';

import { LabelContext } from '../../context/LabelContext';
import { motion } from 'framer-motion';

const Nav = (props) => {
	const labelContext = useContext(LabelContext);

	const personalLabelHandler = () => {
		if (labelContext.label === '') {
			labelContext.setPersonalLabel();
			document.getElementById('personalToggle').classList.toggle('on');
			document.getElementById('personalLabel').classList.toggle('on');
		} else if (labelContext.label === 'personal') {
			document.getElementById('personalToggle').classList.toggle('on');
			document.getElementById('personalLabel').classList.toggle('on');
			labelContext.clearLabel();
		} else {
			labelContext.setPersonalLabel();
			const HTMLButtons = document.getElementsByClassName('nav-toggle on');
			const labels = document.getElementsByClassName('nav__label on');
			const toggle = [...HTMLButtons];
			const label = [...labels];
			toggle[0].classList.toggle('on');
			label[0].classList.toggle('on');
			document.getElementById('personalToggle').classList.toggle('on');
			document.getElementById('personalLabel').classList.toggle('on');
		}
	};
	const workLabelHandler = () => {
		if (labelContext.label === '') {
			labelContext.setWorkLabel();
			document.getElementById('workToggle').classList.toggle('on');
			document.getElementById('workLabel').classList.toggle('on');
		} else if (labelContext.label === 'work') {
			document.getElementById('workToggle').classList.toggle('on');
			document.getElementById('workLabel').classList.toggle('on');
			labelContext.clearLabel();
		} else {
			labelContext.setWorkLabel();
			const HTMLButtons = document.getElementsByClassName('nav-toggle on');
			const labels = document.getElementsByClassName('nav__label on');
			const toggle = [...HTMLButtons];
			const label = [...labels];
			toggle[0].classList.toggle('on');
			label[0].classList.toggle('on');
			document.getElementById('workToggle').classList.toggle('on');
			document.getElementById('workLabel').classList.toggle('on');
		}
	};
	const shoppingLabelHandler = () => {
		if (labelContext.label === '') {
			labelContext.setShoppingLabel();
			document.getElementById('shoppingToggle').classList.toggle('on');
			document.getElementById('shoppingLabel').classList.toggle('on');
		} else if (labelContext.label === 'shopping') {
			document.getElementById('shoppingToggle').classList.toggle('on');
			document.getElementById('shoppingLabel').classList.toggle('on');
			labelContext.clearLabel();
		} else {
			labelContext.setShoppingLabel();
			const HTMLButtons = document.getElementsByClassName('nav-toggle on');
			const labels = document.getElementsByClassName('nav__label on');
			const toggle = [...HTMLButtons];
			const label = [...labels];
			toggle[0].classList.toggle('on');
			label[0].classList.toggle('on');
			document.getElementById('shoppingToggle').classList.toggle('on');
			document.getElementById('shoppingLabel').classList.toggle('on');
		}
	};
	const othersLabelHandler = () => {
		if (labelContext.label === '') {
			labelContext.setOthersLabel();
			document.getElementById('othersToggle').classList.toggle('on');
			document.getElementById('othersLabel').classList.toggle('on');
		} else if (labelContext.label === 'others') {
			document.getElementById('othersToggle').classList.toggle('on');
			document.getElementById('othersLabel').classList.toggle('on');
			labelContext.clearLabel();
		} else {
			labelContext.setOthersLabel();
			const HTMLButtons = document.getElementsByClassName('nav-toggle on');
			const labels = document.getElementsByClassName('nav__label on');
			const toggle = [...HTMLButtons];
			const label = [...labels];
			toggle[0].classList.toggle('on');
			document.getElementById('othersToggle').classList.toggle('on');
			label[0].classList.toggle('on');
			document.getElementById('othersLabel').classList.toggle('on');
		}
	};

	return (
		<nav className="nav">
			<ul className="nav__toggle">
				<div className="nav__title">
					<i data-feather="tag" className="nav__title-icon"></i>Labels
				</div>
				<div className="nav__underline"></div>
				<div className="nav__toggle-container">
					<label id="personalLabel" className="nav__label">
						<i data-feather="home" className="nav-icon"></i>
						Personal
					</label>
					<motion.li
						className="nav-toggle"
						id="personalToggle"
						{...props}
						onClick={personalLabelHandler}
					>
						<motion.div />
					</motion.li>
				</div>
				<div className="nav__toggle-container">
					<label id="workLabel" className="nav__label">
						<i data-feather="briefcase" className="nav-icon"></i>
						Work
					</label>
					<motion.li
						id="workToggle"
						className="nav-toggle"
						{...props}
						onClick={workLabelHandler}
					>
						<motion.div />
					</motion.li>
				</div>
				<div className="nav__toggle-container">
					<label id="shoppingLabel" className="nav__label">
						<i data-feather="shopping-cart" className="nav-icon"></i>
						Shopping
					</label>
					<motion.li
						id="shoppingToggle"
						className="nav-toggle"
						{...props}
						onClick={shoppingLabelHandler}
					>
						<motion.div />
					</motion.li>
				</div>
				<div className="nav__toggle-container">
					<label id="othersLabel" className="nav__label">
						<i data-feather="layers" className="nav-icon"></i>
						Others
					</label>
					<motion.li
						id="othersToggle"
						className="nav-toggle"
						{...props}
						onClick={othersLabelHandler}
					>
						<motion.div />
					</motion.li>
				</div>
			</ul>
		</nav>
	);
};

export default Nav;

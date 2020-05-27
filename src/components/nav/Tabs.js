import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import './Tabs.css';

import { ActionContext } from '../../context/ActionContext';

const Tabs = (props) => {
	const actionContext = useContext(ActionContext);

	const allTaskHandler = () => {
		actionContext.setAll();
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

	useEffect(() => {
		const button = document.getElementById(1);
		button.classList.add('active');
		actionContext.setAll();
	}, []);

	const toggleClassHandler = (id) => {
		const HTMLButtons = document.getElementsByClassName('tabs__item');
		const buttons = [...HTMLButtons];
		buttons.forEach((button) => {
			button.classList.remove('active');
		});
		const button = document.getElementById(`${id}`);
		button.classList.toggle('active');

		switch (id) {
			case 1:
				allTaskHandler();
				break;
			case 2:
				completedTaskHandler();
				break;
			case 3:
				inProgressTaskHandler();
				break;
			case 4:
				missedTaskHandler();
				break;
			default:
		}
	};

	return (
		<div className="tabs-container">
			<ul className="tabs">
				<motion.li
					whileTap={{ scale: 0.9 }}
					className={`tabs__item tab-1`}
					id="1"
					onClick={() => toggleClassHandler(1)}
				>
					All
				</motion.li>
				<motion.li
					whileTap={{ scale: 0.9 }}
					className={`tabs__item tab-2`}
					id="2"
					onClick={() => toggleClassHandler(2)}
				>
					Completed
				</motion.li>
				<motion.li
					whileTap={{ scale: 0.9 }}
					className={`tabs__item tab-3`}
					id="3"
					onClick={() => toggleClassHandler(3)}
				>
					In Progress
				</motion.li>
				<motion.li
					whileTap={{ scale: 0.9 }}
					className={`tabs__item tab-4`}
					id="4"
					onClick={() => toggleClassHandler(4)}
				>
					Missed
				</motion.li>
			</ul>
		</div>
	);
};

export default Tabs;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import * as feather from 'feather-icons';
import './ListItem.css';

const ListItem = (props) => {
	function isEmptyOrSpaces(str) {
		return str === null || str.match(/^ *$/) !== null;
	}

	useEffect(() => {
		feather.replace();
	}, []);

	// let listItem = null;

	if (isEmptyOrSpaces(props.title)) {
		return null;
	}
	// } else {
	// 	// switch (props.type) {
	// 	//     case 'personal':
	// 	//       break;
	// 	//     case 'work':
	// 	//       break;
	// 	//     case 'shopping':
	// 	//       break;
	// 	//     case 'others':
	// 	//       break;
	// 	//     default:
	// 	//       break;
	// 	// }
	// }

	const unCompleteHandler = () => {};

	const completeHandler = () => {
		props.done(props.id);
	};

	const deleteHandler = () => {
		props.remove(props.id);
	};

	return (
		<motion.li
			key={props.id}
			id="list-item"
			className="list-item"
			positionTransition
			initial={{ opacity: 0, y: 50, scale: 0.3 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
		>
			<h1 className="list-item__title">{props.title}</h1>
			<div className="list-item__description">{props.children}</div>
			<div className="list-item__date">{props.date}</div>
			<div className="list-item__type">{props.type}</div>
			<div className="list-item__btn" onClick={completeHandler}>
				<i data-feather="check-square" className="icon"></i>
			</div>
			<div className="list-item__btn" onClick={deleteHandler}>
				<i data-feather="trash" className="icon"></i>
			</div>
		</motion.li>
	);
};

export default ListItem;

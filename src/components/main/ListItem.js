import React, { useEffect } from 'react';
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
		return false;
	} else {
		// switch (props.type) {
		//     case 'personal':
		//       break;
		//     case 'work':
		//       break;
		//     case 'shopping':
		//       break;
		//     case 'others':
		//       break;
		//     default:
		//       break;
		// }
	}

	// function handleOngoing() {}

	const completeHandler = () => {
		props.done(props.id);
	};

	const deleteHandler = () => {};

	return (
		<li className="list-item" id="list-item">
			<h1 className="list-item__title">{props.title}</h1>
			<div className="list-item__description">{props.children}</div>
			<div className="list-item__date">{props.date}</div>
			<div className="list-item__type">{props.type}</div>
			<div className="list-item__btn" onClick={completeHandler}>
				<i data-feather="check" className="icon"></i>
			</div>
			<div className="list-item__btn" onClick={deleteHandler}>
				<i data-feather="trash" className="icon"></i>
			</div>
		</li>
	);
};

export default ListItem;

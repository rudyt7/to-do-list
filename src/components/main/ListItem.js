import React from 'react';
import './ListItem.css';

const ListItem = (props) => {
	function isEmptyOrSpaces(str) {
		return str === null || str.match(/^ *$/) !== null;
	}

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

	return (
		<li className="list-item" id="list-item">
			<div style={{ float: 'right' }}>
				<button className="itembtn comp">&#10003;</button>
				<button className="itembtn del">&#10005;</button>
			</div>
			<h2>{props.title}</h2>
			{props.children}
		</li>
	);
};

export default ListItem;

import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import * as feather from 'feather-icons';
import './ListItem.css';

import { ActionContext } from '../../context/ActionContext';

const ListItem = (props) => {
	// function isEmptyOrSpaces(str) {
	// 	return str === null || str.match(/^ *$/) !== null;
	// }

	const [action, setAction] = useState('progress');
	const actionContext = useContext(ActionContext);

	useEffect(() => {
		feather.replace();
	}, []);

	let listItem = null;

	const unCompleteHandler = () => {
		props.undo(props.id);
		if (action === 'complete' && actionContext.action === 'all') {
			const completeButton = document.getElementsByClassName('btn-complete');
			const undoButton = document.getElementsByClassName('btn-undo');
			const complete = [...completeButton];
			const undo = [...undoButton];
			complete[0].classList.toggle('disabled');
			undo[0].classList.toggle('disabled');
			setAction('progress');
		}
	};

	const completeHandler = () => {
		props.done(props.id);
		if (action === 'progress' && actionContext.action === 'all') {
			const completeButton = document.getElementsByClassName('btn-complete');
			const undoButton = document.getElementsByClassName('btn-undo');
			const complete = [...completeButton];
			const undo = [...undoButton];
			complete[0].classList.toggle('disabled');
			undo[0].classList.toggle('disabled');
			setAction('complete');
		}
	};

	const deleteHandler = () => {
		props.remove(props.id);
	};

	if (props.complete) {
		if (actionContext.action === 'all') {
			listItem = (
				<div>
					<h1 className="list-item__title">{props.title}</h1>
					<div className="list-item__description">{props.children}</div>
					<div className="list-item__date">{props.date}</div>
					<div className="list-item__type">{props.type}</div>
					<div
						className="list-item__btn btn-complete disabled"
						onClick={completeHandler}
					>
						<i data-feather="check-square" className="icon icon-complete"></i>
					</div>
					<div className="list-item__btn btn-undo" onClick={unCompleteHandler}>
						<i data-feather="corner-down-left" className="icon icon-undo"></i>
					</div>
					<div className="list-item__btn" onClick={deleteHandler}>
						<i data-feather="trash" className="icon icon-delete"></i>
					</div>
				</div>
			);
		} else if (actionContext.action === 'completed') {
			listItem = (
				<div>
					<h1 className="list-item__title">{props.title}</h1>
					<div className="list-item__description">{props.children}</div>
					<div className="list-item__date">{props.date}</div>
					<div className="list-item__type">{props.type}</div>
					<div className="list-item__btn btn-undo" onClick={unCompleteHandler}>
						<i data-feather="corner-down-left" className="icon icon-undo"></i>
					</div>
					<div className="list-item__btn" onClick={deleteHandler}>
						<i data-feather="trash" className="icon icon-delete"></i>
					</div>
				</div>
			);
		}
	} else if (props.progress) {
		if (actionContext.action === 'all') {
			listItem = (
				<div>
					<h1 className="list-item__title">{props.title}</h1>
					<div className="list-item__description">{props.children}</div>
					<div className="list-item__date">{props.date}</div>
					<div className="list-item__type">{props.type}</div>
					<div
						className="list-item__btn  btn-complete"
						onClick={completeHandler}
					>
						<i data-feather="check-square" className="icon icon-complete"></i>
					</div>
					<div
						className="list-item__btn  btn-undo disabled"
						onClick={unCompleteHandler}
					>
						<i data-feather="corner-down-left" className="icon icon-undo"></i>
					</div>
					<div className="list-item__btn" onClick={deleteHandler}>
						<i data-feather="trash" className="icon icon-delete"></i>
					</div>
				</div>
			);
		} else if (actionContext.action === 'progress') {
			listItem = (
				<div>
					<h1 className="list-item__title">{props.title}</h1>
					<div className="list-item__description">{props.children}</div>
					<div className="list-item__date">{props.date}</div>
					<div className="list-item__type">{props.type}</div>
					<div
						className="list-item__btn  btn-complete"
						onClick={completeHandler}
					>
						<i data-feather="check-square" className="icon icon-complete"></i>
					</div>
					<div className="list-item__btn" onClick={deleteHandler}>
						<i data-feather="trash" className="icon icon-delete"></i>
					</div>
				</div>
			);
		}
	} else if (props.missed) {
		listItem = (
			<div>
				<h1 className="list-item__title">{props.title}</h1>
				<div className="list-item__description">{props.children}</div>
				<div className="list-item__date">{props.date}</div>
				<div className="list-item__type">{props.type}</div>
				<div className="list-item__btn" onClick={deleteHandler}>
					<i data-feather="trash" className="icon"></i>
				</div>
			</div>
		);
	}

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
			{listItem}
		</motion.li>
	);
};

export default ListItem;

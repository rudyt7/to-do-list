import React, { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as feather from 'feather-icons';
import './ListItem.css';

import { ActionContext } from '../../context/ActionContext';

const iconAnimations = {
	initial: {
		rotate: 0,
	},
	final: {
		rotate: 180,
	},
};

const displayAnimations = {
	initial: {
		display: 'none',
		height: 0,
	},
	final: {
		display: 'block',
		height: 50,
	},
};

const ListItem = (props) => {
	const actionContext = useContext(ActionContext);

	const [displayDescription, setDisplayDescription] = useState(false);

	useEffect(() => {
		feather.replace();
	}, []);

	let listItem = null;

	const displayDescriptionHandler = () => {
		setDisplayDescription(!displayDescription);
	};

	const unCompleteHandler = () => {
		props.undo(props.id);
		// setAction('progress');
		// if (action === 'complete') {
		// 	const completeButton = document.getElementsByClassName('btn-complete');
		// 	const undoButton = document.getElementsByClassName('btn-undo');
		// 	const complete = [...completeButton];
		// 	const undo = [...undoButton];
		// 	undo[0].classList.toggle('disabled');
		// 	if (actionContext.action === 'all') {
		// 		complete[0].classList.toggle('disabled');
		// 	}
		// 	setAction('progress');
		// }
	};

	const completeHandler = () => {
		props.done(props.id);
		// setAction('complete');
		// if (action === 'progress') {
		// 	const completeButton = document.getElementsByClassName('btn-complete');
		// 	const undoButton = document.getElementsByClassName('btn-undo');
		// 	const complete = [...completeButton];
		// 	const undo = [...undoButton];
		// 	complete[0].classList.toggle('disabled');
		// 	if (actionContext.action === 'all') {
		// 		undo[0].classList.toggle('disabled');
		// 	}
		// 	setAction('complete');
		// }
	};

	const deleteHandler = () => {
		props.remove(props.id);
	};

	if (props.complete) {
		if (actionContext.action === 'all') {
			listItem = (
				<div className="list-item__container">
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
				<div className="list-item__container">
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
				<motion.div className="list-item__container">
					<div className="list-item__header">
						<h1 className="list-item__title">{props.title}</h1>
						<div className="list-item__type">{props.type}</div>
						<motion.div
							className="list-item__icon-container"
							whileHover={{ scale: 1.2 }}
							animate={displayDescription ? 'final' : 'initial'}
							variants={iconAnimations}
							onTap={displayDescriptionHandler}
						>
							<motion.i
								animate="final"
								variants={iconAnimations}
								data-feather="chevron-down"
								className="list-item__icon"
							></motion.i>
						</motion.div>
					</div>
					<div className="list-item__underline"></div>
					<AnimatePresence>
						<motion.div
							initial="initial"
							id="item__description"
							animate={displayDescription ? 'final' : 'initial'}
							variants={displayAnimations}
							className="list-item__description"
							exit={{
								display: 'none',
								height: 0,
							}}
						>
							{props.children}
						</motion.div>
					</AnimatePresence>
					<div className="list-item__footer">
						<div className="list-item__date">{props.date}</div>
						<div className="list-item__buttons">
							<div
								className="list-item__btn  btn-complete"
								onClick={completeHandler}
							>
								<i
									data-feather="check-square"
									className="icon icon-complete"
								></i>
							</div>
							<div
								className="list-item__btn  btn-undo disabled"
								onClick={unCompleteHandler}
							>
								<i
									data-feather="corner-down-left"
									className="icon icon-undo"
								></i>
							</div>
							<div className="list-item__btn" onClick={deleteHandler}>
								<i data-feather="trash" className="icon icon-delete"></i>
							</div>
						</div>
					</div>
				</motion.div>
			);
		} else if (actionContext.action === 'progress') {
			listItem = (
				<div className="list-item__container">
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
			<div className="list-item__container">
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

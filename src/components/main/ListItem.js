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
		opacity: 0,
		height: 0,
	},
	final: {
		opacity: 1,
		height: 50,
	},
	transition: {
		when: 'beforeChildren',
		staggerChildren: 0.1,
	},
};

const ListItem = (props) => {
	const actionContext = useContext(ActionContext);

	const [displayDescription, setDisplayDescription] = useState(false);

	useEffect(() => {
		feather.replace();
	});

	useEffect(() => {
		if (props.date < new Date().toISOString().slice(0, 9)) {
			props.miss(props.id);
		}
	}, []);

	let listItem = null;

	const displayDescriptionHandler = () => {
		setDisplayDescription(!displayDescription);
	};

	const unCompleteHandler = () => {
		if (!props.progress) {
			props.undo(props.id);
		}
	};

	const completeHandler = () => {
		if (!props.complete) {
			props.done(props.id);
		}
	};

	const deleteHandler = () => {
		props.remove(props.id);
	};

	if (props.complete) {
		if (actionContext.action === 'all') {
			listItem = (
				<motion.div className="list-item__container">
					<div className="list-item__header">
						<h1 className="list-item__title">{props.title}</h1>
						<div className="list-item__type">{props.type}</div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1.1 }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 20,
							}}
							className="list-item__chip-completed"
						>
							Completed
						</motion.div>
						{props.children && (
							<motion.div
								className="list-item__icon-container"
								whileHover={{ scale: 1.2 }}
								animate={displayDescription ? 'final' : 'initial'}
								variants={iconAnimations}
								onTap={displayDescriptionHandler}
							>
								<motion.i
									data-feather="chevron-down"
									className="list-item__icon"
								></motion.i>
							</motion.div>
						)}
					</div>
					<div className="list-item__underline"></div>
					{props.children && (
						<AnimatePresence>
							<motion.div
								id="item__description"
								animate={displayDescription ? 'final' : 'initial'}
								variants={displayAnimations}
								className="list-item__description"
							>
								{props.children}
							</motion.div>
						</AnimatePresence>
					)}
					<div className="list-item__footer">
						<div className="list-item__date">
							{`${props.date.slice(5, 7)}-${props.date.slice(8)}
							-${props.date.slice(0, 4)}`}
						</div>
						<div className="list-item__buttons">
							<div
								className="list-item__btn  btn-complete disabled"
								disabled
								onClick={completeHandler}
							>
								<i
									data-feather="check-square"
									className="icon icon-complete"
								></i>
							</div>
							<div
								className="list-item__btn  btn-undo"
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
		} else if (actionContext.action === 'completed') {
			listItem = (
				<motion.div className="list-item__container">
					<div className="list-item__header">
						<h1 className="list-item__title">{props.title}</h1>
						<div className="list-item__type">{props.type}</div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1.1 }}
							className="list-item__chip-completed"
						>
							Completed
						</motion.div>
						{props.children && (
							<motion.div
								className="list-item__icon-container"
								whileHover={{ scale: 1.2 }}
								animate={displayDescription ? 'final' : 'initial'}
								variants={iconAnimations}
								onTap={displayDescriptionHandler}
							>
								<motion.i
									data-feather="chevron-down"
									className="list-item__icon"
								></motion.i>
							</motion.div>
						)}
					</div>
					<div className="list-item__underline"></div>
					{props.children && (
						<AnimatePresence>
							<motion.div
								id="item__description"
								animate={displayDescription ? 'final' : 'initial'}
								variants={displayAnimations}
								className="list-item__description"
							>
								{props.children}
							</motion.div>
						</AnimatePresence>
					)}
					<div className="list-item__footer">
						<div className="list-item__date">
							{`${props.date.slice(5, 7)}-${props.date.slice(8)}
							-${props.date.slice(0, 4)}`}
						</div>
						<div className="list-item__buttons">
							<div
								className="list-item__btn  btn-undo"
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
		}
	} else if (props.progress) {
		if (actionContext.action === 'all') {
			listItem = (
				<motion.div className="list-item__container">
					<div className="list-item__header">
						<h1 className="list-item__title">{props.title}</h1>
						<div className="list-item__type">{props.type}</div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="list-item__chip-progress"
						>
							In Progress
						</motion.div>
						{props.children && (
							<motion.div
								className="list-item__icon-container"
								whileHover={{ scale: 1.2 }}
								animate={displayDescription ? 'final' : 'initial'}
								variants={iconAnimations}
								onTap={displayDescriptionHandler}
							>
								<motion.i
									data-feather="chevron-down"
									className="list-item__icon"
								></motion.i>
							</motion.div>
						)}
					</div>
					<div className="list-item__underline"></div>
					{props.children && (
						<AnimatePresence>
							<motion.div
								id="item__description"
								animate={displayDescription ? 'final' : 'initial'}
								variants={displayAnimations}
								className="list-item__description"
							>
								{props.children}
							</motion.div>
						</AnimatePresence>
					)}
					<div className="list-item__footer">
						<div className="list-item__date">
							{`${props.date.slice(5, 7)}-${props.date.slice(8)}
							-${props.date.slice(0, 4)}`}
						</div>
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
								disabled
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
				<motion.div className="list-item__container">
					<div className="list-item__header">
						<h1 className="list-item__title">{props.title}</h1>
						<div className="list-item__type">{props.type}</div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="list-item__chip-progress"
						>
							In Progress
						</motion.div>
						{props.children && (
							<motion.div
								className="list-item__icon-container"
								whileHover={{ scale: 1.2 }}
								animate={displayDescription ? 'final' : 'initial'}
								variants={iconAnimations}
								onTap={displayDescriptionHandler}
							>
								<motion.i
									data-feather="chevron-down"
									className="list-item__icon"
								></motion.i>
							</motion.div>
						)}
					</div>
					<div className="list-item__underline"></div>
					{props.children && (
						<AnimatePresence>
							<motion.div
								id="item__description"
								animate={displayDescription ? 'final' : 'initial'}
								variants={displayAnimations}
								className="list-item__description"
							>
								{props.children}
							</motion.div>
						</AnimatePresence>
					)}
					<div className="list-item__footer">
						<div className="list-item__date">
							{`${props.date.slice(5, 7)}-${props.date.slice(8)}
							-${props.date.slice(0, 4)}`}
						</div>
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
							<div className="list-item__btn" onClick={deleteHandler}>
								<i data-feather="trash" className="icon icon-delete"></i>
							</div>
						</div>
					</div>
				</motion.div>
			);
		}
	} else if (props.missed) {
		listItem = (
			<motion.div className="list-item__container">
				<div className="list-item__header">
					<h1 className="list-item__title">{props.title}</h1>
					<div className="list-item__type">{props.type}</div>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 0.9 }}
						className="list-item__chip-missed"
					>
						Missed
					</motion.div>
					{props.children && (
						<motion.div
							className="list-item__icon-container"
							whileHover={{ scale: 1.2 }}
							animate={displayDescription ? 'final' : 'initial'}
							variants={iconAnimations}
							onTap={displayDescriptionHandler}
						>
							<motion.i
								data-feather="chevron-down"
								className="list-item__icon"
							></motion.i>
						</motion.div>
					)}
				</div>
				<div className="list-item__underline"></div>
				{props.children && (
					<AnimatePresence>
						<motion.div
							id="item__description"
							animate={displayDescription ? 'final' : 'initial'}
							variants={displayAnimations}
							className="list-item__description"
						>
							{props.children}
						</motion.div>
					</AnimatePresence>
				)}
				<div className="list-item__footer">
					<div className="list-item__date">
						{`${props.date.slice(5, 7)}-${props.date.slice(8)}
							-${props.date.slice(0, 4)}`}
					</div>
					<div className="list-item__buttons">
						<div className="list-item__btn" onClick={deleteHandler}>
							<i data-feather="trash" className="icon icon-delete"></i>
						</div>
					</div>
				</div>
			</motion.div>
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

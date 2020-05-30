import React, { useEffect } from 'react';
import * as feather from 'feather-icons';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 } from 'uuid';
import './Modal.css';

import BackDrop from './Backdrop';

const modalAnimations = {
	hidden: {
		opacity: 0,
		scale: 0,
		x: '-50%',
		y: '-50%',
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: '-50%',
		y: '-50%',
		transition: {
			delay: 0.1,
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
};

const backdropAnimations = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 2,
	},
	exit: {
		opacity: 0,
		scale: 0,
	},
};

const ModalOverlay = (props) => {
	const submitForm = (event) => {
		event.preventDefault();
	};

	const addTaskHandler = () => {
		const title = document.getElementById('title').value;
		const description = document.getElementById('description').value;
		const date = document.getElementById('date').value;
		const type = document.getElementById('type').value;

		if (!title || !date) {
			return;
		}

		const task = {
			id: v4(),
			title,
			description,
			date,
			completed: false,
			progress: true,
			missed: false,
		};

		switch (type) {
			case 'personal':
				props.addTask({ ...task, type: 'personal' });
				break;

			case 'work':
				props.addTask({ ...task, type: 'work' });
				break;

			case 'shopping':
				props.addTask({ ...task, type: 'shopping' });
				break;

			case 'others':
				props.addTask({ ...task, type: 'others' });
				break;

			default:
				props.addTask({ ...task, type: 'others' });
				break;
		}
		props.hide();
	};

	const modal = (
		<AnimatePresence>
			<motion.div
				className="modal"
				variants={modalAnimations}
				initial="hidden"
				animate="visible"
			>
				<form onSubmit={submitForm}>
					{props.children}
					<div className="modal__btn-container">
						<button
							className="modal__btn"
							type="submit"
							onClick={addTaskHandler}
						>
							<i data-feather="check" className="add-icon"></i>
							Add Task
						</button>
						<button className="modal__btn" type="reset">
							<i data-feather="delete" className="clear-icon"></i>
							Clear Input
						</button>
						<button className="modal__btn-close" onClick={props.hide}>
							<i data-feather="x" className="x-icon"></i>
						</button>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	);
	return ReactDOM.createPortal(modal, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	useEffect(() => {
		feather.replace();
	});

	return (
		<motion.div className="modal--container">
			{props.show && (
				<BackDrop onClick={props.hide} variants={backdropAnimations} />
			)}
			{props.show && <ModalOverlay {...props} />}
		</motion.div>
	);
};

export default Modal;

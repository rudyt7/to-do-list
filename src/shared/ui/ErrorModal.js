import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as feather from 'feather-icons';
import ReactDOM from 'react-dom';

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
	const modal = (
		<AnimatePresence>
			<motion.div
				className="modal__error"
				variants={modalAnimations}
				initial="hidden"
				animate="visible"
			>
				<h1 className="modal__error-heading">
					<i data-feather="alert-octagon" className="error-icon"></i>
					An Error Occurred
				</h1>
				{props.error}
				<button className="modal__btn-error" onClick={props.hide}>
					<i data-feather="x" className="x-icon"></i>
				</button>
			</motion.div>
		</AnimatePresence>
	);
	return ReactDOM.createPortal(modal, document.getElementById('modal-hook'));
};

const ErrorModal = (props) => {
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

export default ErrorModal;

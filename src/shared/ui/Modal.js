import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

import BackDrop from './Backdrop';

const ModalOverlay = (props) => {
	const submitForm = (event) => {
		event.preventDefault();
	};

	const modal = (
		<div className="modal">
			<form onSubmit={submitForm}>{props.children}</form>
		</div>
	);
	return ReactDOM.createPortal(modal, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	return (
		<div>
			{props.show && <BackDrop onClick={props.hide} />}
			{props.show && <ModalOverlay {...props} />}
		</div>
	);
};

export default Modal;

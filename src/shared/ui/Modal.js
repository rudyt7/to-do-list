import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

import BackDrop from './Backdrop';

const ModalOverlay = (props) => {
	const submitForm = (event) => {
		event.preventDefault();
	};

	const addTaskHandler = () => {
		const title = document.getElementById('title').value;
		const description = document.getElementById('description').value;
		const date = document.getElementById('date').value;
		props.addTask({ title, description, date });
		props.hide();
	};

	const modal = (
		<div className="modal">
			<form onSubmit={submitForm}>
				{props.children}
				<button type="submit" onClick={addTaskHandler}>
					Add Task
				</button>
			</form>
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

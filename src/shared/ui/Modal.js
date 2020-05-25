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
		const type = document.getElementById('type').value;

		switch (type) {
			case 'personal':
				props.addTask({ title, description, date, type: 'personal' });
				break;

			case 'work':
				props.addTask({ title, description, date, type: 'work' });
				break;

			case 'shopping':
				props.addTask({ title, description, date, type: 'shopping' });
				break;

			case 'others':
				props.addTask({ title, description, date, type: 'others' });
				break;

			default:
				props.addTask({ title, description, date, type: 'others' });
				break;
		}
		props.hide();
	};

	const modal = (
		<div className="modal">
			<form onSubmit={submitForm}>
				{props.children}
				<button className="btn" type="submit" onClick={addTaskHandler}>
					Add Task
				</button>
				<button className="btn" type="reset">
					Clear
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

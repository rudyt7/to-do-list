import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
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

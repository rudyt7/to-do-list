import React, { useState, useContext } from 'react';
import './List.css';

import ListItem from './ListItem';
import Modal from '../../shared/ui/Modal';
import ToDoForm from '../../shared/form-component/ToDoForm';
import add from '../../shared/svgImg/SVG/plus.svg';
import { LabelContext } from '../../context/labelContext';

const List = () => {
	const [toDoList, setToDoList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const labelContext = useContext(LabelContext);
	let ListJsx, tasks;

	const createList = (type) => {
		if (type === '') {
			tasks = toDoList;
		} else {
			tasks = toDoList.filter((listItem) => listItem.type === type);
		}
	};

	const showModalHandler = () => {
		setShowModal(true);
	};

	const hideModalHandler = () => {
		setShowModal(false);
	};

	const AddToDoHandler = (task) => {
		setToDoList((prevState) => [...prevState, task]);
	};

	createList(labelContext.label);

	ListJsx = tasks.map((task) => {
		return (
			<ListItem
				title={task.title}
				key={Math.random().toString() + task.date}
				type={task.type}
				date={task.date}
			>
				{task.description}
			</ListItem>
		);
	});

	return (
		<div className="list">
			<Modal show={showModal} hide={hideModalHandler} addTask={AddToDoHandler}>
				<ToDoForm />
			</Modal>
			<ul>{ListJsx}</ul>
			<button className="btn-add" onClick={showModalHandler}>
				<img src={add} alt="add-icon" className="add-icon" />
			</button>
		</div>
	);
};

export default List;

import React, { useState, useContext, useEffect } from 'react';
import './List.css';

import ListItem from './ListItem';
import Modal from '../../shared/ui/Modal';
import ToDoForm from '../../shared/form-component/ToDoForm';
import CompletedTasks from './CompletedTask';
import MissedTasks from './MissedTask';
import ProgressTasks from './ProgressTask';
import Tabs from '../nav/Tabs';
import add from '../../shared/svgImg/SVG/plus.svg';

import { LabelContext } from '../../context/LabelContext';
import { ActionContext } from '../../context/ActionContext';

const DUMMY_TASK = [
	{ title: 'Shop', description: 'Get Food', type: 'shopping' },
	{ title: 'Shop', description: 'Get Food', type: 'shopping' },
	{ title: 'Shop', description: 'Get Food', type: 'shopping' },
];

const List = () => {
	let c = 0;

	const [toDoList, setToDoList] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const labelContext = useContext(LabelContext);
	const actionContext = useContext(ActionContext);

	let ListJsx, tasks;

	useEffect(() => {
		setToDoList(DUMMY_TASK);
		actionContext.setAll();
	}, []);

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
			<Tabs />
			{actionContext.action === 'all' && <ul>{ListJsx}</ul>}
			{actionContext.action === 'completed' && <CompletedTasks />}
			{actionContext.action === 'missed' && <MissedTasks />}
			{actionContext.action === 'progress' && <ProgressTasks />}
			<button className="btn-add" onClick={showModalHandler}>
				<img src={add} alt="add-icon" className="add-icon" id="add" />
			</button>
		</div>
	);
};

export default List;

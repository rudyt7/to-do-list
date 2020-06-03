import React, { useState, useContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as feather from 'feather-icons';
import './List.css';

import ListItem from './ListItem';
import Modal from '../../shared/ui/Modal';
import ToDoForm from '../../shared/form-component/ToDoForm';
import CompletedTasks from './CompletedTask';
import MissedTasks from './MissedTask';
import ProgressTasks from './ProgressTask';
import Tabs from '../nav/Tabs';

import { LabelContext } from '../../context/LabelContext';
import { ActionContext } from '../../context/ActionContext';
import { AuthContext } from '../../context/AuthContext';
import useHttpClient from '../../shared/hooks/http-hook';

const List = () => {
	const [toDoList, setToDoList] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const labelContext = useContext(LabelContext);
	const actionContext = useContext(ActionContext);
	const auth = useContext(AuthContext);

	const {
		isLoading,
		error,
		sendRequest,
		clearError,
		errorModal,
	} = useHttpClient();

	let ListJsx, tasks;

	useEffect(() => {
		feather.replace();
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

	const AddToDoHandler = async (task) => {
		if (auth.isLoggedIn) {
			const todo = { ...task, userId: auth.userId };
			const responseData = await sendRequest(
				'http://localhost:8080/api/tasks',
				'POST',
				JSON.stringify(todo),
				{ 'Content-Type': 'application/json' }
			);
			console.log(responseData);
			setToDoList((prevState) => [...prevState, task]);
		} else {
			setToDoList((prevState) => [...prevState, task]);
		}
	};

	const removeTaskHandler = (id) => {
		const newList = toDoList.filter((element) => element.id !== id);
		setToDoList(newList);
	};

	const completeTaskHandler = (id) => {
		const index = toDoList.findIndex((element) => element.id === id);
		const task = { ...toDoList[index] };
		task.completed = true;
		task.progress = false;
		const updatedTask = { ...task };
		const newList = [...toDoList];
		newList[index] = updatedTask;
		setToDoList(newList);
	};

	const unCompleteTaskHandler = (id) => {
		const index = toDoList.findIndex((element) => element.id === id);
		const task = { ...toDoList[index] };
		task.completed = false;
		task.progress = true;
		const updatedTask = { ...task };
		const newList = [...toDoList];
		newList[index] = updatedTask;
		setToDoList(newList);
	};

	createList(labelContext.label);

	ListJsx = tasks.map((task) => {
		return (
			<ListItem
				id={task.id}
				title={task.title}
				key={task.id}
				type={task.type}
				date={task.date}
				done={completeTaskHandler}
				remove={removeTaskHandler}
				undo={unCompleteTaskHandler}
				complete={task.completed}
				missed={task.missed}
				progress={task.progress}
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
			<div className="list__container">
				{actionContext.action === 'all' && (
					<ul style={{ listStyle: 'none' }}>
						<AnimatePresence initial={true}>{ListJsx}</AnimatePresence>
					</ul>
				)}
				{actionContext.action === 'completed' && (
					<CompletedTasks
						setToDoList={setToDoList}
						tasksList={toDoList}
						done={completeTaskHandler}
						undo={unCompleteTaskHandler}
						remove={removeTaskHandler}
					/>
				)}
				{actionContext.action === 'progress' && (
					<ProgressTasks
						setToDoList={setToDoList}
						tasksList={toDoList}
						done={completeTaskHandler}
						undo={unCompleteTaskHandler}
						remove={removeTaskHandler}
					/>
				)}
				{actionContext.action === 'missed' && (
					<MissedTasks
						setToDoList={setToDoList}
						tasksList={toDoList}
						remove={removeTaskHandler}
					/>
				)}
			</div>
			<button className="btn-add" onClick={showModalHandler}>
				<i data-feather="plus" className="plus-icon"></i>
			</button>
		</div>
	);
};

export default List;

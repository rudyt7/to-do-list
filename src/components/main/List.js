import React, { useState, useContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as feather from 'feather-icons';
import './List.css';

import ListItem from './ListItem';
import Modal from '../../shared/ui/Modal';
import ErrorModal from '../../shared/ui/ErrorModal';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
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
	const labelContext = useContext(LabelContext);
	const actionContext = useContext(ActionContext);
	const auth = useContext(AuthContext);

	const [toDoList, setToDoList] = useState([]);
	const [showModal, setShowModal] = useState(false);
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

	useEffect(() => {
		const tasks = [...toDoList];
		tasks.forEach((task) => {
			if (task.date < new Date().toISOString().slice(0, 10)) {
				task.missed = true;
				task.completed = false;
				task.progress = false;
			}
		});
		console.log(tasks);
	}, [toDoList]);

	useEffect(() => {
		const getTaskList = async () => {
			try {
				if (auth.isLoggedIn && auth.userId) {
					const taskObject = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/tasks/${auth.userId}`,
						'GET',
						null,
						{ Authorization: `Bearer ${auth.token}` }
					);
					const taskList = [...taskObject.tasks].map((task) => ({
						...task,
						id: task._id,
					}));
					setToDoList(taskList);
				} else {
					setToDoList([]);
				}
			} catch (error) {}
		};
		getTaskList();
	}, [sendRequest, auth.isLoggedIn, auth.userId, auth.token]);

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

	const hideErrorModal = () => {
		clearError();
	};

	const AddToDoHandler = async (task) => {
		try {
			if (auth.isLoggedIn) {
				const todo = { ...task, userId: auth.userId };
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + '/tasks',
					'POST',
					JSON.stringify(todo),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`,
					}
				);
				const newTask = { ...responseData.newTask, id: todo.id };
				setToDoList((prevState) => [...prevState, newTask]);
			} else {
				setToDoList((prevState) => [...prevState, task]);
			}
		} catch (error) {}
	};

	const removeTaskHandler = async (id) => {
		try {
			if (auth.isLoggedIn && auth.userId) {
				const task = toDoList.find((todo) => todo.id === id);
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/tasks/${task._id}`,
					'DELETE',
					null,
					{ Authorization: `Bearer ${auth.token}` }
				);
				const newList = toDoList.filter((element) => element.id !== id);
				setToDoList(newList);
			} else {
				const newList = toDoList.filter((element) => element.id !== id);
				setToDoList(newList);
			}
		} catch (error) {}
	};

	const completeTaskHandler = async (id) => {
		try {
			if (auth.isLoggedIn && auth.userId) {
				const task = toDoList.find((element) => element.id === id);
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/tasks/`,
					'PATCH',
					JSON.stringify({ taskId: task._id, status: 'completed' }),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`,
					}
				);
			}
			const index = toDoList.findIndex((element) => element.id === id);
			const task = { ...toDoList[index] };
			task.completed = true;
			task.progress = false;
			const updatedTask = { ...task };
			const newList = [...toDoList];
			newList[index] = updatedTask;
			setToDoList(newList);
		} catch (error) {}
	};

	const unCompleteTaskHandler = async (id) => {
		try {
			if (auth.isLoggedIn && auth.userId) {
				const task = toDoList.find((element) => element.id === id);
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/tasks/`,
					'PATCH',
					JSON.stringify({ taskId: task._id, status: 'progress' }),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`,
					}
				);
			}
			const index = toDoList.findIndex((element) => element.id === id);
			const task = { ...toDoList[index] };
			task.completed = false;
			task.progress = true;
			const updatedTask = { ...task };
			const newList = [...toDoList];
			newList[index] = updatedTask;
			setToDoList(newList);
		} catch (error) {}
	};

	const missedTaskHandler = async (id) => {
		try {
			if (auth.isLoggedIn && auth.userId) {
				const task = toDoList.find((element) => element.id === id);
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/tasks/`,
					'PATCH',
					JSON.stringify({ taskId: task._id, status: 'missed' }),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`,
					}
				);
			}
			const index = toDoList.findIndex((element) => element.id === id);
			const task = { ...toDoList[index] };
			task.completed = false;
			task.progress = false;
			task.missed = true;
			const updatedTask = { ...task };
			const newList = [...toDoList];
			newList[index] = updatedTask;
			setToDoList(newList);
		} catch (error) {}
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
				miss={missedTaskHandler}
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
			{<ErrorModal error={error} show={errorModal} hide={hideErrorModal} />}
			{isLoading && <LoadingSpinner asOverlay />}
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
						miss={missedTaskHandler}
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

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Task = require('../models/task');
const User = require('../models/user');
const HttpError = require('../models/httpError');

exports.createTask = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return next(new HttpError('Check Your Data', 422));
	}

	const {
		title,
		description,
		date,
		completed,
		progress,
		missed,
		type,
		userId,
	} = req.body;

	let user;
	try {
		user = await User.findById(userId);
		if (!user) {
			return next(new HttpError('Could not find User', 404));
		}
	} catch (error) {
		console.log('here');
		return next(new HttpError('Creating Task Failed', 500));
	}

	const newTask = new Task({
		title,
		description,
		date,
		completed,
		progress,
		missed,
		type,
		userId,
	});

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await newTask.save({ session: session });
		user.tasks.push(newTask);
		await user.save({ session: session });
		await session.commitTransaction();
	} catch (error) {
		console.log('here');
		return next(new HttpError('failed to create task', 500));
	}

	res.status(201).json({ newTask });
};

exports.getUserTasks = async (req, res, next) => {
	const userId = req.params.userId;
	let tasks;
	try {
		tasks = await Task.find({ userId: userId });
		if (tasks) {
			return res.status(200).json({ tasks: tasks });
		} else {
			return res.status(200).json({ message: 'No Tasks Found' });
		}
	} catch (error) {
		return next(new HttpError('Connection Error', 500));
	}
};

exports.deleteTaskById = async (req, res, next) => {
	const taskId = req.params.taskId;
	let task;
	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		task = await Task.findByIdAndDelete(taskId).populate('userId');
		console.log(task);
		task.userId.tasks.pull(task);
		await task.userId.save({ session: session });
		await session.commitTransaction();
	} catch {
		return next(new HttpError('Failed to delete task', 500));
	}

	res.status(200).json({ message: 'Successfully deleted' });
};

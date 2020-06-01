const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
	const {
		title,
		description,
		date,
		completed,
		progress,
		missed,
		type,
		// user,
	} = req.body;

	const newTask = new Task({
		title,
		description,
		date,
		completed,
		progress,
		missed,
		type,
	});

	try {
		await newTask.save();
	} catch (error) {
		console.log('could not create task');
	}

	res.status(201).json({ newTask });
}; // C

exports.getAllTasks = (req, res, next) => {}; // R

exports.deleteTaskById = async (req, res, next) => {
	const taskId = req.params.taskId;
	try {
		await Task.findByIdAndDelete(taskId);
	} catch {
		console.log('Failed to Delete Task');
	}

	res.status(200).json({ message: 'Successfully deleted' });
}; // D

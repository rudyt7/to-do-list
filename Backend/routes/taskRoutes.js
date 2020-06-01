const express = require('express');
const { check } = require('express-validator');

const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getAllTasks);

router.post(
	'/',
	[
		check('title').notEmpty(),
		check('date').notEmpty(),
		check('type').notEmpty(),
		check('completed').notEmpty().isBoolean(),
		check('progress').notEmpty().isBoolean(),
		check('missed').notEmpty().isBoolean(),
	],
	taskController.createTask
);

router.delete('/:taskId', taskController.deleteTaskById);

module.exports = router;

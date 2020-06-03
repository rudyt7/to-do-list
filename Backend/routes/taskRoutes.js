const express = require('express');
const { check } = require('express-validator');

const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/:userId', taskController.getUserTasks);

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

router.patch('/', taskController.changeTaskStatus);

router.delete('/:taskId', taskController.deleteTaskById);

module.exports = router;

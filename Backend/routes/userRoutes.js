const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();

router.post(
	'/signup',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 }),
	],
	userController.userSignup
);

router.post(
	'/login',
	[
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 }),
	],
	userController.userLogin
);

module.exports = router;

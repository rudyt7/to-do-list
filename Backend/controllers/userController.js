const User = require('../models/user');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

exports.userSignup = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return next(new HttpError('Check Your Input Data', 422));
	}

	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return next(new HttpError('Check Your Input Data', 500));
		}
	} catch (error) {
		return next(new HttpError('Connection Error', 500));
	}

	const newUser = new User({
		name,
		email,
		password,
		tasks: [],
	});

	try {
		newUser.save();
	} catch (error) {
		return next(new HttpError('Connection Error', 500));
	}

	res.status(201).json({ message: 'User Created Successfully' });
};

exports.userLogin = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return next(new HttpError('Check Your Input Data', 422));
	}

	const { email, password } = req.body;
	let user;
	try {
		user = await User.findOne({ email: email });
	} catch (error) {
		return next(new HttpError('Enter Valid Credentials', 422));
	}

	if (user.password === password) {
		res.status(200).json({ message: 'successfully logged In' });
	}
};

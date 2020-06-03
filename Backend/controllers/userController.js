const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const HttpError = require('../models/httpError');

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
			return next(new HttpError('User Already Exists', 422));
		}
	} catch (error) {
		return next(new HttpError('Connection Error', 500));
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(
			new HttpError('Could not create user please try again ! ', 500)
		);
	}

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
		tasks: [],
	});

	try {
		newUser.save();
	} catch (error) {
		return next(new HttpError('Connection Error', 500));
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: newUser.id, email: newUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '1h' }
		);
	} catch (error) {
		return next(
			new HttpError('Could not create user please try again ! ', 500)
		);
	}

	res
		.status(201)
		.json({ user: newUser.toObject({ getters: true }), token: token });
};

exports.userLogin = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return next(new HttpError('Check Your Input Data', 422));
	}

	const { email, password } = req.body;
	let user,
		isValidPassword = false;
	try {
		user = await User.findOne({ email: email });
		if (!user) {
			return next(new HttpError('Enter Valid Credentials', 422));
		}
		isValidPassword = await bcrypt.compare(password, user.password);
		if (isValidPassword) {
			let token;
			try {
				token = jwt.sign(
					{ userId: user.id, email: user.email },
					process.env.JWT_KEY,
					{ expiresIn: '1h' }
				);
			} catch (error) {
				return next(new HttpError('Could not Log In please try again ! ', 500));
			}
			res
				.status(200)
				.json({ user: user.toObject({ getters: true }), token: token });
		} else {
			return next(new HttpError('Enter Valid Credentials', 422));
		}
	} catch (error) {
		return next(new HttpError('Could not log you in', 500));
	}
};

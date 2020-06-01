const User = require('../models/user');

exports.userSignup = async (req, res, next) => {
	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (error) {
		console.log('Could Not Connect');
	}

	if (existingUser) {
		res.status(500).json({ message: 'User already exists' });
		return;
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
		return console.log('Could not create a new user');
	}

	res.status(201).json({ message: 'User Created Successfully' });
};

exports.userLogin = async (req, res, next) => {
	const { email, password } = req.body;

	let user;

	try {
		user = await User.findOne({ email: email });
	} catch (error) {
		return console.log('Please enter valid Credentials');
	}

	if (user.password === password) {
		res.status(200).json({ message: 'successfully logged In' });
	}
};

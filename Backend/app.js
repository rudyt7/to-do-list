const express = require('express');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const HttpError = require('./models/httpError');

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Not Found', 404);
	next(error);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res
		.status(error.code || 500)
		.json({ message: error.message || 'An unknown error Occurred' });
});

mongoose
	.connect('mongodb+srv://rudy7:qwerty123@cluster0-nxj3i.mongodb.net/todo', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected');
		app.listen(8080);
	})
	.catch((err) => {
		console.log(err);
	});

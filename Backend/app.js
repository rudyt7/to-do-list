const express = require('express');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

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

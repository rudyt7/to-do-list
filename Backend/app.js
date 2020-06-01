const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

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

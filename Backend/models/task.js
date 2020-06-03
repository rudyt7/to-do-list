const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: false },
	date: { type: String, required: true },
	completed: { type: Boolean, required: true },
	progress: { type: Boolean, required: true },
	missed: { type: Boolean, required: true },
	type: { type: String, required: true },
	userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);

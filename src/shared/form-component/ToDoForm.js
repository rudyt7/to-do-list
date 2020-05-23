import React from 'react';

const ToDoForm = () => {
	return (
		<div>
			<label htmlFor="title">Title</label>
			<input name="title" id="title" type="text" />
			<label htmlFor="description">Description</label>
			<textarea name="description" id="description"></textarea>
			<label htmlFor="date">Date</label>
			<input
				type="date"
				id="date"
				min={new Date().toISOString().slice(0, 10)}
			/>
		</div>
	);
};

export default ToDoForm;

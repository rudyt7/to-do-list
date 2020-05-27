import React, { useContext } from 'react';
import ListItem from './ListItem';

import { LabelContext } from '../../context/LabelContext';

const ProgressTask = (props) => {
	const tasks = props.tasksList.filter((task) => task.progress);
	const labelContext = useContext(LabelContext);

	let task;
	const createList = (type) => {
		if (type === '') {
			task = tasks;
		} else {
			task = tasks.filter((listItem) => listItem.type === type);
		}
	};

	createList(labelContext.label);

	const ListJsx = task.map((t) => {
		return (
			<ListItem
				id={t.id}
				title={t.title}
				key={Math.random().toString() + t.date}
				type={t.type}
				date={t.date}
			>
				{t.description}
			</ListItem>
		);
	});

	return (
		<div>
			<ul>{ListJsx}</ul>
		</div>
	);
};

export default ProgressTask;

import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
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
				type={t.type}
				key={t.id}
				date={t.date}
				done={props.done}
				remove={props.remove}
			>
				{t.description}
			</ListItem>
		);
	});

	console.log(task.id);

	return (
		<div>
			<ul>
				<AnimatePresence initial={true}>{ListJsx}</AnimatePresence>
			</ul>
		</div>
	);
};

export default ProgressTask;

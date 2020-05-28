import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import ListItem from './ListItem';

import { LabelContext } from '../../context/LabelContext';

const MissedTask = (props) => {
	const tasks = props.tasksList.filter((task) => task.missed);
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
				done={props.done}
				remove={props.remove}
			>
				{t.description}
			</ListItem>
		);
	});

	return (
		<div>
			<ul>
				{' '}
				<AnimatePresence initial={false}>{ListJsx}</AnimatePresence>
			</ul>
		</div>
	);
};
export default MissedTask;

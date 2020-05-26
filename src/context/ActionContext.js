import React, { useState } from 'react';

export const ActionContext = React.createContext({
	action: '',
	setAll: () => {},
	setNew: () => {},
	setCompleted: () => {},
	setInProgress: () => {},
	setMissed: () => {},
});

const ActionContextProvider = (props) => {
	const [action, setAction] = useState('');

	const allTaskHandler = () => {
		setAction('all');
	};

	const newTaskHandler = () => {
		setAction('new');
	};

	const completedTaskHandler = () => {
		setAction('completed');
	};

	const inProgressTaskHandler = () => {
		setAction('progress');
	};

	const missedTaskHandler = () => {
		setAction('missed');
	};

	return (
		<ActionContext.Provider
			value={{
				action: action,
				setAll: allTaskHandler,
				setNew: newTaskHandler,
				setCompleted: completedTaskHandler,
				setInProgress: inProgressTaskHandler,
				setMissed: missedTaskHandler,
			}}
		>
			{props.children}
		</ActionContext.Provider>
	);
};

export default ActionContextProvider;

// newCount: 0,
//   inProgressCount: 0,
//   completedCount: 0,
//   missedCount: 0,

import React, { useState } from 'react';

export const LabelContext = React.createContext({
	label: '',
	clearLabel: () => {},
	setPersonalLabel: () => {},
	setWorkLabel: () => {},
	setShoppingLabel: () => {},
	setOthersLabel: () => {},
});

const LabelContextProvider = (props) => {
	const [label, setLabel] = useState('');

	const personalLabelHandler = () => {
		setLabel('personal');
	};

	const workLabelHandler = () => {
		setLabel('work');
	};

	const shoppingLabelHandler = () => {
		setLabel('shopping');
	};

	const othersLabelHandler = () => {
		setLabel('others');
	};

	const removeLabelHandler = () => {
		setLabel('');
	};

	return (
		<LabelContext.Provider
			value={{
				label: label,
				clearLabel: removeLabelHandler,
				setPersonalLabel: personalLabelHandler,
				setWorkLabel: workLabelHandler,
				setShoppingLabel: shoppingLabelHandler,
				setOthersLabel: othersLabelHandler,
			}}
		>
			{props.children}
		</LabelContext.Provider>
	);
};

export default LabelContextProvider;

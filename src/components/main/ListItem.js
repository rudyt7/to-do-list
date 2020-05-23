import React from 'react';

const ListItem = (props) => {
	return (
		<div className="list-item">
			<li>
				<div>
					{props.title}
					{props.children}
				</div>
			</li>
		</div>
	);
};

export default ListItem;

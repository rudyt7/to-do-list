import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Backdrop.css';

const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<AnimatePresence>
			<motion.div
				className="backdrop"
				onClick={props.onClick}
				variants={props.variants}
				initial="hidden"
				animate="visible"
			></motion.div>
		</AnimatePresence>,
		document.getElementById('backdrop-hook')
	);
};

export default Backdrop;

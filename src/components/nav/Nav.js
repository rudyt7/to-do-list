import React from 'react';
import './Nav.css';

const Nav = (props) => {
	return (
		<nav className="nav">
			<div>
				<p>New</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>
			<br />

			<div>
				<p>In Progress</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>
			<br />
			<div>
				<p>Completed</p>
				<ul>
					<li>
						<a href="#pablo">Number of to do's</a>
					</li>
				</ul>
			</div>
			<br />
			<div>
				<p>Labels</p>
				<ul>
					<li>
						<a href="#pablo">Personal</a>
					</li>
					<li>
						<a href="#pablo">Work</a>
					</li>

					<li>
						<a href="#pablo">Shopping</a>
					</li>
					<li>
						<a href="#pablo">Others</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;

import React, { useState, useContext } from 'react';
import './Auth.css';

import { AuthContext } from '../../context/AuthContext.js';

const validate = (value, type) => {
	if (type === 'text') {
		if (value.length > 4) {
			return true;
		} else {
			return false;
		}
	} else if (type === 'password') {
		if (value.length >= 7) {
			console.log(value.length);
			return true;
		} else {
			return false;
		}
	} else if (type === 'email') {
		if (/^\S+@\S+\.\S+$/.test(value)) {
			return true;
		} else {
			return false;
		}
	}
};

const Auth = () => {
	const auth = useContext(AuthContext);
	const [flip, setFlip] = useState(false);
	const [name, setName] = useState(false);
	const [email, setEmail] = useState(false);
	const [password, setPassword] = useState(false);
	const [loginValid, setLoginValid] = useState(false);
	const [signUpValid, setSignUpValid] = useState(false);

	const checkFormValid = () => {
		if (!flip) {
			if (name && email && password) {
				setSignUpValid(true);
				console.log(loginValid);
			} else {
				setSignUpValid(false);
			}
		}
		if (flip) {
			if (email && password) {
				setLoginValid(true);
			} else {
				setLoginValid(false);
			}
		}
	};

	const changeHandler = (event) => {
		if (event.target.type === 'text') {
			if (validate(event.target.value, event.target.type)) {
				setName(true);
			} else {
				setName(false);
			}
		}
		if (event.target.type === 'email') {
			if (validate(event.target.value, event.target.type)) {
				setEmail(true);
			} else {
				setEmail(false);
			}
		}
		if (event.target.type === 'password') {
			if (validate(event.target.value, event.target.type)) {
				setPassword(true);
			} else {
				setPassword(false);
			}
		}
		checkFormValid();
	};

	const flipHandler = () => {
		setFlip(!flip);
		setEmail(false);
		setPassword(false);
		const signUp = [
			...document.getElementsByClassName('auth__container--signup'),
		];
		const signIn = [
			...document.getElementsByClassName('auth__container--login'),
		];
		if (flip) {
			signUp[0].classList.remove('flip');
			signIn[0].classList.remove('flip');
		} else {
			signUp[0].classList.add('flip');
			signIn[0].classList.add('flip');
		}
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		if (!flip) {
			try {
				const response = await fetch('http://localhost:8080/api/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				});
				const responseData = await response.json();
				console.log(responseData);
			} catch (error) {
				console.log(error);
			}
		} else {
			fetch('http://localhost:8080/api/users/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
		}
	};

	return (
		<main>
			<article className="auth">
				<div className="auth__container">
					<div className="auth__container--signup">
						<h1>Signup</h1>
						<form onSubmit={authSubmitHandler}>
							<input onChange={changeHandler} type="text" placeholder="name" />
							<input
								onChange={changeHandler}
								type="email"
								placeholder="email"
							/>
							<input
								onChange={changeHandler}
								type="password"
								placeholder="password"
							/>
							<button type="submit" disabled={!signUpValid}>
								Sign Up
							</button>
						</form>
					</div>
					<div className="auth__container--login">
						<h1>Login</h1>
						<form onSubmit={authSubmitHandler}>
							<input
								onChange={changeHandler}
								type="email"
								placeholder="email"
							/>
							<input
								onChange={changeHandler}
								type="password"
								placeholder="password"
							/>
							<button type="submit" disabled={!loginValid}>
								Sign In
							</button>
						</form>
					</div>
				</div>
				<div className="auth__btn" onClick={flipHandler}>
					Switch to {flip ? 'Sign Up' : 'Sign In'}
				</div>
			</article>
		</main>
	);
};

export default Auth;

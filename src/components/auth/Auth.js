import React, { useState, useContext, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Auth.css';

import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
import ErrorModal from '../../shared/ui/ErrorModal';
import useHttpClient from '../../shared/hooks/http-hook';

const validate = (value, type) => {
	if (type === 'text') {
		if (value.length > 4) {
			return true;
		} else {
			return false;
		}
	} else if (type === 'password') {
		if (value.length >= 7) {
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

	const history = useHistory();

	const {
		isLoading,
		error,
		sendRequest,
		clearError,
		errorModal,
	} = useHttpClient();

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

	const hideModalHandler = () => {
		clearError();
	};

	const authSubmitHandler = async (event) => {
		let responseData;
		event.preventDefault();
		if (!flip) {
			try {
				responseData = await sendRequest(
					'http://localhost:8080/api/users/signup',
					'POST',
					JSON.stringify({
						name: document.getElementById('signupName').value,
						email: document.getElementById('signupEmail').value,
						password: document.getElementById('signupPassword').value,
					}),
					{ 'Content-Type': 'application/json' }
				);
			} catch (error) {}
			auth.login(responseData.user.id);
			history.replace('/to-do-list');
		} else {
			let responseData;
			try {
				responseData = await sendRequest(
					'http://localhost:8080/api/users/login',
					'POST',
					JSON.stringify({
						email: document.getElementById('loginEmail').value,
						password: document.getElementById('loginPassword').value,
					}),
					{ 'Content-Type': 'application/json' }
				);
			} catch (error) {}
			auth.login(responseData.user.id);
			history.replace('/to-do-list');
		}
	};

	return (
		<Fragment>
			{error && (
				<ErrorModal error={error} show={errorModal} hide={hideModalHandler} />
			)}
			{isLoading && <LoadingSpinner asOverlay />}
			<main>
				<Link to="/to-do-list/">
					<div>Back</div>
				</Link>
				<article className="auth">
					<div className="auth__container">
						<div className="auth__container--signup">
							<h1>Signup</h1>
							<form onSubmit={authSubmitHandler}>
								<input
									id="signupName"
									onChange={changeHandler}
									type="text"
									placeholder="name"
								/>
								<input
									id="signupEmail"
									onChange={changeHandler}
									type="email"
									placeholder="email"
								/>
								<input
									id="signupPassword"
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
									id="loginEmail"
									type="email"
									placeholder="email"
								/>
								<input
									id="loginPassword"
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
		</Fragment>
	);
};

export default Auth;

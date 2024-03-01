import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from '../Redux/Action/loginAction';


function Login(props) {

	const basePathUrl = process.env.REACT_APP_BASE_PATH;

	let navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [isError, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const dispatch = useDispatch();

	const isAuthenticated = sessionStorage.getItem("token");

	const loginHandler = () => {
		let data = { username: userName, password: password };
		setLoader(true);
		const config = { 'content-type': 'application/json' };
		axios.post(`${basePathUrl}/login`, data, config).then(response => {
			console.log({ response });
			let { message, responseObject, status } = response.data;
			if (status === 200) {
				sessionStorage.setItem("role", responseObject.userType)
				sessionStorage.setItem("token", responseObject.token)
				sessionStorage.setItem("userName", responseObject.userName)
				setLoader(false);
				setError(false)
				navigate('/ManageClasses');
				dispatch(loginAction(message));
			}
			else {
				console.log({ status })
				setLoader(false);
			}
		})
			.catch(error => {
				console.log(error);
				setError(true)
				setErrorMessage(error?.response?.data?.responseObject?.message)
				setLoader(false);
			});
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/ManageClasses');
		}
		else {
			navigate('/');
		}
	}, [navigate, isAuthenticated]);

	return (
		<>
			<div className="login-wrapper">
				<div className="login-icon">
					<img alt='logo' src={require('../assets/images/logo.jpg')} />
				</div>
				<div className="login-content">
					<h1>Welcome Back !</h1>
					<h5>Login to Continue</h5>
					<div className="login-form">
						{isError &&
							<div className='form-group'>
								<div className="alert alert-danger" role="alert">
									{errorMessage}
								</div>
							</div>
						}
						<div className="form-group">
							<label className="form-icon"><i className="fa fa-user"></i></label>
							<input type="text" className="form-control" value={userName || ""} placeholder="User name" onChange={(e) => setUserName(e.target.value)} />
						</div>
						<div className="form-group">
							<label className="form-icon"><i className="fa fa-lock"></i></label>
							<input type="password" className="form-control" value={password || ""} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
						</div>
						<a onClick={() => navigate('/ForgetPassword')}>Forget Password ?</a>
						{loader ? <button className="btn btn-primary" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							<span className="sr-only">Loading...</span>
						</button> : <button className="btn btn-block btn-primary" onClick={loginHandler}>Login</button>}
					</div>
				</div>
				<div className="stripe top-right"></div>
				<div className="stripe bottom-left"></div>
				<div className="stripe bottom-right"></div>
			</div>
		</>
	);
}

export default Login;


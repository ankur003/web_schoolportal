import React from 'react';
import { useState ,useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginAction} from '../Redux/Action/loginAction';


function Login(props) {
	let navigate = useNavigate();
	const [userName,setUserName] = useState("shakher");
	const [password,setPassword] = useState("Hello@1234");

	const dispatch = useDispatch();

	const isAuthenticated = sessionStorage.getItem("token");
	console.log({isAuthenticated});

	const loginHandler = () => {
		if(userName === "shakher" && password === "Hello@1234") {
				dispatch(loginAction(true))
				navigate('/CreateClass')
		}
		else{
			window.alert("wrong credential");
		}
	};

	useEffect(()=> {
		if(isAuthenticated === "true") {
			navigate('/CreateClass');
		}
	},[isAuthenticated]);

	return (
		<>
			<div className="login-wrapper">
				<div className="login-icon">
					<img src={require('../assets/images/logo.jpg')} />
				</div>
				<div className="login-content">
					<h1>Welcome Back !</h1>
					<h5>Login to Continue</h5>
					<div className="login-form">
						<div className="form-group">
							<label className="form-icon"><i className="fa fa-user"></i></label>
							<input type="text" className="form-control" value={userName || ""} placeholder="User name" onChange={(e)=>setUserName(e.target.value)}/>
						</div>
						<div className="form-group">
							<label className="form-icon"><i className="fa fa-lock"></i></label>
							<input type="password" className="form-control" value={password || ""} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
						</div>
						<a>Forget Password ?</a>
						<button className="btn btn-block btn-primary" onClick={loginHandler}>Login</button>
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
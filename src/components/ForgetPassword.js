import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    let navigate = useNavigate();
    const basePathUrl = process.env.REACT_APP_BASE_PATH;

    const [userName, setUserName] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShow, setIsShow] = useState(false);
    console.log(isShow);

    const loginHandler = () => {
        const config = { 'content-type': 'application/json' };
        let data = { username: userName };
        axios.post(`${basePathUrl}/password/forgot`, data, config).then(response => {
            console.log({ response });
            if (response.status === 200) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        })
            .catch(error => {
                console.log(error);
            });
    };

    const forgetPasswordHandler = () => {
        const config = { 'content-type': 'application/json' };
        let data = { username: userName, otp, newPassword, confirmPassword };
        console.log({data})
        axios.post(`${basePathUrl}/password/reset`, data, config).then(response => {
            console.log({ response });
            if (response.status === 201) {
                navigate('/');
            } else {
                setIsShow(false);
            }
        })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="login-wrapper">
                <div className="login-icon">
                    <img alt='logo' src={require('../assets/images/logo.jpg')} />
                </div>
                {!isShow ?
                    <div className="login-content">
                        <h1>FORGET PASSWORD !</h1>
                        <h5>Sent OTP to Continue</h5>
                        <div className="login-form">
                            <div className="form-group">
                                <label className="form-icon"><i className="fa-solid fa-envelope"></i></label>
                                <input type="text" className="form-control" value={userName || ""} placeholder="User name" onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <a onClick={() => navigate('/')}>Back To Login</a>
                            <button className="btn btn-block btn-primary" onClick={loginHandler}>Send OTP</button>
                        </div>
                    </div>
                    :
                    <div className="login-content">
                        <h1>RESET PASSWORD !</h1>
                        <h5>Please Reset the Password To Continue</h5>
                        <div className="login-form">
                            <div className="form-group">
                                <label className="form-icon"><i className="fa fa-lock"></i></label>
                                <input type="text" className="form-control" value={otp || ""} placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-icon"><i className="fa fa-lock"></i></label>
                                <input type="text" className="form-control" value={newPassword || ""} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-icon"><i className="fa fa-lock"></i></label>
                                <input type="password" className="form-control" value={confirmPassword || ""} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <a onClick={() => navigate('/')}>Back To Login</a>
                            <button className="btn btn-block btn-primary" onClick={forgetPasswordHandler}>Confirm Password</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

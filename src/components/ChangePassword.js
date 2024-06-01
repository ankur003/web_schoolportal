import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from "react-router-dom";

let inlineStyle = {
    width: "50%",
    margin: "0 auto"
}
export default function ChangePassword() {
    const basePathUrl = process.env.REACT_APP_BASE_PATH;
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);


    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submit = (e) => {
        setLoader(true);
        axios.put(`${basePathUrl}/password/change`, formData).then(response => {
            console.log({ response });
            if (response.status === 200) {
                setLoader(false);
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("role");
                navigate('/');
            } else {
                setLoader(false);
            }
        })
            .catch(error => {
                console.log(error);
                setLoader(false);
            });
    }

    return (
        <>
            <div className="header">
                <h1>Change Password</h1>
            </div>
            <div className="content-body">
                <div className="form-body-content" style={inlineStyle}>
                    <div className="form-group">
                        <label className="form-group-label">Old Password</label>
                        <div className="password-form">
                            <input type={!isShowPassword ? "password" : "text"} className="form-control" name="oldPassword" placeholder="Enter Old Password" onChange={(e) => handlerChange(e)} />
                            <span className="show-password-icon" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <i class="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-group-label">New Password</label>
                        <div className="password-form">
                            <input type={!isShowPassword ? "password" : "text"} className="form-control" name="newPassword" placeholder="Enter New Password" onChange={(e) => handlerChange(e)} />
                            <span className="show-password-icon" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <i class="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-group-label">Confirm New Password</label>
                        <div className="password-form">
                            <input type={!isShowPassword ? "password" : "text"} className="form-control" name="confirmNewPassword" placeholder="Enter Confirm New Password" onChange={(e) => handlerChange(e)} />
                            <span className="show-password-icon" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <i class="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}</span>
                        </div>
                    </div>
                    <div className="form-content-footer">
                        <button type="submit" className="btn btn-success" disabled={loader} onClick={submit}>
                            {loader ? <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Loading...</span>
                            </> :
                                "Save"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

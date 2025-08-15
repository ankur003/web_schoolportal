import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Constants from '../Redux/Constants';
// import { routesList } from '../../src/routes.js';

const Header = styled.header`
  display: flex;
  justify-content:space-between;
  padding: 12px;
  background: transparent;
  color: white;
  z-index: 999;
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const H1 = styled.h1`
    color:white;
    font-size: 24px;
    margin: 0;
    font-weight: 700;
    position:relative;
    padding-left:50px;
    img {
        height: 40px;
        width: 40px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
        border-radius:50%;
    }
`;

const ProtectedRoute = (props) => {
    let navigate = useNavigate();
   
    const [isActive, setIsActive] = useState(true)
    const isAuthenticated = sessionStorage.getItem("token");
    const { role } = useSelector((state) => state.loginReducer);
    const user = sessionStorage.getItem("userName");
    const logoutHandler = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate('/');
        toast.success("Logout successful");
    };

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === "en") {
            setIsActive(true)
        }
        else {
            setIsActive(false)
        }

    };

    return (
        isAuthenticated ?
            <div className="main-wrapper">
                <Header className="main-header">
                    <H1><img alt="logo" src={require('../../src/assets/images/logo.jpg')} />The School Portal</H1>
                    {/* <ul className="language-button">
                        <li className={isActive ? "active" : ""} onClick={() => changeLanguage('en')}>En</li>
                        <li className={!isActive ? "active" : ""} onClick={() => changeLanguage('hi')}>Hi</li>
                    </ul> */}
                    <div className="demo-section">
                        <div className="select-wrapper-neon">
                            <select className="select-neon"
                                value={props?.academicYearProps}
                                onChange={e => props?.setAcademicYearProps(e.target.value)}
                                style={{ padding: 4, textAlign: 'center' }}
                            >
                                {props?.academicYearList.map(year => (
                                    <option key={year.key} value={year.key}>Academic {year.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='badge bg-custom'>{role}</span> {user} <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" onClick={logoutHandler}>Logout</a></li>
                            <li><a className="dropdown-item" onClick={() => navigate('/ChangePassword')}>Change Password</a></li>
                        </ul>
                    </div>
                </Header>
                <SideBar />
                <div className="main-body">
                    <Outlet />
                </div>
            </div>
            :
            <Navigate to="/" />
    )
}

export default ProtectedRoute;





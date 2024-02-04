import React from 'react';
import styled from 'styled-components';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { routesList } from '../../src/routes.js';

const Header = styled.header`
  display: flex;
  justify-content:space-between;
  padding: 12px;
  background-color: #356ec5;
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

const BUTTON = styled.button`
    color:white;
    border:1px solid white;
    background-color: transparent;
    border-radius: 5px;
    &:focus {
     background-color: white;
     color:black;
    }
`;

const ProtectedRoute = () => {
    let navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem("token");

    const logoutHandler = () => {
        sessionStorage.removeItem("token");
        navigate('/');
    };

    return (
        isAuthenticated ?
                <div className="main-wrapper">
                    <Header>
                        <H1><img src={require('../../src/assets/images/logo.jpg')} />The School Portal</H1>
                        <BUTTON onClick={logoutHandler}>LOGOUT</BUTTON>
                    </Header>
                    <SideBar routes={routesList} />
                    <div className="main-body">
                        <Outlet />
                    </div>
                </div>
                : 
                <Navigate to="/"/>
    )
}

export default ProtectedRoute; 
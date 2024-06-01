import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SideBar(props) {
    let role = sessionStorage.getItem("role");
    console.log(role);
    let superAdmin = [
        {
            name: "Manage classroom",
            component: "ManageClasses",
            to: "/ManageClasses",
            icon: "fa-solid fa-school"
        },
        {
            name: "Manage Entity",
            component: "EntityPage",
            icon: "fa-solid fa-user",
            subNav: [
                {
                    name: "All Entity",
                    component: "EntityPage",
                    to: "/EntityPage",
                    // icon: "fa-solid fa-user",
                },
                {
                    name: "Teachers",
                    component: "TeacherPage",
                    to: "/TeacherPage",
                    // icon: "fa-solid fa-user",
                },
                {
                    name: "Student",
                    component: "StudentPage",
                    to: "/StudentPage",
                    // icon: "fa-solid fa-user",
                },
            ]
        }

    ]

    let routes = role === "SUPER_ADMIN" ? [...superAdmin] : "";

    useEffect(() => {

    });

    const [isActive, setIsActive] = useState("Manage classroom");
    const [isSubActive, setSubIsActive] = useState(0);
    const navigate = useNavigate();

    const sideBarHandler = (value) => {
        setIsActive(value.name);
        if (value.subNav) {
            if (isSubActive === 0) {
                navigate(`${value?.subNav[0]?.to}`)
            }
        }
        else {
            navigate(`${value.to}`);
        }
    }
    const sideSubBarHandler = (value, index) => {
        setSubIsActive(index);
        navigate(`${value.to}`);
    }
    return (
        <div className="side-bar">
            <ul>
                {routes.map((data, index) =>
                    <li key={index} className={isActive === data?.name ? "active" : " "}>
                        <a className={data?.subNav ? "collapsed" : ""} data-bs-toggle="collapse" data-bs-target={data?.subNav?.length > 0 ? "#collapseWidthExample" : ""} onClick={() => sideBarHandler(data)}><span className='icon'><i className={data?.icon}></i></span>{data?.name}
                            {data?.subNav && <i className="fas fa-chevron-up"></i>}
                        </a>
                        {data?.subNav?.length > 0 ?
                            <ul className="subList collapse" id="collapseWidthExample">
                                {data?.subNav?.map((subData, index) =>
                                    <li key={index} className={isSubActive === index ? "active" : " "}>
                                        <a onClick={() => sideSubBarHandler(subData, index)}><span className='icon'><i className="fas fa-circle"></i></span>{subData?.name}</a>
                                    </li>
                                )}
                            </ul>
                            :
                            ""
                        }
                    </li>
                )}
            </ul>
        </div>
    );
}

export default SideBar;
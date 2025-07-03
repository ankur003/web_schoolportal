import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
function SideBar(props) {
    const [isActive, setIsActive] = useState("Manage classroom");
    const [isSubActive, setSubIsActive] = useState(0);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    let role = sessionStorage.getItem("role");
    let userId = sessionStorage.getItem("userId");
    let superAdmin = [
        {
            name: "Manage classroom",
            component: "ManageClasses",
            transform: "manageClassroom",
            to: "/ManageClasses",
            icon: "fa-solid fa-school"
        },
        {
            name: "Attendance",
            component: "AttendancePage",
            transform: "Attendance",
            to: "/AttendanceCalendarPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Manage Entity",
            component: "EntityPage",
            transform: "manageEntity",
            icon: "fa-solid fa-user",
            subNav: [
                {
                    name: "All Entity",
                    component: "EntityPage",
                    transform: "allEntity",
                    to: "/EntityPage",
                    // icon: "fa-solid fa-user",
                },
                {
                    name: "Teachers",
                    component: "TeacherPage",
                    transform: "teachers",
                    to: "/TeacherPage",
                    // icon: "fa-solid fa-user",
                },
                {
                    name: "Student",
                    component: "StudentPage",
                    transform: "student",
                    to: "/StudentPage",
                    // icon: "fa-solid fa-user",
                },
            ]
        }

    ];

    let TeackerRoutes = [
        {
            name: "Profile Details",
            component: "ProfileDetailsPage",
            transform: "Teacher Profile",
            to: "/ProfileDetailsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Student",
            component: "StudentPage",
            transform: "student",
            to: "/StudentPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Attendance",
            component: "AttendancePage",
            transform: "Attendance",
            to: "/AttendanceCalendarPage",
            icon: "fa-solid fa-user",
        },
    ];

    let StudentRoutes = [
        {
            name: "Profile Details",
            component: "ProfileDetailsPage",
            transform: "Student Profile",
            to: "/ProfileDetailsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Attendance",
            component: "AttendancePage",
            transform: "Attendance",
            to: "/AttendanceCalendarPage",
            icon: "fa-solid fa-user",
        },
    ];

    let routes = role === "SUPER_ADMIN" ? [...superAdmin] : role === "TEACHER" ? [...TeackerRoutes] : [...StudentRoutes];

    const findSubNavIndex = (superAdminArray, route) => {
        for (const [mainIndex, item] of superAdminArray.entries()) {
            if (item.subNav) {
                const subNavIndex = item.subNav.findIndex(subNavItem => subNavItem.to === route);
                if (subNavIndex !== -1) {
                    return { mainIndex, subNavIndex };
                }
            }
        }
        return null; // Return null if not found
    };

    const result = findSubNavIndex(routes, pathname);
    useEffect(() => {
        let activeRoute = routes.find(r => r.to === pathname);
        if (activeRoute === undefined) {
            setIsActive(routes?.[result?.mainIndex]?.name);
            setSubIsActive(result?.subNavIndex)
        }
        else if (result === null) {
            setIsActive(activeRoute?.name);
            setSubIsActive(0);
        }
    }, []);



    const sideBarHandler = (value) => {
        console.log("value", value);
        setIsActive(value?.name);
        if (value?.subNav) {
            if (isSubActive === 0) {
                navigate(`${value?.subNav[0]?.to}`)
            }
        }
        else {
            navigate(`${value.to}`);
        }
        if (value.component === "ProfileDetailsPage") {
            dispatch({ type: "GET_USER_ID", payload: userId });
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
                        <a className={data?.subNav ? "collapsed" : ""} data-bs-toggle="collapse" data-bs-target={data?.subNav?.length > 0 ? "#collapseWidthExample" + index : "#collapseWidthExample" + index} onClick={() => sideBarHandler(data)}><span className='icon'><i className={data?.icon}></i></span>{t(data?.transform)}
                            {data?.subNav && <i className="fas fa-chevron-up"></i>}
                        </a>
                        {data?.subNav?.length > 0 ?
                            <ul className="subList collapse" id={"collapseWidthExample" + index}>
                                {data?.subNav?.map((subData, index) =>
                                    <li key={index} className={Number(isSubActive) === index ? "active" : " "}>
                                        <a onClick={() => sideSubBarHandler(subData, index)}><span className='icon'><i className="fas fa-circle"></i></span>{t(subData?.transform)}</a>
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
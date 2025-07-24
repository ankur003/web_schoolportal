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
            name: "Dashboard",
            component: "Dashboard",
            transform: "Dashboard",
            to: "/Dashboard",
            icon: "fa-solid fa-gauge"
        },
        {
            name: "Manage classroom",
            component: "ManageClasses",
            transform: "manageClassroom",
            to: "/ManageClasses",
            icon: "fa-solid fa-school"
        },
        {
            name: "Manage Time Table",
            component: "TimetableSystem",
            transform: "TimeTable",
            to: "/TimeTable",
            icon: "fa-solid fa-table"
        },
        {
            name: "Manage Fees",
            component: "FeeModule",
            transform: "Fee Management",
            to: "/FeeSetUpModule",
            icon: "fa-solid fa-money-bill"
        },
        {
            name: "Manage Student Fee's",
            component: "FeePaymentModule",
            transform: "Manage Student Fee's",
            to: "/FeePaymentModule",
            icon: "fa-solid fa-money-bill-wave",
        },
        {
            name: "All Entity",
            component: "EntityPage",
            transform: "allEntity",
            to: "/EntityPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Teachers",
            component: "TeacherPage",
            transform: "teachers",
            to: "/TeacherPage",
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
            name: "Parents",
            component: "ParentsPage",
            transform: "Parents",
            to: "/ParentsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Leave Requests",
            component: "LeaveRequest",
            transform: "Leave Requests",
            to: "/LeaveRequest",
            icon: "fa-solid fa-calendar-check",
        }
    ];

    let TeacherRoutes = [
        {
            name: "Dashboard",
            component: "Dashboard",
            transform: "Dashboard",
            to: "/Dashboard",
            icon: "fa-solid fa-gauge"
        },
        {
            name: "Profile Details",
            component: "ProfileDetailsPage",
            transform: "Teacher Profile",
            to: "/ProfileDetailsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Manage Time Table",
            component: "TimetableSystem",
            transform: "TimeTable",
            to: "/TimeTable",
            icon: "fa-solid fa-table"
        },
        {
            name: "Student",
            component: "StudentPage",
            transform: "student",
            to: "/StudentPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Leave Requests",
            component: "LeaveRequest",
            transform: "Leave Requests",
            to: "/LeaveRequest",
            icon: "fa-solid fa-calendar-check",
        }
    ];

    let StudentRoutes = [
        {
            name: "Dashboard",
            component: "Dashboard",
            transform: "Dashboard",
            to: "/Dashboard",
            icon: "fa-solid fa-gauge"
        },
        {
            name: "Profile Details",
            component: "ProfileDetailsPage",
            transform: "Student Profile",
            to: "/ProfileDetailsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Manage Time Table",
            component: "TimetableSystem",
            transform: "TimeTable",
            to: "/TimeTable",
            icon: "fa-solid fa-table"
        },
    ];

    let parentRoute = [
        {
            name: "Dashboard",
            component: "Dashboard",
            transform: "Dashboard",
            to: "/Dashboard",
            icon: "fa-solid fa-gauge"
        },
        {
            name: "Profile Details",
            component: "ProfileDetailsPage",
            transform: "Profile",
            to: "/ProfileDetailsPage",
            icon: "fa-solid fa-user",
        },
        {
            name: "Student",
            component: "StudentPage",
            transform: "Childrens",
            to: "/StudentPage",
            icon: "fa-solid fa-user",
        },
    ];

    let routes = role === "SUPER_ADMIN" ? [...superAdmin] : role === "TEACHER" ? [...TeacherRoutes] : role === "PARENT" ? [...parentRoute] : [...StudentRoutes];

    const findSubNavIndex = (superAdminArray, route) => {
        for (const [mainIndex, item] of superAdminArray.entries()) {
            if (item.subNav) {
                const subNavIndex = item.subNav.findIndex(subNavItem => subNavItem.to === route);
                if (subNavIndex !== -1) {
                    return { mainIndex, subNavIndex };
                }
            }
        }
        return null;
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
        <div className="side-bar enhanced-sidebar">
            <ul className="mainSubClass">
                {routes.map((data, index) =>
                    <li key={index} className={`nav-item ${isActive === data?.name ? "active" : ""}`}>
                        <a 
                            className={`nav-link ${data?.subNav ? "collapsed" : ""}`} 
                            data-bs-toggle="collapse" 
                            data-bs-target={data?.subNav?.length > 0 ? `#collapseWidthExample${index}` : `#collapseWidthExample${index}`} 
                            onClick={() => sideBarHandler(data)}
                        >
                            <span className='icon'>
                                <i className={data?.icon}></i>
                            </span>
                            <span className="nav-text">{t(data?.transform)}</span>
                            {data?.subNav && <i className="fas fa-chevron-up"></i>}
                        </a>
                        {data?.subNav?.length > 0 &&
                            <ul className="subList collapse" id={`collapseWidthExample${index}`}>
                                {data?.subNav?.map((subData, subIndex) =>
                                    <li key={subIndex} className={Number(isSubActive) === subIndex ? "active" : ""}>
                                        <a onClick={() => sideSubBarHandler(subData, subIndex)}>
                                            <span className='icon'>
                                                <i className="fas fa-circle"></i>
                                            </span>
                                            <span className="sub-nav-text">{t(subData?.transform)}</span>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        }
                    </li>
                )}
            </ul>
        </div>
    );
}

export default SideBar;

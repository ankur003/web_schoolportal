import React, { useState } from 'react';
import { Link ,useNavigate} from "react-router-dom";

function SideBar(props) {
    
    const [isActive,setIsActive] = useState("Create Class");
    const navigate = useNavigate();
    
    const sideBarHandler = (value) => {
        setIsActive(value.name);
        navigate(`${value.to}`);
    }
    return (
        <div className="side-bar">
            <ul>
                {props.routes.map((data, index) =>
                    <li key={index} onClick={()=>sideBarHandler(data)} className={isActive == data.name ? "active" : " " }>
                        <Link to={`${data.to}`}>{data.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default SideBar;
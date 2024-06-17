import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditAllProfileDetails from '../components/EditAllProfileDetails';

export default function ProfileDetailsPage() {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(true);

    const { pic, loader, noDataFound, userDetails } = useSelector((state) => state.entityReducer)
    console.log({ userDetails })

    const getAge = (date) => {
        let today = new Date(),
            dob = new Date(date),
            diff = today.getTime() - dob.getTime(),
            years = Math.floor(diff / 31556736000),
            days_diff = Math.floor((diff % 31556736000) / 86400000),
            months = Math.floor(days_diff / 30.4167),
            days = Math.floor(days_diff % 30.4167);
        return years + " years " + months + " months " + days + " days";
    }


    return (
        <>
            <div className="header">
                <h1>User Details</h1>
                <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/EntityPage")}>Back</button>
                </div>
            </div>
            <div className="content-body profile-content-body">
                <div className="card main-profile">
                    <div className="card-header">
                        <h6>{userDetails?.fullName} {" "} <i className="f-12">({userDetails?.userType})</i></h6>
                    </div>
                    <div className="profile-image">
                        <div className="image">
                            <img src={pic?.base64String === undefined ? require('../assets/images/no-data-found.gif') : 'data:image/png;base64,' + pic?.base64String} />
                        </div>
                    </div>
                    <div className="profile-content">
                        <p><strong><i className="fas fa-circle text-success"></i>Status : </strong><b className="text-success text-capitalize">{userDetails?.isActive
                            ? userDetails?.isActive : "NA"}</b></p>
                        <p><strong><i className="fas fa-sort-numeric-up-alt"></i>Roll No : </strong><strong>123</strong></p>
                        <p><strong><i className='fa-solid fa-school'></i>Class : </strong><span>{userDetails?.className ? userDetails.className : "NA"}</span> </p>
                        <p><strong><i className='fa-solid fa-school'></i>Section : </strong><span>{userDetails?.sectionName ? userDetails?.sectionName : "NA"}</span> </p>
                        <p><strong><i className="fas fa-envelope"></i>Email : </strong><span>{userDetails?.username ? userDetails?.username : "NA"}</span> </p>
                        <p><strong><i className="fas fa-mobile"></i>Mobile No : </strong><span>{userDetails?.phoneNo ? userDetails?.phoneNo : "NA"}</span> </p>
                        <p><strong><i className="fas fa-history"></i>Last Login : </strong> <span>5min ago</span> </p>
                        <button className={isEdit ? "btn btn-primary btn-block" : "btn btn-success btn-block"} onClick={() => setIsEdit(!isEdit)}>{isEdit ? "Edit Profile" : "Save"}</button>
                    </div>

                </div>
                <div className='profile-all-details'>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
                        </div>
                    </nav>

                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="card">
                                <div className='card-header'>
                                    <h6>Personal Information</h6>
                                </div>
                                {isEdit ?
                                    <div className='card-body'>
                                        <div className="form-content">
                                            <div className="d-flex">
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Full Name</label>
                                                        <p>{userDetails?.fullName}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">DOB</label>
                                                        <p>{userDetails?.dob ? userDetails?.dob : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Age</label>
                                                        <p>{userDetails?.dob ? getAge(userDetails?.dob) : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Gender</label>
                                                        <p>Male</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Name</label>
                                                        <p>Ravinder chauhan</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Name</label>
                                                        <p>Shakher chauhan</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Mobile No</label>
                                                        <p>987653210</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Mobile No</label>
                                                        <p>876543222210</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Email Id</label>
                                                        <p>Shakher.chauhan@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Email Id</label>
                                                        <p>Shakher.chauhan@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className='flex-100'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Address</label>
                                                        {/* <p>{userDetails?.address ? userDetails?.address : "NA"}</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <EditAllProfileDetails />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

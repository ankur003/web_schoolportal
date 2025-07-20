import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditAllProfileDetails from '../components/EditAllProfileDetails';
import { getAllUserDetails, updateUserDetails } from '../Redux/Action/entityAction';
import { SUPER_ADMIN } from '../Redux/Constants';
import { toast } from 'react-toastify';

export default function ProfileDetailsPage() {
    const { pic, loader, noDataFound, userDetails } = useSelector((state) => state.entityReducer)
    const { userId, role } = useSelector((state) => state.loginReducer);
    console.log({ userDetails, userId })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(true);

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

    const editRef = React.useRef();
    const submitForm = () => {
        if (editRef.current && editRef.current.getFormData) {
            const data = editRef.current.getFormData();
            let payload = { userId: userId, ...data };
            dispatch(updateUserDetails(payload, setIsEdit, toast));
        }
    };

    useEffect(() => {
        dispatch(getAllUserDetails(userId, null));
    }, [userId]);

    return (
        <>
            <div className="header">
                <h1>User Details</h1>
                {role === SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-light" onClick={() => navigate("/EntityPage")}>Back</button>
                </div>}
            </div>
            <div className="content-body">
                <div className='profile-content-body'>
                    <div className="card main-profile">
                        <div className="card-header">
                            <h6 className='text-capitalize'>{userDetails?.fullName} {" "} <i className="f-12">({userDetails?.userType})</i></h6>
                        </div>
                        <div className="profile-image">
                            <div className="image">
                                <img src={pic?.base64String === undefined ? require('../assets/images/no-data-found.gif') : 'data:image/png;base64,' + pic?.base64String} />
                            </div>
                        </div>
                        <div className="profile-content">
                            <p><strong><i className="fas fa-circle text-success"></i>Status : </strong><b className="text-success text-capitalize">{userDetails?.isActive === true ? "Active" : userDetails?.isActive === false ? "Inactive" : userDetails?.isActive === null
                                ? userDetails?.isActive : "NA"}</b></p>
                            <p><strong><i className="fas fa-sort-numeric-up-alt"></i>Roll No : </strong><strong>{userDetails?.rollNumber ? userDetails?.rollNumber : "NA"}</strong></p>
                            <p><strong><i className="fas fa-history"></i>Enrollment Number : </strong> <span>{userDetails?.enrollmentNumber ? userDetails?.enrollmentNumber : "NA"}</span> </p>
                            <p><strong><i className='fa-solid fa-school'></i>Class : </strong><span>{userDetails?.className ? userDetails.className : "NA"}, Section {userDetails?.sectionName ? userDetails?.sectionName : "NA"}</span></p>
                            <p><strong><i className="fas fa-envelope"></i>Email : </strong><span>{userDetails?.username ? userDetails?.username : "NA"}</span> </p>
                            <p><strong><i className="fas fa-mobile"></i>Mobile No : </strong><span>{userDetails?.phoneNo ? userDetails?.phoneNo : "NA"}</span> </p>
                            <button className={isEdit ? "btn btn-primary btn-block" : "btn btn-success btn-block"} onClick={() => { isEdit ? setIsEdit(!isEdit) : submitForm() }}>{isEdit ? "Edit Profile" : "Save"}</button>
                        </div>

                    </div>
                    <div className='profile-all-details'>
                        {isEdit ?
                            <div className='info-card-body'>
                                <div className="card">
                                    <div className='card-header'>
                                        <h6>PERSONAL INFORMATION</h6>
                                    </div>
                                    <div className='card-body'>
                                        <div className="form-content">
                                            <div className="d-flex">
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Full Name</label>
                                                        <p>{userDetails?.fullName ? userDetails?.fullName : "NA"}</p>
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
                                                        <label className="form-group-label">Blood Group</label>
                                                        <p>{userDetails?.userInfo?.bloodGroup ? userDetails?.userInfo?.bloodGroup : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">DOJ</label>
                                                        <p>{userDetails?.doj ? userDetails.doj : "NA"}</p>
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
                                                        <p>{userDetails?.userInfo?.gender ? userDetails?.userInfo?.gender : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Name</label>
                                                        <p>{userDetails?.userInfo?.fatherName ? userDetails?.userInfo?.fatherName : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Name</label>
                                                        <p>{userDetails?.userInfo?.motherName ? userDetails?.userInfo?.motherName : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Mobile No</label>
                                                        <p>{userDetails?.userInfo?.fatherPh ? userDetails?.userInfo?.fatherPh : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Mobile No</label>
                                                        <p>{userDetails?.userInfo?.motherPh ? userDetails?.userInfo?.motherPh : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Email Id</label>
                                                        <p>{userDetails?.userInfo?.fatherEmail ? userDetails?.userInfo?.fatherEmail : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Email Id</label>
                                                        <p>{userDetails?.userInfo?.motherEmail ? userDetails?.userInfo?.motherEmail : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Father Occupation</label>
                                                        <p>{userDetails?.userInfo?.fatherOccupation ? userDetails?.userInfo?.fatherOccupation : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Mother Occupation</label>
                                                        <p>{userDetails?.userInfo?.motherOccupation ? userDetails?.userInfo?.motherOccupation : "NA"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className='card-header'>
                                        <h6>CURRENT ADDRESS</h6>
                                    </div>
                                    <div className='card-body'>
                                        <div className="form-content">
                                            <div className="d-flex">
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Building Name</label>
                                                        <p>{userDetails?.address?.cBuildingName ? userDetails?.address?.cBuildingName : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Flat No</label>
                                                        <p>{userDetails?.address?.cFlatNo ? userDetails?.address?.cFlatNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Floor No</label>
                                                        <p>{userDetails?.address?.cFloorNo ? userDetails?.address?.cFloorNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">HouseNo</label>
                                                        <p>{userDetails?.address?.cHouseNo ? userDetails?.address?.cHouseNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Country</label>
                                                        <p>{userDetails?.address?.cCoutry ? userDetails?.address?.cCoutry : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">District</label>
                                                        <p>{userDetails?.address?.cDistrict ? userDetails?.address?.cDistrict : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">State</label>
                                                        <p>{userDetails?.address?.cState ? userDetails?.address?.cState : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Pin Code</label>
                                                        <p>{userDetails?.address?.cPinCode ? userDetails?.address?.cPinCode : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Village</label>
                                                        <p>{userDetails?.address?.cVillage ? userDetails?.address?.cVillage : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Tehsil</label>
                                                        <p>{userDetails?.address?.cTehsil ? userDetails?.address?.cTehsil : "NA"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className='card-header'>
                                        <h6>PERMANENT ADDRESS</h6>
                                    </div>
                                    <div className='card-body'>
                                        <div className="form-content">
                                            <div className="d-flex">
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Building Name</label>
                                                        <p>{userDetails?.address?.pBuildingName ? userDetails?.address?.pBuildingName : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Flat No</label>
                                                        <p>{userDetails?.address?.pFlatNo ? userDetails?.address?.pFlatNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Floor No</label>
                                                        <p>{userDetails?.address?.pFloorNo ? userDetails?.address?.pFloorNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">HouseNo</label>
                                                        <p>{userDetails?.address?.pHouseNo ? userDetails?.address?.pHouseNo : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Country</label>
                                                        <p>{userDetails?.address?.pCoutry ? userDetails?.address?.pCoutry : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">District</label>
                                                        <p>{userDetails?.address?.pDistrict ? userDetails?.address?.pDistrict : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">State</label>
                                                        <p>{userDetails?.address?.pState ? userDetails?.address?.pState : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Pin Code</label>
                                                        <p>{userDetails?.address?.pPinCode ? userDetails?.address?.pPinCode : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-r-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Village</label>
                                                        <p>{userDetails?.address?.pVillage ? userDetails?.address?.pVillage : "NA"}</p>
                                                    </div>
                                                </div>
                                                <div className='flex-50 pd-l-5'>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Tehsil</label>
                                                        <p>{userDetails?.address?.pTehsil ? userDetails?.address?.pTehsil : "NA"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <EditAllProfileDetails ref={editRef} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

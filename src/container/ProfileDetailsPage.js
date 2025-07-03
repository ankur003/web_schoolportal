import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditAllProfileDetails from '../components/EditAllProfileDetails';
import { getAllUserDetails, updateUserDetails } from '../Redux/Action/entityAction';
import { SUPER_ADMIN } from '../Redux/Constants';

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

    // Create a ref to access EditAllProfileDetails methods
    const editRef = React.useRef();

    // Example submit handler to get form data from child
    const submitForm = () => {
        if (editRef.current && editRef.current.getFormData) {
            const data = editRef.current.getFormData();
            // Do something with data, e.g., dispatch an action or API call
            let payload = {userId: userId, ...data};
            dispatch(updateUserDetails(payload, setIsEdit));
            console.log("Form Data from EditAllProfileDetails:", data);
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
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/EntityPage")}>Back</button>
                </div>}
            </div>
            <div className="content-body profile-content-body">
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
                        <p><strong><i className="fas fa-sort-numeric-up-alt"></i>Roll No : </strong><strong>{userDetails?.rollNumber}</strong></p>
                        <p><strong><i className='fa-solid fa-school'></i>Class : </strong><span>{userDetails?.className ? userDetails.className : "NA"}</span> </p>
                        <p><strong><i className='fa-solid fa-school'></i>Section : </strong><span>{userDetails?.sectionName ? userDetails?.sectionName : "NA"}</span> </p>
                        <p><strong><i className="fas fa-envelope"></i>Email : </strong><span>{userDetails?.username ? userDetails?.username : "NA"}</span> </p>
                        <p><strong><i className="fas fa-mobile"></i>Mobile No : </strong><span>{userDetails?.phoneNo ? userDetails?.phoneNo : "NA"}</span> </p>
                        <p><strong><i className="fas fa-history"></i>Last Login : </strong> <span>5min ago</span> </p>
                        <button className={isEdit ? "btn btn-primary btn-block" : "btn btn-success btn-block"} onClick={() => {isEdit ? setIsEdit(!isEdit) : submitForm() }}>{isEdit ? "Edit Profile" : "Save"}</button>
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
                                    <h6>PERSONAL INFORMATION</h6>
                                </div>
                                {isEdit ?
                                    <>
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
                                                            <p>Male</p>
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
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Mother Occupation</label>
                                                            <p>{userDetails?.userInfo?.motherOccupation ? userDetails?.userInfo?.motherOccupation : "NA"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-header'>
                                            <h6>CURRENT ADDRESS</h6>
                                        </div>
                                        <div className='card-body'>
                                            <div className="form-content">
                                                <div className="d-flex">
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Building Name</label>
                                                            <p>{userDetails?.address?.cBuildingName}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Flat No</label>
                                                            <p>{userDetails?.address?.cFlatNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Floor No</label>
                                                            <p>{userDetails?.address?.cFloorNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">HouseNo</label>
                                                            <p>{userDetails?.address?.cHouseNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Country</label>
                                                            <p>{userDetails?.address?.cCoutry}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">District</label>
                                                            <p>{userDetails?.address?.cDistrict}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">State</label>
                                                            <p>{userDetails?.address?.cState}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Pin Code</label>
                                                            <p>{userDetails?.address?.cPinCode}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Village</label>
                                                            <p>{userDetails?.address?.cVillage}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Tehsil</label>
                                                            <p>{userDetails?.address?.cTehsil}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-header'>
                                            <h6>PERMANENT ADDRESS</h6>
                                        </div>
                                        <div className='card-body'>
                                            <div className="form-content">
                                                <div className="d-flex">
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Building Name</label>
                                                            <p>{userDetails?.address?.cBuildingName}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Flat No</label>
                                                            <p>{userDetails?.address?.pFlatNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Floor No</label>
                                                            <p>{userDetails?.address?.pFloorNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">HouseNo</label>
                                                            <p>{userDetails?.address?.pHouseNo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Country</label>
                                                            <p>{userDetails?.address?.pCoutry}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">District</label>
                                                            <p>{userDetails?.address?.pDistrict}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">State</label>
                                                            <p>{userDetails?.address?.pState}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Pin Code</label>
                                                            <p>{userDetails?.address?.pPinCode}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-r-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Village</label>
                                                            <p>{userDetails?.address?.pVillage}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex-50 pd-l-5'>
                                                        <div className="form-group">
                                                            <label className="form-group-label">Tehsil</label>
                                                            <p>{userDetails?.address?.pTehsil}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <EditAllProfileDetails ref={editRef} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

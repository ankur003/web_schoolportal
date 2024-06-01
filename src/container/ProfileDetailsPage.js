import React, { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'

export default function ProfileDetailsPage() {

    const { pic, loader, noDataFound } = useSelector((state) => state.entityReducer)
    const [imageSrc, setImageSrc] = useState('');

    console.log(pic)
    useEffect(() => {
        setImageSrc('data:image/jpeg;base64:' + pic)
    },[pic])

    return (
        <>
            <div className="header">
                <h1>User Details</h1>
                <div className="header-right">
                    {/* {active === "home-tab" ?
                        <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Create Class Name</button> :
                        active === "profile-tab" ? <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Create Section</button> : <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Link Class & Section</button>} */}
                </div>
            </div>
            <div className="content-body profile-content-body">
                <div className="card main-profile">
                    <div className="card-header">
                        <h6>Student Name</h6>
                    </div>
                    <div className="profile-image">
                        <div className="image">
                            <img src={imageSrc} />
                        </div>
                    </div>
                    <div className="profile-content">
                        <p><strong><i className="fas fa-circle text-success"></i>Status : </strong><b className="text-success text-capitalize">active</b></p>
                        <p><strong><i className="fas fa-sort-numeric-up-alt"></i>Roll No : </strong><strong>123</strong></p>
                        <p><strong><i className='fa-solid fa-school'></i>Class : </strong><span>4th</span> </p>
                        <p><strong><i className='fa-solid fa-school'></i>Section : </strong><span>B</span> </p>
                        <p><strong><i className="fas fa-envelope"></i>Email : </strong><span>shakher.chauhan@gmail.com</span> </p>
                        <p><strong><i className="fas fa-mobile"></i>Mobile No : </strong><span>9717806435</span> </p>
                        <p><strong><i className="fas fa-history"></i>Last Login : </strong> <span>5min ago</span> </p>
                        <button className="btn btn-primary btn-block">Edit Profile</button>
                    </div>

                </div>
                <div className='profile-all-details'>
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
                        </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="card">
                                <div className='card-header'>
                                    <h6>Personal Information</h6>
                                </div>
                                <div className='card-body'>
                                    <div className="form-content">
                                        <div className="d-flex">
                                            <div className='flex-50 pd-r-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Full Name</label>
                                                    <p>Shakher chauhan</p>
                                                    <input type="text" className="form-control" name="fullname" placeholder="Enter Full Name" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-l-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">DOB</label>
                                                    <p>20-20-2024</p>
                                                    <input type="text" className="form-control" name="dob" placeholder="DOB" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-r-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Age</label>
                                                    <p>23</p>
                                                    <input type="text" className="form-control" name="age" value="24" disabled />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-l-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Gender</label>
                                                    <p>Male</p>
                                                    <select className='form-control' name='gender'>
                                                        <option value="male">Male</option>
                                                        <option value="male">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-r-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Father Name</label>
                                                    <p>Ravinder chauhan</p>
                                                    <input type="text" className="form-control" name="fatherName" placeholder="Enter Father Name" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-l-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Mother Name</label>
                                                    <p>Shakher chauhan</p>
                                                    <input type="text" className="form-control" name="motherName" placeholder="Enter Mother Name" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-r-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Father Mobile No</label>
                                                    <p>987653210</p>
                                                    <input type="tel" className="form-control" name="fatherMobileNumber" placeholder="Enter Father Mobile No" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-l-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Mother Mobile No</label>
                                                    <p>876543222210</p>
                                                    <input type="tel" className="form-control" name="motherName" placeholder="Enter Mother Mobile No" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-r-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Father Email Id</label>
                                                    <p>Shakher.chauhan@gmail.com</p>
                                                    <input type="text" className="form-control" name="fatherEmailId" placeholder="Enter Email Id" />
                                                </div>
                                            </div>
                                            <div className='flex-50 pd-l-5'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Mother Email Id</label>
                                                    <p>Shakher.chauhan@gmail.com</p>
                                                    <input type="text" className="form-control" name="motherEmailId" placeholder="Enter Mother Email Id" />
                                                </div>
                                            </div>
                                            <div className='flex-100'>
                                                <div className="form-group">
                                                    <label className="form-group-label">Address</label>
                                                    <p>vill + Post Sadholi kadim, Dist- Saharanpur</p>
                                                    <textarea type="text" className="form-control" name="address" placeholder="Enter Address" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

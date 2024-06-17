import React from 'react'

export default function EditAllProfileDetails() {
    return (
        <>
            <div className='card-body'>
                <div className="form-content">
                    <div className="d-flex">
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Full Name</label>
                                <input type="text" className="form-control" name="fullname" placeholder="Enter Full Name" />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">DOB</label>
                                <input type="text" className="form-control" name="dob" placeholder="DOB" />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Age</label>
                                <input type="text" className="form-control" name="age" value="24" disabled />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Gender</label>
                                <select className='form-control' name='gender'>
                                    <option value="male">Male</option>
                                    <option value="male">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Name</label>
                                <input type="text" className="form-control" name="fatherName" placeholder="Enter Father Name" />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Name</label>
                                <input type="text" className="form-control" name="motherName" placeholder="Enter Mother Name" />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Mobile No</label>
                                <input type="tel" className="form-control" name="fatherMobileNumber" placeholder="Enter Father Mobile No" />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Mobile No</label>
                                <input type="tel" className="form-control" name="motherName" placeholder="Enter Mother Mobile No" />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Email Id</label>
                                <input type="text" className="form-control" name="fatherEmailId" placeholder="Enter Email Id" />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Email Id</label>
                                <input type="text" className="form-control" name="motherEmailId" placeholder="Enter Mother Email Id" />
                            </div>
                        </div>
                        <div className='flex-100'>
                            <div className="form-group">
                                <label className="form-group-label">Address</label>
                                <textarea type="text" className="form-control" name="address" placeholder="Enter Address" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react'
import { useSelector } from 'react-redux';

const EditAllProfileDetails = React.forwardRef((props, ref) => {
    const { userDetails } = useSelector((state) => state.entityReducer);
    console.log("userDetails", userDetails);
    const [formData, setFormData] = React.useState({});

    React.useEffect(() => {
        setFormData({
            fullName: userDetails?.fullName || "",
            dob: userDetails?.dob || "",
            doj: userDetails?.doj || "",
            bloodGroup: userDetails?.userInfo?.bloodGroup || "",
            age: userDetails?.age || "",
            gender: userDetails?.gender || "",
            fatherName: userDetails?.fatherName || "",
            motherName: userDetails?.motherName || "",
            fatherMobileNumber: userDetails?.fatherMobileNumber || "",
            motherMobileNumber: userDetails?.motherMobileNumber || "",
            fatherEmailId: userDetails?.fatherEmailId || "",
            motherEmailId: userDetails?.motherEmailId || "",
            cBuildingName: userDetails?.address?.cBuildingName || "",
            cFlatNo: userDetails?.address?.cFlatNo || "",
            cFloorNo: userDetails?.address?.cFloorNo || "",
            cHouseNo: userDetails?.address?.cHouseNo || "",
            cCoutry: userDetails?.address?.cCoutry || "",
            cDistrict: userDetails?.address?.cDistrict || "",
            cState: userDetails?.address?.cState || "",
            cPinCode: userDetails?.address?.cPinCode || "",
            cVillage: userDetails?.address?.cVillage || "",
            cTehsil: userDetails?.address?.cTehsil || "",
            pBuildingName: userDetails?.address?.pBuildingName || "",
            pFlatNo: userDetails?.address?.pFlatNo || "",
            pFloorNo: userDetails?.address?.pFloorNo || "",
            pHouseNo: userDetails?.address?.pHouseNo || "",
            pCoutry: userDetails?.address?.pCoutry || "",
            pDistrict: userDetails?.address?.pDistrict || "",
            pState: userDetails?.address?.pState || "",
            pPinCode: userDetails?.address?.pPinCode || "",
            pVillage: userDetails?.address?.pVillage || "",
            pTehsil: userDetails?.address?.pTehsil || "",
            fatherOccupation: userDetails?.userInfo?.fatherOccupation || "",
            motherOccupation: userDetails?.userInfo?.motherOccupation || "",
        });
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Call this function from parent ProfileDetailsPage.js on Save button
    // Example: <EditAllProfileDetails ref={editRef} ... /> and then editRef.current.getFormData()
    React.useImperativeHandle(
        ref,
        () => ({
            getFormData: () => formData,
        }),
        [formData]
    );

    return (
        <>
            <div className='card-body'>
                <div className="form-content">
                    <div className="d-flex">
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Full Name</label>
                                <input type="text" className="form-control" name="fullName" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">DOB</label>
                                <input type="text" className="form-control" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">DOJ</label>
                                <input type="text" className="form-control" name="doj" placeholder="Enter DOJ" value={formData.doj} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Blood Group</label>
                                <input type="text" className="form-control" name="bloodGroup" placeholder="Enter Blood Group" value={formData.bloodGroup} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Age</label>
                                <input type="text" className="form-control" name="age" value={formData.age} disabled />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Gender</label>
                                <select className='form-control' name='gender' value={formData.gender} onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Name</label>
                                <input type="text" className="form-control" name="fatherName" placeholder="Enter Father Name" value={formData.fatherName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Name</label>
                                <input type="text" className="form-control" name="motherName" placeholder="Enter Mother Name" value={formData.motherName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Mobile No</label>
                                <input type="tel" className="form-control" name="fatherMobileNumber" placeholder="Enter Father Mobile No" value={formData.fatherMobileNumber} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Mobile No</label>
                                <input type="tel" className="form-control" name="motherMobileNumber" placeholder="Enter Mother Mobile No" value={formData.motherMobileNumber} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Email Id</label>
                                <input type="text" className="form-control" name="fatherEmailId" placeholder="Enter Email Id" value={formData.fatherEmailId} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Email Id</label>
                                <input type="text" className="form-control" name="motherEmailId" placeholder="Enter Mother Email Id" value={formData.motherEmailId} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Father Occupation</label>
                                 <input type="text" className="form-control" name="fatherOccupation" placeholder="Enter Father Occupation" value={formData.fatherOccupation} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">Mother Occupation</label>
                                 <input type="text" className="form-control" name="motherOccupation" placeholder="Enter Mother Occupation" value={formData.motherOccupation} onChange={handleChange} />
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
                                <label className="form-group-label">BUILDING NAME</label>
                                <input type="text" className="form-control" name="cBuildingName" placeholder="Enter Building Name" value={formData.cBuildingName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">FLAT NO</label>
                                <input type="text" className="form-control" name="cFlatNo" placeholder="Enter Flat No" value={formData.cFlatNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">FLOOR NO</label>
                                <input type="text" className="form-control" name="cFloorNo" placeholder="Enter Floor No" value={formData.cFloorNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">HOUSENO</label>
                                <input type="text" className="form-control" name="cHouseNo" placeholder="Enter House No" value={formData.cHouseNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">COUNTRY</label>
                                <input type="text" className="form-control" name="cCoutry" placeholder="Enter Country" value={formData.cCoutry} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">DISTRICT</label>
                                <input type="text" className="form-control" name="cDistrict" placeholder="Enter District" value={formData.cDistrict} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">STATE</label>
                                <input type="text" className="form-control" name="cState" placeholder="Enter State" value={formData.cState} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">PIN CODE</label>
                                <input type="text" className="form-control" name="cPinCode" placeholder="Enter Pin Code" value={formData.cPinCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">VILLAGE</label>
                                <input type="text" className="form-control" name="cVillage" placeholder="Enter Village" value={formData.cVillage} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">TEHSIL</label>
                                <input type="text" className="form-control" name="cTehsil" placeholder="Enter Tehsil" value={formData.cTehsil} onChange={handleChange} />
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
                                <label className="form-group-label">BUILDING NAME</label>
                                <input type="text" className="form-control" name="pBuildingName" placeholder="Enter Building Name" value={formData.pBuildingName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">FLAT NO</label>
                                <input type="text" className="form-control" name="pFlatNo" placeholder="Enter Flat No" value={formData.pFlatNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">FLOOR NO</label>
                                <input type="text" className="form-control" name="pFloorNo" placeholder="Enter Floor No" value={formData.pFloorNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">HOUSENO</label>
                                <input type="text" className="form-control" name="pHouseNo" placeholder="Enter House No" value={formData.pHouseNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">COUNTRY</label>
                                <input type="text" className="form-control" name="pCoutry" placeholder="Enter Country" value={formData.pCoutry} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">DISTRICT</label>
                                <input type="text" className="form-control" name="pDistrict" placeholder="Enter District" value={formData.pDistrict} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">STATE</label>
                                <input type="text" className="form-control" name="pState" placeholder="Enter State" value={formData.pState} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">PIN CODE</label>
                                <input type="text" className="form-control" name="pPinCode" placeholder="Enter Pin Code" value={formData.pPinCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-r-5'>
                            <div className="form-group">
                                <label className="form-group-label">VILLAGE</label>
                                <input type="text" className="form-control" name="pVillage" placeholder="Enter Village" value={formData.pVillage} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex-50 pd-l-5'>
                            <div className="form-group">
                                <label className="form-group-label">TEHSIL</label>
                                <input type="text" className="form-control" name="pTehsil" placeholder="Enter Tehsil" value={formData.pTehsil} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default EditAllProfileDetails;

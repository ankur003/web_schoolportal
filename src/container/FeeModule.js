import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SUPER_ADMIN } from "../Redux/Constants";
import { AddOrEditFee, fetchFees } from "../Redux/Action/feeManageAction";

const FeeModule = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.loginReducer);
    const { feeList, loader } = useSelector((state) => state.feeManageReducer);
    const { classList } = useSelector((state) => state.manageClassesReducer);
    const [feeId, setFeeId] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const [isModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        feeType: "",
        totalFee: "",
        academicYear: "",
        masterClassUuid: "",
    });

    useEffect(() => {
        // Fetch fees when the component mounts
        dispatch(fetchFees());
    }, []);

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditClick = (fee) => {
        setFormData({
            feeType: fee.feeType,
            totalFee: fee.totalFee,
            academicYear: fee.academicYear,
            masterClassUuid: fee.masterClassUuid,
        });
        setShowModal(true);
        setFeeId(fee.id);
        setIsEdit(true);
    };

    const formSubmit = async () => {
        let data = {
            feeType: formData.feeType,
            totalFee: formData.totalFee,
            academicYear: formData.academicYear,
            masterClassUuid: formData.masterClassUuid,
        }
        if (isEdit) {
            data = {
                ...data,
                masterFeesUuid: feeId,
            };
        }
        dispatch(AddOrEditFee(data, setShowModal));
    };

    return (
        <>
            <div className="header">
                <h1>Fee Management</h1>
                {role === SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>Create New Fee</button>
                </div>}
            </div>
            <div className="content-body">
                {loader ?
                    feeList?.length > 0 ? (
                        <div className="table-content">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Class Name</th>
                                        <th>Fee Type</th>
                                        <th>Total Fee</th>
                                        <th>Academic Year</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeList?.map((fee) => (
                                        <tr key={fee.id}>
                                            <td>{fee.id}</td>
                                            <td>{fee.className}</td>
                                            <td>{fee.feeType}</td>
                                            <td>{fee.totalFee}</td>
                                            <td>{fee.academicYear}</td>
                                            <td>{fee.createdAt}</td>
                                            <td>
                                                <button className="btn btn-success mr-r-4" onClick={() => handleEditClick(fee, true)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) :
                        <div className="no-data-found">
                            <div className="no-data-image">
                                <img alt='logo' src={require('../assets/images/no-data-found.gif')} />
                            </div>
                            <p>no data found</p>
                        </div> :
                    <div className="loader-content">
                        <div className="no-data-image">
                            <img alt='logo' src={require('../assets/images/loader.gif')} />
                        </div>
                    </div>
                }
            </div>

            {/* Edit Modal */}
            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">CREATE FEE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="d-flex">
                                        <div className="flex-50 pd-r-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Class Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="className"
                                                    onChange={handlerChange}
                                                    value={formData.className}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-50 pd-l-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Class Teacher</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="classTeacher"
                                                    onChange={handlerChange}
                                                    value={formData.classTeacher}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-50 pd-r-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Fee Type</label>
                                                <select
                                                    className="form-control"
                                                    name="feeType"
                                                    onChange={handlerChange}
                                                    value={formData.feeType}
                                                    required
                                                >
                                                    <option value="">Select Fee Type</option>
                                                    <option value="ANNUAL">Annual</option>
                                                    <option value="MONTHLY">Monthly</option>
                                                    <option value="QUARTERLY">Quarterly</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex-50 pd-l-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Total Fee</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="totalFee"
                                                    onChange={handlerChange}
                                                    value={formData.totalFee}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-50 pd-r-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Academic Year</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="academicYear"
                                                    min="1900"
                                                    max="2099"
                                                    step="1"
                                                    onChange={handlerChange}
                                                    value={formData.academicYear}
                                                    required
                                                    placeholder="e.g. 2024"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-50 pd-l-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Class Name</label>
                                                <select className="form-control" name="masterClassUuid" onChange={handlerChange} value={formData.masterClassUuid}>
                                                    <option value="">Select Class</option>
                                                    {classList?.map((data, index) =>
                                                        <option key={index} value={data.masterClassUuid}>{data.className}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={formSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default FeeModule;
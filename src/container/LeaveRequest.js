import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SUPER_ADMIN } from "../Redux/Constants";
import { getLeaveRequestDetails, leaveRequestAction, leaveRequestApply } from "../Redux/Action/LeaveAndAttandanceAction";

const LeaveRequest = () => {
    const dispatch = useDispatch();
    const { userId, role } = useSelector((state) => state.loginReducer);
    const { leaveRequest, loader, noDataFound } = useSelector((state) => state.leaveRequestReducer);
    let requests = leaveRequest.filter(mapData => mapData.category === "LEAVE") || [];
    const [isModal, SetIsModal] = useState(false);

    useEffect(() => {
        let data = { userId: role !== SUPER_ADMIN && userId };
        console.log({ data })
        dispatch(getLeaveRequestDetails(data));
    }, []);

    const handleAction = (userUuid, date, action) => {
        let data = {
            userUuid: userUuid,
            date: date,
            action: action,
            catagory: "LEAVE"
        };
        dispatch(leaveRequestAction(data));
    };

    const [formData, setFormData] = useState({
        leaveType: "",
        date: ""
    });

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const formSubmit = async () => {
        let data = {
            leaveType: formData.leaveType,
            date: formData.date,
            catagory: "LEAVE"
        };
        dispatch(leaveRequestApply(data, SetIsModal));
    };
    return (
        <>
            <div className="header">
                <h1>Leave Requests</h1>
                {role !== SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Apply Leave</button>
                </div>}
            </div>
            <div className="content-body">
                {loader ?
                    requests?.length > 0 ? (
                        <div className="table-content">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        {role === SUPER_ADMIN && <>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>User Type</th>
                                        </>
                                        }
                                        <th>Leave Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        {role === SUPER_ADMIN && <th>Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req, index) => (
                                        <tr key={index}>
                                            {role === SUPER_ADMIN && <>
                                                <td>{req.user.fullName}</td>
                                                <td>{req.user.username}</td>
                                                <td>{req.user.className}</td>
                                                <td>{req.user.sectionName}</td>
                                                <td>{req.user.userType}</td>
                                            </>
                                            }
                                            <td>{req.attendanceStatus}</td>
                                            <td>{req.date}</td>
                                            <td><div className={req.approvalStatus === "APPROVED" ? "fw-bold text-success" : req.approvalStatus === "REJECTED" ? "fw-bold text-danger" : "fw-bold text-warning"}>{req.approvalStatus}</div></td>
                                            {role === SUPER_ADMIN && (
                                                <td>
                                                    {req.approvalStatus === "PENDING" &&
                                                        <>
                                                            <button className="btn btn-success mr-r-4"
                                                                onClick={() =>
                                                                    handleAction(req.user.userUuid, req.date, "APPROVED")
                                                                }
                                                            >
                                                                Approve
                                                            </button>
                                                            <button className="btn btn-danger"
                                                                onClick={() =>
                                                                    handleAction(req.user.userUuid, req.date, "REJECTED")
                                                                }
                                                            >
                                                                Reject
                                                            </button>
                                                        </>}
                                                </td>
                                            )}
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

            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Apply Leave</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => SetIsModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="form-group">
                                        <label className="form-group-label">Leave Type</label>
                                        <select className="form-control" name="leaveType" onChange={(e) => handlerChange(e)}>
                                            <option value="">Select Leave Type</option>
                                            <option value="SICK_LEAVE">Sick Leave</option>
                                            <option value="CASUAL_LEAVE">Casual Leave</option>
                                            <option value="HALF_DAY">Half Day Leave</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            onChange={(e) => handlerChange(e)}
                                            value={formData.date}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => SetIsModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => formSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default LeaveRequest;
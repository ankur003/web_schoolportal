import React, { useEffect, useState } from "react";
import axios from "axios";
import { SUPER_ADMIN } from "../Redux/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdatePayment, fetchFees, fetchPayments } from "../Redux/Action/feeManageAction";

function PaymentDetails() {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.loginReducer);
    const { feeList } = useSelector((state) => state.feeManageReducer);
    const { paymentList, loader } = useSelector((state) => state.feeManageReducer);
    const { studentList } = useSelector((state) => state.entityReducer);
    console.log({ feeList, studentList });
    const [isModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        userUuid: "",
        masterFeesUuid: "",
        paymentDate: "",
        paymentMode: "",
        transactionId: "",
        remarks: ""
    });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        dispatch(fetchPayments());
    }, []);

    useEffect(() => {
        // Fetch fees when the component mounts
        dispatch(fetchFees());
    }, []);

    // Removed duplicate handlerChange declaration to fix redeclaration error

    const formSubmit = () => {
        // Handle form submission logic here
        const data = {
            amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : 0,
            masterFee: {
                masterFeesUuid: formData.masterFeesUuid
            },
            paymentDate: formData.paymentDate,
            paymentMode: formData.paymentMode,
            remarks: formData.remarks,
            transactionId: formData.transactionId,
            userUuid: formData.userUuid
        };
        console.log({ data })
        dispatch(addOrUpdatePayment(data, setShowModal));
    };

    const handlerChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value })
        if (name === "masterFeesUuid") {
            // Find the selected fee object
            const selectedFee = feeList.find(fee => fee.masterClassUuid === value);
            const className = selectedFee ? selectedFee.className : "";
            let filterStudents = studentList?.filter(student => student?.className === className);
            setStudents(filterStudents);

            // Set both masterClassUuid and masterFeesUuid in formData
            setFormData((prevData) => ({
                ...prevData,
                masterFeesUuid: selectedFee ? selectedFee.masterFeesUuid : "",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <>
            <div className="header">
                <h1>Manage Payment</h1>
                {role === SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>Add Payment</button>
                </div>}
            </div>
            <div className="content-body">
                {loader ?
                    paymentList?.length > 0 ? (
                        <div className="table-content">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Class</th>
                                        <th>Fee Type</th>
                                        <th>Total Fee</th>
                                        <th>Amount Paid</th>
                                        <th>Payment Date</th>
                                        <th>Payment Mode</th>
                                        <th>Transaction ID</th>
                                        <th>Remarks</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentList?.map((p, idx) => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p?.user?.fullName}</td>
                                            <td>{p.masterFee?.masterClass?.className}</td>
                                            <td>{p.masterFee?.feeType}</td>
                                            <td>{p.masterFee?.totalFee}</td>
                                            <td>{p.amountPaid}</td>
                                            <td>{p.paymentDate?.slice(0, 10)}</td>
                                            <td>{p.paymentMode}</td>
                                            <td>{p.transactionId}</td>
                                            <td>{p.remarks}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => " "}>Edit</button>
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
                                <h5 className="modal-title" id="exampleModalLabel">Add Payment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="form-group">
                                        <label className="form-group-label">Amount Paid</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="amountPaid"
                                            onChange={handlerChange}
                                            value={formData.amountPaid}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Class</label>
                                        <select className="form-control" name="masterFeesUuid" onChange={handlerChange} value={formData.masterClassUuid} required>
                                            <option value="">Select Class</option>
                                            {feeList.map((classItem, index) => (
                                                <option key={index} value={classItem.masterClassUuid}>
                                                    {classItem?.className}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Student</label>
                                        <select className="form-control" name="userUuid" onChange={handlerChange} value={formData.userUuid} required>
                                            <option value="">Select Student</option>
                                            {students?.map((student, index) => (
                                                <option key={index} value={student?.userUuid}>{student?.fullName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Payment Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="paymentDate"
                                            onChange={handlerChange}
                                            value={formData.paymentDate}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Payment Mode</label>
                                        <select
                                            className="form-control"
                                            name="paymentMode"
                                            onChange={handlerChange}
                                            value={formData.paymentMode}
                                            required
                                        >
                                            <option value="">Select Payment Mode</option>
                                            <option value="CASH">Cash</option>
                                            <option value="CARD">Card</option>
                                            <option value="ONLINE">Online</option>
                                            <option value="CHEQUE">Cheque</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Transaction ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="transactionId"
                                            onChange={handlerChange}
                                            value={formData.transactionId}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Remarks</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="remarks"
                                            onChange={handlerChange}
                                            value={formData.remarks || ""}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={formSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div >
                </div >}
        </>
    );
}

export default PaymentDetails;
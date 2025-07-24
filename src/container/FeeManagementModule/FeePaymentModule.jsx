import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getEntities } from '../../Redux/Action/entityAction';
import { addStudentFee, getAllFees, getUserFeeByUserId, getUserFeeListAction } from '../../Redux/Action/feeManageAction';
import Loader from '../../components/Loader';
import NoDataFound from '../../components/NoDataFound';
import CounterCard from '../../components/CounterCard';
import { use } from 'react';
import { toast } from 'react-toastify';
import { PARENT, SUPER_ADMIN, TEACHER } from '../../Redux/Constants';

export default function FeePaymentModule() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const { linkList } = useSelector(state => state.manageClassesReducer);
    const { entityList, feeUserId } = useSelector(state => state.entityReducer);
    console.log({feeUserId})
    const { userFeeList } = useSelector(state => state.feeManageReducer);
    const { monthlyList, oneTimeList } = useSelector((state) => state.feeManageReducer);
    const userRole = useSelector(state => state.loginReducer.role);

    const totalStudents = new Set(userFeeList?.map(item => item?.userUuid)).size;
    const totalPayments = userFeeList?.length;
    const totalPaymentAmount = userFeeList?.reduce((sum, item) => sum + (item?.amountPaid || 0), 0);
    const averagePaymentAmount = totalPayments > 0 ? totalPaymentAmount / totalPayments : 0;

    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");
    const [isModal, setIsModal] = useState(false);
    const [ModalDataList, setModalData] = useState();
    const [isPaymentModal, setIsPaymentModal] = useState(false);

    const classOptionsList = linkList ? linkList?.map(section => ({
        label: section?.className,
        value: section?.masterClassUuid
    })) : "";

    const sectionOptionsList = sectionList ? sectionList?.map(section => ({
        label: section?.sectionName,
        value: section?.masterSectionUuid
    })) : "";

    const userOptions = entityList?.map(student => ({
        label: student?.fullName,
        value: student?.userUuid
    })) || [];

    const [oneTimeFormData, setOneTimeFormData] = useState({
        annualFee: "",
        dressFee: "",
        registrationFee: "",
    });

    const [monthlyFormData, setMonthlyFormData] = useState({
        tuitionFee: "",
        transportFee: "",
        foodFee: "",
    });

    const oneTimeFeeObject = oneTimeList?.reduce((acc, item) => {
        acc[item.feeName] = item;
        return acc;
    }, {});

    const monthlyFeeObject = monthlyList?.reduce((acc, item) => {
        acc[item.feeName] = item;
        return acc;
    }, {});

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("common_") || name.includes("ANNUAL_") || name.includes("DRESS_") || name.includes("REGISTRATION_")) {
            setOneTimeFormData((prev) => ({ ...prev, [name]: value }));
        } else if (name.includes("TUITION_") || name.includes("TRANSPORT_") || name.includes("FOOD_")) {
            setMonthlyFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (selectedClass?.value && userRole === SUPER_ADMIN) {
            dispatch(getAllFees({ masterClassUuid: selectedClass.value, feeType: "ONE_TIME" }));
            dispatch(getAllFees({ masterClassUuid: selectedClass.value, feeType: "MONTHLY" }));
        }
    }, [selectedClass, dispatch]);

    const formSubmit = () => {
        const commonFields = {
            month: oneTimeFormData.common_month || "",
            paymentDate: oneTimeFormData.common_paymentDate || "",
            paymentMode: oneTimeFormData.common_paymentMode || "",
            remarks: oneTimeFormData.common_remarks || "",
            transactionId: oneTimeFormData.common_transactionId || "",
            userUuid: selectedUser?.value || "",
            year: oneTimeFormData.common_year || ""
        };

        const oneTimePayments = [];
        const monthlyPayments = [];

        // Process One-Time Fees
        ["ANNUAL", "DRESS", "REGISTRATION"].forEach(feeName => {
            if (oneTimeFormData[`${feeName}_amountPaid`]) {
                oneTimePayments.push({
                    ...commonFields,
                    month: null,
                    amountPaid: parseInt(oneTimeFormData[`${feeName}_amountPaid`]) || 0,
                    feeName: feeName,
                    feeType: "ONE_TIME"
                });
            }
        });

        // Process Monthly Fees
        ["TUITION", "TRANSPORT", "FOOD"].forEach(feeName => {
            if (monthlyFormData[`${feeName}_amountPaid`]) {
                monthlyPayments.push({
                    ...commonFields,
                    amountPaid: parseInt(monthlyFormData[`${feeName}_amountPaid`]) || 0,
                    feeName: feeName,
                    feeType: "MONTHLY"
                });
            }
        });

        const finalPayload = [...oneTimePayments, ...monthlyPayments];

        dispatch(addStudentFee(finalPayload, setIsPaymentModal, toast));
    };




    const handleChangeSections = (selected) => {
        setSelectedSections(selected);
        let data = { page, limit, userType: "STUDENT", values: { sectionName: selected?.label, className: selectedClass?.label }, Studentfilter: true };
        dispatch(getEntities(data));
    }

    const handleChange = (selected) => {
        setSelectedClass(selected);
        const selectedClassUuids = Array.isArray(selected) ? selected.map(s => s.value) : [selected.value];
        const filteredSections = linkList
            .filter(cls => selectedClassUuids.includes(cls.masterClassUuid))
            .flatMap(cls => cls.masterSection);
        setSectionList(filteredSections);
    };

    const filterHandler = () => {
        const payload = { userUuid: selectedUser.value, masterClassUuid: selectedClass.value, masterSectionUuid: selectedSections.value };
        getUserFeesList(payload);
    };

    const getUserFeesList = (payload) => {
        startTransition(() => {
            if (userRole === SUPER_ADMIN) {
                dispatch(getUserFeeListAction(payload));
            }
            else {
                dispatch(getUserFeeByUserId(payload))
            }
        });
    };

    const createChartData = (id, values) => [{
        id,
        data: values.map((y, i) => ({ x: `Day ${i + 1}`, y })),
    }];

    const showPaymentDetails = (data) => {
        setIsModal(true);
        setModalData(data)
    }

    useEffect(() => {
        getUserFeesList((userRole === PARENT || userRole === TEACHER) && feeUserId);
    }, []);

    return (
        <>
            <div className="header">
                <h1>Manage Student Fee's</h1>

                <div className="header-right">
                    {userRole === SUPER_ADMIN &&
                        <button type="button" className="btn btn-outline-light" onClick={() => { setIsPaymentModal(true); }}>Add Student Fee's</button>
                    }
                    {(userRole === PARENT || userRole === TEACHER) &&
                        <button type="button" className="btn btn-outline-light" onClick={() => { navigate("/StudentPage") }}>Back</button>
                    }
                </div>

            </div>
            <div className="content-body">
                {userRole === SUPER_ADMIN &&
                    <>
                        <div className='counter-wrapper' >
                            <div className="d-flex w-100">
                                <div className="flex-25 pd-r-10">
                                    <CounterCard
                                        title="Total Collected"
                                        value={totalPaymentAmount}
                                        chartData={createChartData('students', [1120, 1180, 1190, 1210, 1245])}
                                    />
                                </div>
                                <div className="flex-25 pd-l-10 pd-r-10">
                                    <CounterCard
                                        title="Total Payments"
                                        value={totalPayments}
                                        chartData={createChartData('attendance', [88, 90, 91, 92, 92])}
                                    />
                                </div>
                                <div className="flex-25 pd-r-10 pd-l-10">
                                    <CounterCard
                                        title="Students"
                                        value={totalStudents}
                                        chartData={createChartData('teachers', [45, 48, 50, 52, 55])}
                                    />
                                </div>
                                <div className="flex-25 pd-l-10">
                                    <CounterCard
                                        title="Average Fee's"
                                        value={averagePaymentAmount.toFixed(2)}
                                        chartData={createChartData('classes', [30, 32, 33, 34, 35])}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content-filter">
                            <div className='d-flex'>
                                <div className="flex-25 pd-l-5 pd-r-5">
                                    <div className="form-group">
                                        <Select
                                            name="sections"
                                            options={classOptionsList}
                                            value={selectedClass}
                                            onChange={handleChange}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Class"
                                        />
                                    </div>
                                </div>
                                <div className="flex-25 pd-l-5 pd-r-5">
                                    <div className="form-group">
                                        <Select
                                            name="sections"
                                            options={sectionOptionsList}
                                            value={selectedSections}
                                            onChange={handleChangeSections}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Sections"
                                        />
                                    </div>
                                </div>
                                <div className="flex-25 pd-l-5 pd-r-5">
                                    <div className="form-group">
                                        <Select
                                            name="students"
                                            options={userOptions}
                                            value={selectedUser}
                                            onChange={setSelectedUser}
                                            labelledBy="Select"
                                            hasSelectAll={false}
                                        />
                                    </div>
                                </div>
                                <div className="flex-25 pd-l-5">
                                    <div className="form-group">
                                        <button className="btn btn-block btn-success" onClick={() => filterHandler()}>Search</button>
                                        {/* <button className="btn btn-block btn-success" onClick={() => getUserFeesList()}>Clear</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <div className="user-Fee-wrapper">
                    {isPending ? <Loader /> :
                        userFeeList?.length > 0 ?
                            <>
                                <div className="table-content">
                                    <table className="table  table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Student Name</th>
                                                <th scope="col">Roll No</th>
                                                <th scope="col">Class Name</th>
                                                <th scope="col">Fee Type</th>
                                                <th scope="col">Fee Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Amount</th>
                                                <th scop="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userFeeList?.map((data, index) =>
                                                <tr key={index}>
                                                    <td scope="row">{index + 1}</td>
                                                    <td >{data?.fullName ? data?.fullName : "N/A"}</td>
                                                    <td>{data?.rollNumber ? data?.rollNumber : "N/A"}</td>
                                                    <td>{data?.className ? data?.className : "N/A"} {data?.classSection ? `Sec - ${data?.classSection}` : "N/A"}</td>
                                                    <td>{data?.feeType ? <span className={data?.feeType === "ONE_TIME" ? "badge badge-warning" : "badge badge-success"}>{data?.feeType}</span> : "N/A"}</td>
                                                    <td>{data?.feeName ? data?.feeName : "N/A"}</td>
                                                    <td>{data?.paymentDate ? data?.paymentDate : "N/A"}</td>
                                                    <td>{data?.amountPaid ? data?.amountPaid : "N/A"}</td>
                                                    <td>
                                                        <button type='button' className="btn btn-primary mr-r-10" onClick={() => showPaymentDetails(data)}>View</button>
                                                        {/* <button type='button' className="btn btn-success" onClick={() => " "}>Make Payment</button> */}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            <NoDataFound />
                    }
                </div>
            </div>
            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content payment-modal-content">
                            <div className="card-container">
                                <div className="card-header">
                                    <button className="close-btn" onClick={() => setIsModal(false)} title="Close">×</button>
                                    <div className="payment-status">✓ PAID</div>
                                    <h2 className="fee-title">{ModalDataList?.feeName}</h2>
                                    <p className="fee-type">{ModalDataList?.feeType} Payment</p>
                                </div>

                                <div className="card-body">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Student Name</span>
                                            <span className="info-value">{ModalDataList?.fullName ? ModalDataList?.fullName : "N/A"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Class & Section</span>
                                            <span className="info-value">{ModalDataList?.className ? ModalDataList?.className : "N/A"} {ModalDataList?.classSection ? `Sec - ${ModalDataList?.classSection}` : "N/A"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Roll Number</span>
                                            <span className="info-value">{ModalDataList?.rollNumber ? ModalDataList?.rollNumber : "N/A"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Fee Month</span>
                                            <span className="info-value">{ModalDataList?.month ? ModalDataList?.month : "N/A"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Payment Date</span>
                                            <span className="info-value">{ModalDataList?.paymentDate.length > 0 ? `${ModalDataList?.paymentDate[0]} - ${ModalDataList?.paymentDate[1]} - ${ModalDataList?.paymentDate[2]}` : "N/A"}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Academic Year</span>
                                            <span className="info-value">{ModalDataList?.academicYear ? ModalDataList?.academicYear : "N/A"}</span>
                                        </div>
                                    </div>

                                    <div className="amount-section">
                                        <div className="amount-grid">
                                            <div className="amount-item">
                                                <span className="amount-label">Total Fee</span>
                                                <span className="amount-value total">{ModalDataList?.totalFee ? ModalDataList?.totalFee : "N/A"}</span>
                                            </div>
                                            <div className="amount-item">
                                                <span className="amount-label">Discount</span>
                                                <span className="amount-value discount">{ModalDataList?.discountAmount ? ModalDataList?.discountAmount : "N/A"}</span>
                                            </div>
                                            <div className="amount-item">
                                                <span className="amount-label">Amount Paid</span>
                                                <span className="amount-value paid">{ModalDataList?.amountPaid ? ModalDataList?.amountPaid : "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="transaction-details">
                                        <div className="transaction-row">
                                            <span className="transaction-label">Payment Mode:</span>
                                            <span className="transaction-value">{ModalDataList?.paymentMode ? ModalDataList?.paymentMode : "N/A"}</span>
                                        </div>
                                        <div className="transaction-row">
                                            <span className="transaction-label">Transaction ID:</span>
                                            <span className="transaction-value transaction-id">{ModalDataList?.transactionId ? ModalDataList?.transactionId : "N/A"}</span>
                                        </div>
                                        <div className="transaction-row">
                                            <span className="transaction-label">Payment UUID:</span>
                                            <span className="transaction-value transaction-id">80d2f368-728a-46da-b7ec...</span>
                                        </div>
                                    </div>

                                    <div className="remarks">
                                        <p className="remarks-text">{ModalDataList?.remarks ? ModalDataList?.remarks : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            {isPaymentModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content fee-add-modal">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Student Fee's</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setIsPaymentModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-content">
                                    {/* ✅ Student Selection */}
                                    <div className="d-flex">
                                        <div className="flex-33 pd-r-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Class Name</label>
                                                <Select
                                                    name="sections"
                                                    options={classOptionsList}
                                                    value={selectedClass}
                                                    isClearable
                                                    onChange={handleChange}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Select Class"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-33 pd-l-5 pd-r-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Section Name</label>
                                                <Select
                                                    name="sections"
                                                    options={sectionOptionsList}
                                                    value={selectedSections}
                                                    isClearable
                                                    onChange={handleChangeSections}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Select Sections"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-33 pd-l-5">
                                            <div className="form-group">
                                                <label className="form-group-label">Student Name</label>
                                                <Select
                                                    name="students"
                                                    options={userOptions}
                                                    value={selectedUser}
                                                    onChange={setSelectedUser}
                                                    isClearable
                                                    labelledBy="Select"
                                                    hasSelectAll={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✅ Common Payment Details - Month field removed from here */}
                                    <div className="common-details p-3 border rounded bg-light">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-group-label">Payment Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="common_paymentDate"
                                                        value={oneTimeFormData?.common_paymentDate || ""}
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-group-label">Year</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="common_year"
                                                        value={oneTimeFormData?.common_year || ""}
                                                        onChange={onChangeHandler}
                                                        placeholder="Enter year (e.g., 2025)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-group-label">Payment Mode</label>
                                                    <select
                                                        className="form-control"
                                                        name="common_paymentMode"
                                                        value={oneTimeFormData?.common_paymentMode || ""}
                                                        onChange={onChangeHandler}
                                                    >
                                                        <option value="">Select Mode</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="ONLINE">Online</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="CARD">Card</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-group-label">Transaction ID</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="common_transactionId"
                                                        value={oneTimeFormData?.common_transactionId || ""}
                                                        onChange={onChangeHandler}
                                                        placeholder="Enter transaction ID"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="form-group-label">Remarks</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="common_remarks"
                                                        value={oneTimeFormData?.common_remarks || ""}
                                                        onChange={onChangeHandler}
                                                        placeholder="Enter remarks"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✅ Fee Amounts */}
                                    <div className="d-flex mr-t-15">
                                        <div className="flex-50 pd-r-5">
                                            <div className="fee-card one-time-fee">
                                                <div className="fee-card-header">One-Time Fees</div>
                                                <div className="fee-card-body">
                                                    {["ANNUAL", "DRESS", "REGISTRATION"].map((feeName, index) => (
                                                        <div key={index} className="fee-row">
                                                            <div className="fee-info">
                                                                <span className="fee-label">
                                                                    {feeName.charAt(0) + feeName.slice(1).toLowerCase()} Fee
                                                                </span>
                                                                <span className="fee-total">
                                                                    Total: ₹{oneTimeFeeObject?.[feeName]?.totalFee || 0}
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                className="form-control fee-input"
                                                                name={`${feeName}_amountPaid`}
                                                                value={oneTimeFormData?.[`${feeName}_amountPaid`] || ""}
                                                                onChange={onChangeHandler}
                                                                placeholder={`Enter ${feeName} Fee`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-50 pd-l-5">
                                            <div className="fee-card monthly-fee">
                                                {/* ✅ Monthly Fee Card Header with Month selector */}
                                                <div className="fee-card-header d-flex justify-content-between align-items-center">
                                                    <span>Monthly Fees</span>
                                                    <div className="month-selector" style={{ minWidth: '120px' }}>
                                                        <select
                                                            className="form-control form-control-sm"
                                                            name="common_month"
                                                            value={oneTimeFormData?.common_month || ""}
                                                            onChange={onChangeHandler}
                                                            style={{ fontSize: '12px' }}
                                                        >
                                                            <option value="">Select Month</option>
                                                            <option value="JANUARY">January</option>
                                                            <option value="FEBRUARY">February</option>
                                                            <option value="MARCH">March</option>
                                                            <option value="APRIL">April</option>
                                                            <option value="MAY">May</option>
                                                            <option value="JUNE">June</option>
                                                            <option value="JULY">July</option>
                                                            <option value="AUGUST">August</option>
                                                            <option value="SEPTEMBER">September</option>
                                                            <option value="OCTOBER">October</option>
                                                            <option value="NOVEMBER">November</option>
                                                            <option value="DECEMBER">December</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="fee-card-body">
                                                    {["TUITION", "TRANSPORT", "FOOD"].map((feeName, index) => (
                                                        <div key={index} className="fee-row">
                                                            <div className="fee-info">
                                                                <span className="fee-label">
                                                                    {feeName.charAt(0) + feeName.slice(1).toLowerCase()} Fee
                                                                </span>
                                                                <span className="fee-total">
                                                                    Total: ₹{monthlyFeeObject?.[feeName]?.totalFee || 0}
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                className="form-control fee-input"
                                                                name={`${feeName}_amountPaid`}
                                                                value={monthlyFormData?.[`${feeName}_amountPaid`] || ""}
                                                                onChange={onChangeHandler}
                                                                placeholder={`Enter ${feeName} Fee`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={() => setIsPaymentModal(false)}
                                >
                                    Close
                                </button>
                                <button className="btn btn-primary" onClick={formSubmit}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}

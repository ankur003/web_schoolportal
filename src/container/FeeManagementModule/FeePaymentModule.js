import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getEntities } from '../../Redux/Action/entityAction';
import { getUserFeeListAction } from '../../Redux/Action/feeManageAction';
import Loader from '../../components/Loader';
import NoDataFound from '../../components/NoDataFound';
import CounterCard from '../../components/CounterCard';

export default function FeePaymentModule() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const { linkList } = useSelector(state => state.manageClassesReducer);
    const { entityList } = useSelector(state => state.entityReducer);
    const { userFeeList } = useSelector(state => state.feeManageReducer);

    const totalStudents = new Set(userFeeList?.map(item => item.userUuid)).size;
    const totalPayments = userFeeList.length;
    const totalPaymentAmount = userFeeList.reduce((sum, item) => sum + (item.amountPaid || 0), 0);
    const averagePaymentAmount = totalPayments > 0 ? totalPaymentAmount / totalPayments : 0;

    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");

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
            dispatch(getUserFeeListAction(payload));
        });
    };

    const createChartData = (id, values) => [{
        id,
        data: values.map((y, i) => ({ x: `Day ${i + 1}`, y })),
    }];

    useEffect(() => {
        getUserFeesList();
    }, []);

    return (
        <>
            <div className="header">
                <h1>Manage Student Fee's</h1>
            </div>
            <div className="content-body">
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
                                                    <td>{data?.paymentDate.length > 0 ? `${data?.paymentDate[0]} - ${data?.paymentDate[1]} - ${data?.paymentDate[2]}` : "N/A"}</td>
                                                    <td>{data?.amountPaid ? data?.amountPaid : "N/A"}</td>
                                                    <td>
                                                        <button type='button' className="btn btn-primary mr-r-10" onClick={() => " "}>View</button>
                                                        <button type='button' className="btn btn-success" onClick={() => " "}>Make Payment</button>
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
        </>
    )
}

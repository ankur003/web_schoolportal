import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getEntities } from '../../Redux/Action/entityAction';
import { getUserFeeListAction } from '../../Redux/Action/feeManageAction';
import Loader from '../../components/Loader';

export default function FeePaymentModule() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const { linkList } = useSelector(state => state.manageClassesReducer);
    const { entityList } = useSelector(state => state.entityReducer);
    const { userFeeList } = useSelector(state => state.feeManageReducer);

    console.log({ userFeeList });

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

    useEffect(() => {
        getUserFeesList();
    }, []);

    return (
        <>
            <div className="header">
                <h1>Manage Student Fee's</h1>
            </div>
            <div className="content-body">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-Fee-wrapper">
                    {isPending ? <Loader /> : "data"}
                </div>
            </div>
        </>
    )
}

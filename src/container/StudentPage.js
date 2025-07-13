import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentEntities, createUser, linkClassSection, getAllUserDetails } from '../Redux/Action/entityAction';
import { getClasses } from '../Redux/Action/manageClassAction';
import Select from 'react-select';
import { STUDENT, SUPER_ADMIN } from '../Redux/Constants';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound';
import { toast } from 'react-toastify';

export default function StudentPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { studentList, pageLimit, pageCount, loader } = useSelector(state => state.entityReducer);
    const { linkList } = useSelector(state => state.manageClassesReducer);
    const userRole = useSelector(state => state.loginReducer.role);
    const { classSectionList } = useSelector(state => state.entityReducer);

    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");
    const [isModal, SetIsModal] = useState(false);
    const [isModalLink, SetIsModalLink] = useState(false);
    const [sectionOptions, setSectionOptions] = useState([]);
    const sectionOptionsList = sectionOptions ? sectionOptions?.map(section => ({
        label: section?.sectionName,
        value: section?.masterSectionUuid
    })) : "";
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
    });
    const [classInput, setclassInput] = useState("");
    const [selectedSections, setSelectedSections] = useState([]);
    const [userId, setUserId] = useState()

    useEffect(() => {
        let data = { page, limit, userType: "STUDENT", isNotAdmin: userRole === SUPER_ADMIN ? false : true, sectionName: classSectionList?.sectionName, className: classSectionList?.className }
        dispatch(getStudentEntities(data))
    }, [dispatch]);

    useEffect(() => {
        setDataList(studentList);
        setPage(pageCount);
        setLimit(pageLimit);
    }, [studentList, pageCount, pageLimit]);

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const linkClassChangeHandler = (e) => {
        setclassInput(e.target.value);
        let selectedClass = linkList?.find(item => item.masterClassUuid === e.target.value);
        setSectionOptions(selectedClass?.masterSection);

    }

    const formSubmit = () => {
        let data = { "userType": "STUDENT", ...formData }
        dispatch(createUser(data, SetIsModal, toast));
    };

    const handleChange = (selected) => {
        setSelectedSections(selected);
    };

    const formSubmitClassSec = () => {
        let data = { userId, className: classInput, sections: selectedSections?.value, userType: "STUDENT" };
        dispatch(linkClassSection(data, SetIsModalLink, toast));
    }

    const openLinkModal = (data) => {
        SetIsModalLink(true);
        setUserId(data?.userUuid)
        dispatch(getClasses());
    }

    const getAllUserDetails = (data) => {
        dispatch({ type: "GET_USER_ID", payload: data });
        navigate("/ProfileDetailsPage");
    }


    return (
        <>
            <div className="header">
                <h1>Students</h1>
                {userRole === SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Create Student</button>
                </div>}
            </div>
            <div className="content-body">
                {loader ?
                    dataList?.length > 0 ?
                        <div className="table-content">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Id</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Class Name</th>
                                        <th scope="col">Section</th>
                                        <th scope="col">Created By</th>
                                        <th scope="col">Created At</th>
                                        <th scop="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList?.map((data, index) =>
                                        <tr key={index + 1}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data?.fullName ? data?.fullName : "N/A"}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phoneNo ? data?.phoneNo : "N/A"}</td>
                                            <td>{data?.className ? data?.className : "N/A"}</td>
                                            <td>{data?.sectionName ? data?.sectionName : "N/A"}</td>
                                            <td>{data?.createdBy ? data?.createdBy : "N/A"}</td>
                                            <td>{data?.createdAt ? data?.createdAt : "N/A"}</td>
                                            <td>
                                                {userRole === SUPER_ADMIN ? <>
                                                    <button className={data?.className ? "btn mr-r-4 cursor-not-allowed" : "btn btn-warning mr-r-4"}
                                                        disabled={data?.className && data?.className}
                                                        onClick={() => { openLinkModal(data) }}>Link</button>
                                                    <button type='button' className="btn btn-primary mr-r-4" onClick={() => getAllUserDetails(data?.userUuid)}>View</button>
                                                    <button disabled className="btn btn-success mr-r-4">Edit</button>
                                                    <button disabled className="btn btn-danger">Delete</button>
                                                </>
                                                    :
                                                    <button type='button' className="btn btn-primary mr-r-4" onClick={() => getAllUserDetails(data?.userUuid)}>View</button>
                                                }
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <NoDataFound />
                    :
                    <Loader />
                }
            </div>

            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> Create Student</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => SetIsModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="form-group">
                                        <label className="form-group-label">User Name</label>
                                        <input type="text" className="form-control" name="username" placeholder="Enter Email Id" onChange={(e) => handlerChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Full Name</label>
                                        <input type="text" className="form-control" name="fullName" placeholder="Enter Full Name" onChange={(e) => handlerChange(e)} />
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

            {isModalLink &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Link Class with Section</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => SetIsModalLink(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="form-group">
                                        <label className="form-group-label">Class Name</label>
                                        <select className="form-control" name="className" onChange={(e) => linkClassChangeHandler(e)}>
                                            <option>Select</option>
                                            {linkList?.map((data, index) =>
                                                <option key={index} value={data.masterClassUuid}>{data.className}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Section Name</label>
                                        <Select
                                            name="sections"
                                            options={sectionOptionsList}
                                            value={selectedSections}
                                            onChange={handleChange}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Select Sections"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => SetIsModalLink(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => formSubmitClassSec()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>}


        </>
    )
}

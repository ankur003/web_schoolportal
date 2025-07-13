import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherEntities, createUser, linkClassSection } from '../Redux/Action/entityAction';
import Select from 'react-select';
import { getClasses } from '../Redux/Action/manageClassAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoDataFound from '../components/NoDataFound';
import Loader from '../components/Loader';

export default function TeacherPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { teacherList, pageLimit, pageCount, loader, noDataFound } = useSelector(state => state.entityReducer);
    const { classList, secList } = useSelector(state => state.manageClassesReducer);
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");
    const [isModal, SetIsModal] = useState(false);
    const [isModalLink, SetIsModalLink] = useState(false);
    const [userId, setUserId] = useState()
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
    });
    const [classInput, setclassInput] = useState("");
    const [selectedSections, setSelectedSections] = useState([]);
    const sectionOptions = secList ? secList?.map(section => ({
        label: section?.sectionName,
        value: section?.masterSectionUuid
    })) : "";

    useEffect(() => {
        let data = { page, limit, userType: "teacher" }
        dispatch(getTeacherEntities(data))
    }, [dispatch]);

    useEffect(() => {
        setDataList(teacherList);
        setPage(pageCount);
        setLimit(pageLimit);
    }, [pageCount, pageLimit]);


    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formSubmit = () => {
        let data = { "userType": "TEACHER", ...formData }
        dispatch(createUser(data, SetIsModal, toast));
    }

    const handleChange = (selected) => {
        setSelectedSections(selected);
    };

    const formSubmitClassSec = () => {
        let data = { userId, className: classInput, sections: selectedSections?.value, userType: "TEACHER" };
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
                <h1>Teachers</h1>
                <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Create Teacher</button>
                </div>
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
                                        <th scope="col">Class</th>
                                        <th scope="col">Section</th>
                                        <th scop="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList?.map((data, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data?.fullName ? data?.fullName : "N/A"}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phoneNo ? data?.phoneNo : "N/A"}</td>
                                            <td>{data?.className ? data?.className : "N/A"}</td>
                                            <td>{data?.sectionName ? data?.sectionName : "N/A"}</td>
                                            <td>
                                                <button className="btn btn-warning mr-r-4" onClick={() => { openLinkModal(data) }}>Link</button>
                                                <button type='button' className="btn btn-primary mr-r-4" onClick={() => getAllUserDetails(data?.userUuid)}>View</button>
                                                <button className="btn btn-success mr-r-4">Edit</button>
                                                <button className="btn btn-danger">Delete</button>
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
            </div >

            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Teacher</h5>
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
                                        <select className="form-control" name="className" onChange={(e) => setclassInput(e.target.value)}>
                                            <option>Select</option>
                                            {classList?.map((data, index) =>
                                                <option key={index} value={data.masterClassUuid}>{data.className}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-group-label">Section Name</label>
                                        <Select
                                            name="sections"
                                            options={sectionOptions}
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

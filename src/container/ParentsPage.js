import React, { useEffect, useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Loader from '../components/Loader'
import NoDataFound from '../components/NoDataFound'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../Redux/Action/manageClassAction';
import { createUser, getChildrenListByPar, getEntities, getParentEntities } from '../Redux/Action/entityAction';
import { toast } from 'react-toastify';

export default function ParentsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { entityList, parentList, pageLimit, pageCount, loader } = useSelector(state => state.entityReducer);
    const { classList, secList } = useSelector(state => state.manageClassesReducer);

    const [childrenMap, setChildrenMap] = useState({});
    const [isModal, setIsModal] = useState(false);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");
    const [selected, setSelected] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        className: "",
        sectionNames: ""
    });

    useEffect(() => {
        dispatch(getClasses());
    }, []);

    useEffect(() => {
        let data = { page, limit, userType: "PARENT", isNotAdmin: true };
        dispatch(getParentEntities(data, toast));
    }, []);

    const options = entityList?.map(student => ({
        label: student?.fullName,
        value: student?.userUuid
    })) || [];

    const formSubmit = () => {
        let sectionID = selected?.map(item => (item?.value));
        let data = {
            "userType": "PARENT",
            "fullName": formData?.fullName,
            "username": formData?.username,
            "userUuid": sectionID[0],
            "sectionUuid": document.getElementById("sectionNames").id,
            "classUuid": document.getElementById("className").id
        };
        dispatch(createUser(data, setIsModal, toast));
    }

    const handlerChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (formData?.className !== "" && formData?.sectionNames !== "") {
            let data = { page, limit, userType: "STUDENT", values: { sectionName: formData?.sectionNames, className: formData?.className }, Studentfilter: true };
            dispatch(getEntities(data));
        }
    }

    const getAllUserDetails = (data) => {
        dispatch({ type: "GET_USER_ID", payload: data });
        navigate("/ProfileDetailsPage");
    }

    useEffect(() => {
        if (parentList && parentList.length > 0) {
            parentList.forEach(parent => {
                if (!childrenMap[parent.userUuid]) {
                    dispatch(getChildrenListByPar(parent.userUuid)).then(children => {
                        console.log("Children List for Parent:", parent.userUuid, children);
                        setChildrenMap(prev => ({
                            ...prev,
                            [parent.userUuid]: (children || []).map(child => ({
                                ...child,
                                parentUserUuid: parent.userUuid
                            }))
                        }));
                    });
                }
            });
        }
        // eslint-disable-next-line
    }, [parentList]);

    return (
        <>
            <div className="header">
                <h1>Parents</h1>
                <div className="header-right">
                    <button type="button" className="btn btn-outline-primary" onClick={() => setIsModal(true)}>Create Parent</button>
                </div>
            </div>
            <div className="content-body">
                {loader ?
                    parentList?.length > 0 ?
                        <div className="table-content">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Id</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Children</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parentList?.map((data, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data?.fullName ? data?.fullName : "N/A"}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phoneNo ? data?.phoneNo : "N/A"}</td>
                                            <td>
                                                {childrenMap[data?.userUuid] ? (
                                                    childrenMap[data?.userUuid].length > 0 ? (
                                                        childrenMap[data?.userUuid].map((child, idx) => (
                                                            <a href='#' onClick={() => getAllUserDetails(child?.userUuid)} key={idx}>{child.fullName} {idx != 0 ? "," : ""}</a>
                                                        ))
                                                    ) : (
                                                        <span>No Children</span>
                                                    )
                                                ) : (
                                                    <span>Loading...</span>
                                                )}
                                            </td>
                                            <td>
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
                                <h5 className="modal-title" id="exampleModalLabel"> Create Student</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-content">
                                    <div className="d-flex">
                                        <div className='flex-50 pd-r-5'>
                                            <div className="form-group">
                                                <label className="form-group-label">User Name</label>
                                                <input type="text" className="form-control" name="username" placeholder="Enter Email Id" onChange={(e) => handlerChange(e)} />
                                            </div>
                                        </div>
                                        <div className='flex-50 pd-l-5'>
                                            <div className="form-group">
                                                <label className="form-group-label">Full Name</label>
                                                <input type="text" className="form-control" name="fullName" placeholder="Enter Full Name" onChange={(e) => handlerChange(e)} />
                                            </div>
                                        </div>
                                        <div className='flex-50 pd-r-5'>
                                            <div className="form-group">
                                                <label className="form-group-label">Class Name</label>
                                                <select className="form-control" id="className" name="className" placeholder="Select Class" onChange={(e) => handlerChange(e)}>
                                                    <option value="">Select Class</option>
                                                    {classList?.map((data, index) =>
                                                        <option key={index} id={data?.classUuid} value={data?.className}>{data.className}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex-50 pd-l-5'>
                                            <div className="form-group">
                                                <label className="form-group-label">Section Name</label>
                                                <select className="form-control" id="sectionNames" name="sectionNames" placeholder="Select Section" onChange={(e) => handlerChange(e)}>
                                                    <option value="">Select Section</option>
                                                    {secList?.map((data, index) =>
                                                        <option key={index} id={data?.sectionUuid} value={data?.sectionName}>{data.sectionName}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='flex-100'>
                                            <div className="form-group">
                                                <label className="form-group-label">Student Name</label>
                                                <MultiSelect
                                                    options={options}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy="Select"
                                                    hasSelectAll={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setIsModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => formSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities, getAllUserDetails } from '../Redux/Action/entityAction';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NoDataFound from '../components/NoDataFound';
import Loader from '../components/Loader';


const EntityPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = sessionStorage.getItem("role");

    const { entityList, pageLimit, pageCount, loader } = useSelector(state => state.entityReducer);
    const { classList, secList } = useSelector(state => state.manageClassesReducer);
    const [dataList, setDataList] = useState([]);
    const [inputFields, setInputFields] = useState({
        fullName: "",
        username: "",
        userType: "",
        className: "",
        sectionName: ""
    });

    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");

    useEffect(() => {
        let data = { page, limit }
        dispatch(getEntities(data))
    }, [dispatch]);

    useEffect(() => {
        setDataList(entityList);
        setPage(pageCount);
        setLimit(pageLimit);
    }, [entityList, pageCount, pageLimit]);

    const filterHandler = () => {
        let data = { page, limit, values: inputFields, filter: true, toast }
        dispatch(getEntities(data));
    };

    const getAllUserDetails = (data) => {
        dispatch({ type: "GET_USER_ID", payload: data });
        navigate("/ProfileDetailsPage");
    }

    return (
        <>
            <div className="header">
                <h1>Manage Entity</h1>
            </div>
            <div className="content-body">
                <div className="content-filter">
                    <div className='d-flex'>
                        <div className="flex-16_6 pd-r-5">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={(e) => setInputFields({ ...inputFields, fullName: e.target.value })} placeholder="Full Name" />
                            </div>
                        </div>
                        <div className="flex-16_6 pd-l-5 pd-r-5">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={(e) => setInputFields({ ...inputFields, username: e.target.value })} placeholder="Email" />
                            </div>
                        </div>
                        <div className="flex-16_6 pd-l-5 pd-r-5">
                            <div className="form-group">
                                <select className="form-control" placeholder="Select User Type" onChange={(e) => setInputFields({ ...inputFields, userType: e.target.value })}>
                                    <option value="">Select User Type</option>
                                    <option value="STUDENT">Student</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="PARENT">Parent</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-16_6 pd-l-5 pd-r-5">
                            <div className="form-group">
                                <select className="form-control" name="className" placeholder="Select Class" onChange={(e) => setInputFields({ ...inputFields, className: e.target.value })}>
                                    <option>Select Class</option>
                                    {classList?.map((data, index) =>
                                        <option key={index} value={data?.className}>{data.className}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="flex-16_6 pd-l-5 pd-r-5">
                            <div className="form-group">
                                <select className="form-control" placeholder="Select Section" onChange={(e) => setInputFields({ ...inputFields, sectionName: e.target.value })}>
                                    <option value="">Select Section</option>
                                    {secList?.map((data, index) =>
                                        <option key={index} value={data?.sectionName}>{data.sectionName}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="flex-16_6 pd-l-5">
                            <div className="form-group">
                                <button className="btn btn-block btn-success" onClick={() => filterHandler()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

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
                                        <th scope="col">Type</th>
                                        <th scope="col">Created By</th>
                                        <th scope="col">Created At</th>
                                        <th scop="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList?.map((data, index) =>
                                        <tr key={index}>
                                            <td scope="row">{index + 1}</td>
                                            <td >{data?.fullName ? data?.fullName : "N/A"}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phoneNo ? data?.phoneNo : "N/A"}</td>
                                            <td>{data?.userType}</td>
                                            <td>{data?.createdBy ? data?.createdBy : "N/A"}</td>
                                            <td>{data?.createdAt ? data?.createdAt : "N/A"}</td>
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
            </div>
        </>
    );
};

export default EntityPage;

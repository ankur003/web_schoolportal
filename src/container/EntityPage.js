import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities, getAllUserDetails } from '../Redux/Action/entityAction';
import { useNavigate } from "react-router-dom";


const EntityPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = sessionStorage.getItem("role");

    const { entityList, pageLimit, pageCount, loader } = useSelector(state => state.entityReducer);

    const [dataList, setDataList] = useState([]);
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

    // let inputFields = document.querySelectorAll('.form-control');

    // const filterHandler = (e, param) => {
    //     const values = {};
    //     inputFields.forEach(input => {
    //         values[input.name] = input.value;
    //     });
    //     console.log({ values })
    //     let data = { page, limit, values, filter: true }
    //     dispatch(getEntities(data))
    // };

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
                                    {/* <tr>
                                    <th scope="col"></th>
                                    <th scope="col"><input type='text' name="fullName" onChange={(e) => filterHandler(e, "fullName")} placeholder='Full Name' className='form-control' /></th>
                                    <th scope="col"><input type='text' name="username" onChange={(e) => filterHandler(e, "username")} placeholder='Email' className='form-control' /></th>
                                    <th scope="col"><input type='text' onChange={(e) => filterHandler(e)} placeholder='Phone Number' className='form-control' disabled /></th>
                                    <th scope="col"><input type='text' name="userType" onChange={(e) => filterHandler(e, "userType")} placeholder='User Type' className='form-control' /></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scop="col"></th>
                                </tr> */}
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
                        : <div className="no-data-found">
                            <div className="no-data-image">
                                <img alt='logo' src={require('../assets/images/no-data-found.gif')} />
                            </div>
                            <p>no data found</p>
                        </div>
                    :
                    <div className="loader-content">
                        <div className="no-data-image">
                            <img alt='logo' src={require('../assets/images/loader.gif')} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default EntityPage;

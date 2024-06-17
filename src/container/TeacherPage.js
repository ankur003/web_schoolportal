import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherEntities, createUser } from '../Redux/Action/entityAction';

export default function TeacherPage() {
    const dispatch = useDispatch()

    const { teacherList, pageLimit, pageCount, loader, noDataFound } = useSelector(state => state.entityReducer);
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState("1");
    const [limit, setLimit] = useState("100");
    const [isModal, SetIsModal] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
    });

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
        console.log({ data });
        dispatch(createUser(data, SetIsModal)); // If no property has a non-empty value, return true

    }

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
                                            <th scope="row">{index + 1}</th>
                                            <td>{data?.fullName ? data?.fullName : "N/A"}</td>
                                            <td>{data?.username}</td>
                                            <td>{data?.phoneNo ? data?.phoneNo : "N/A"}</td>
                                            <td>{data?.userType}</td>
                                            <td>{data?.createdBy ? data?.createdBy : "N/A"}</td>
                                            <td>{data?.createdAt ? data?.createdAt : "N/A"}</td>
                                            <td>
                                                <button className="btn btn-success mr-r-4">Edit</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="no-data-found">
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
            </div >

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
        </>
    )
}

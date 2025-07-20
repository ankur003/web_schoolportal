import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, createClassAndSection } from '../../Redux/Action/manageClassAction';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

function ManageClasses(props) {
    const { t, i18n } = useTranslation();
    const { classList, secList, linkList } = useSelector(state => state.manageClassesReducer);
    const dispatch = useDispatch();

    const [active, setActive] = useState("home-tab");
    const [isModal, SetIsModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const [classUuid, setClassUuid] = useState("");
    const [formState, setFormState] = useState({
        className: "",
        sectionName: "",
        linkSectionName: []
    });

    const options = secList ? secList?.map(section => ({
        label: section?.sectionName,
        value: section?.masterSectionUuid
    })) : "";

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    const handlerChange = (e) => {
        setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    };

    const formSubmit = (type) => {
        let sectionID = selected?.map(item => (item?.value));
        let data = { classUuid: classUuid, sectionUuids: [...sectionID],className: formState?.className, sectionName: formState?.sectionName };
        dispatch(createClassAndSection(data, type, toast))
        SetIsModal(false);
    };

    return (
        <>
            <div className="header">
                <h1>{t('manageClasses')}</h1>
                <div className="header-right">

                </div>
            </div>
            <div className="content-body">
                <ul className="nav nav-tabs custom-nav-tab" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onClick={() => setActive("home-tab")}>Classes</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={() => setActive("profile-tab")}>Section</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false" onClick={() => setActive("contact-tab")}>Link Class & Section</button>
                    </li>
                    {active === "home-tab" ?
                        <div className="create-button">
                            <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Create Class Name</button>
                        </div> :
                        active === "profile-tab" && <div className="create-button">
                            <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Create Section</button>
                        </div>
                    }
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="table-content">
                            {classList?.length > 0 ?
                                <table className="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Class Name</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Created At</th>
                                            <th scop="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classList?.map((data, index) =>
                                            <tr key={index}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{data?.className}</td>
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
                                : <Loader />
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <div className="table-content">
                            {secList?.length > 0 ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Section Name</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Created At</th>
                                            <th scop="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {secList?.map((data, index) =>
                                            <tr key={index}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{data?.sectionName}</td>
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
                                : <Loader />
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <div className="table-content">
                            {linkList?.length > 0 ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Class Name</th>
                                            <th scope="col">Section Name</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Created At</th>
                                            <th scop="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {linkList?.map((data, index) =>
                                            <tr key={index}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{data?.className}</td>
                                                <td>{data?.masterSection?.length > 0 ? data?.masterSection?.sort().map((data, index) => <span key={index}>{data?.sectionName + ","}</span>) : "no section linked"}</td>
                                                <td>{data?.createdBy ? data?.createdBy : "N/A"}</td>
                                                <td>{data?.createdAt ? data?.createdAt : "N/A"}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning mr-r-4" onClick={() => { SetIsModal(true); setFormState({ ...formState, className: data?.className }); setClassUuid(data?.masterClassUuid) }}>Link</button>
                                                    <button className="btn btn-success mr-r-4">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                :
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> {active === "home-tab" ? "Create Class" : active === "profile-tab" ? "Create Section" : "Link Class & Section"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => SetIsModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {active === "home-tab" ?
                                    <div className="form-content">
                                        <div className="form-group">
                                            <label className="form-group-label">Class Name</label>
                                            <input type="text" className="form-control" name="className" placeholder="Enter Class Name" onChange={(e) => handlerChange(e)} />
                                        </div>
                                    </div>

                                    : active === "profile-tab" ?
                                        <div className="form-content">
                                            <div className="form-group">
                                                <label className="form-group-label">Section Name</label>
                                                <input type="text" className="form-control" name="sectionName" placeholder="Enter Section Name" onChange={(e) => handlerChange(e)} />
                                            </div>
                                        </div> :
                                        <div className="form-content">
                                            <div className="form-group">
                                                <label className="form-group-label">Class Name</label>
                                                <input type="text" className="form-control" name="className" value={formState?.className} placeholder="Enter Class Name" onChange={(e) => handlerChange(e)} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-group-label">Section Name</label>
                                                <MultiSelect
                                                    options={options}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy="Select"
                                                    hasSelectAll={false}
                                                />
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => SetIsModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => formSubmit(active === "home-tab" ? "CreateClass" : active === "profile-tab" ? "CreateSection" : "LinkClassSection")}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default ManageClasses;
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux';
import {
    getClasses,
    createClassAndSection,
    getSubject,
    getSubjectLinked,
    createSubjectAndLinked
} from '../../Redux/Action/manageClassAction';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import NoDataFound from '../../components/NoDataFound';
import { FilePen, Link, Trash } from 'lucide-react';

function ManageClasses() {
    const { t } = useTranslation();
    const { classList, secList, linkList, subjectList, subjectListLinked } =
        useSelector((state) => state.manageClassesReducer);
    const dispatch = useDispatch();

    const [active, setActive] = useState("home-tab");
    const [isModal, SetIsModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null); // New state for class selection
    const [classUuid, setClassUuid] = useState("");
    const [modalKey, setModalKey] = useState(0); // Force re-render key
    const [isNewLinkage, setIsNewLinkage] = useState(false); // Track if it's new linkage modal
    const [formState, setFormState] = useState({
        className: "",
        sectionName: "",
        linkSectionName: [],
        description: "",
        maxMarks: "",
        minMarks: "",
        subjectName: ""
    });

    // ✅ Section Options
    const options = Array.isArray(secList)
        ? secList.map((section) => ({
            label: section.sectionName,
            value: section.masterSectionUuid,
        }))
        : [];

    // ✅ Class Options for New Linkage
    const classOptions = Array.isArray(classList)
        ? classList.map((cls) => ({
            label: cls.className,
            value: cls.masterClassUuid,
        }))
        : [];

    // ✅ Subject Options with unique values and proper structure
    const SubjectOption = Array.isArray(subjectList)
        ? subjectList.map((subject, index) => ({
            label: subject.subjectName,
            value: subject.subjectId || `subject-${index}`, // Ensure unique values
            disabled: false
        }))
        : [];

    // Debug data integrity
    useEffect(() => {
        // Check for duplicate IDs
        const ids = SubjectOption.map(s => s.value);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        if (duplicates.length > 0) {
            console.warn('Duplicate subject IDs found:', duplicates);
        }
    }, [subjectList, SubjectOption]);

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSubject());
    }, []);

    useEffect(() => {
        dispatch(getSubjectLinked());
    }, []);

    const handlerChange = (e) => {
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle class selection for new linkage
    const handleClassChange = (selectedOption) => {
        setSelectedClass(selectedOption);
        setClassUuid(selectedOption?.value || "");
        setFormState(prev => ({
            ...prev,
            className: selectedOption?.label || ""
        }));
    };

    // ✅ Close Modal and Reset State
    const closeModal = () => {
        SetIsModal(false);
        setSelected([]);
        setSelectedSubject([]);
        setSelectedClass(null);
        setIsNewLinkage(false);
        setModalKey(prev => prev + 1); // Force re-render
        setFormState({
            className: "",
            sectionName: "",
            linkSectionName: [],
            description: "",
            maxMarks: "",
            minMarks: "",
            subjectName: ""
        });
        setClassUuid("");
    };

    const formSubmit = (type) => {
        let sectionID = selected?.map((item) => item?.value);
        let subjectDataName = selectedSubject?.map((item) => item?.label);
        let data = {
            classUuid: classUuid,
            sectionUuids: [...sectionID],
            className: formState?.className,
            sectionName: formState?.sectionName,
        };
        if (type === "createSubject") {
            let subjectData = {
                "description": formState?.description,
                "maxMarks": Number(formState?.maxMarks),
                "passMarks": Number(formState?.minMarks),
                "subjectName": formState?.subjectName,
                "subjectId": null
            }
            dispatch(createSubjectAndLinked(subjectData, type, toast))
        }
        else if (type === "subjectLinkedClass" || type === "newSubjectLinkage") {
            let subjectLinkData = {
                "masterClassUuid": classUuid,
                "masterSectionUuid": sectionID[0],
                "subjectNames": [...subjectDataName]
            }
            dispatch(createSubjectAndLinked(subjectLinkData, type, toast))
        }
        else {
            dispatch(createClassAndSection(data, type, toast));
        }

        closeModal();
    };

    // ✅ FIXED Prefill function with better debugging
    const subjectLinkedModal = (data) => {
        SetIsModal(true);
        setIsNewLinkage(false); // This is editing existing linkage
        setModalKey(prev => prev + 1); // Force fresh render
        setFormState({ ...formState, className: data?.className });
        setClassUuid(data?.masterClassUuid);

        // ✅ Prefill Sections
        if (data?.sectionSubjects?.length > 0) {
            const linkedSectionNames = data.sectionSubjects.map(section => section.sectionName);
            const preSelectedSections = options.filter((opt) =>
                linkedSectionNames.includes(opt.label)
            );
            // Small delay to ensure proper state setting
            setTimeout(() => {
                setSelected([...preSelectedSections]);
            }, 100);
        } else {
            setSelected([]);
        }

        // ✅ Prefill Subjects with improved logic
        if (data?.sectionSubjects?.length > 0) {
            const allSubjects = [];
            data.sectionSubjects.forEach(section => {
                if (section.subjects && section.subjects.length > 0) {
                    section.subjects.forEach(subject => {
                        if (subject.subjectName) {
                            allSubjects.push(subject.subjectName.trim());
                        }
                    });
                }
            });

            const uniqueSubjectNames = [...new Set(allSubjects)];
            const preSelectedSubjects = SubjectOption.filter((opt) => {
                const match = uniqueSubjectNames.includes(opt.label?.trim());
                return match;
            });

            // Small delay to ensure proper state setting
            setTimeout(() => {
                setSelectedSubject([...preSelectedSubjects]);
            }, 150);
        } else {
            setSelectedSubject([]);
        }
    };

    // ✅ New Linkage Modal function
    const openNewLinkageModal = () => {
        SetIsModal(true);
        setIsNewLinkage(true); // This is creating new linkage
        setModalKey(prev => prev + 1); // Force fresh render

        // Reset all states for fresh start
        setSelected([]);
        setSelectedSubject([]);
        setSelectedClass(null);
        setClassUuid("");
        setFormState({
            className: "",
            sectionName: "",
            linkSectionName: [],
            description: "",
            maxMarks: "",
            minMarks: "",
            subjectName: ""
        });
    };

    // Handle subject selection change
    const handleSubjectChange = (newSelection) => {
        // Create a completely new array to force re-render
        const updatedSelection = newSelection ? [...newSelection] : [];
        setSelectedSubject(updatedSelection);
    };

    return (
        <>
            <div className="header">
                <h1>{t('manageClasses')}</h1>
                <div className="header-right"></div>
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
                        <button className="nav-link" id="Subject-tab" data-bs-toggle="tab" data-bs-target="#subject" type="button" role="tab" aria-controls="subject" aria-selected="false" onClick={() => setActive("Subject-tab")}>Subjects</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false" onClick={() => setActive("contact-tab")}>Linked Class & Section</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="subjectLink-tab" data-bs-toggle="tab" data-bs-target="#subjectLink" type="button" role="tab" aria-controls="subjectLink" aria-selected="false" onClick={() => setActive("subjectLink-tab")}>Linked Class & Subject</button>
                    </li>
                    {active === "home-tab" ?
                        <div className="create-button">
                            <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Create Class</button>
                        </div> :
                        active === "profile-tab" ? <div className="create-button">
                            <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Create Section</button>
                        </div>
                            : active === "Subject-tab" ? <div className="create-button">
                                <button type="button" className="btn btn-outline-light" onClick={() => SetIsModal(true)}>Create Subject</button>
                            </div>
                                : active === "subjectLink-tab" && <div className="create-button">
                                    <button type="button" className="btn btn-outline-light" onClick={() => openNewLinkageModal()}>New Linked Subject</button>
                                </div>
                    }
                </ul>

                <div className="tab-content" id="myTabContent">
                    {active === "home-tab" ?
                        (
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
                                                        <button className="btn btn-success mr-r-4">  <FilePen /></button>
                                                        <button className="btn btn-danger"><Trash /></button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    : <NoDataFound />
                                }
                            </div>
                        )
                        : active === "profile-tab" ?
                            (
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
                                                            <button className="btn btn-success mr-r-4">  <FilePen /></button>
                                                            <button className="btn btn-danger"><Trash /></button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        : <NoDataFound />
                                    }
                                </div>
                            )
                            : active === "Subject-tab" ?
                                (
                                    <div className="table-content">
                                        {subjectList?.length > 0 ?
                                            <table className="table  table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Subject Name</th>
                                                        <th scope="col">Description</th>
                                                        <th scop="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subjectList?.map((data, index) =>
                                                        <tr key={index}>
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{data?.subjectName}</td>
                                                            <td>{data?.description ? data?.description : "N/A"}</td>
                                                            <td>
                                                                <button className="btn btn-success mr-r-4">  <FilePen /></button>
                                                                <button className="btn btn-danger"><Trash /></button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            : <NoDataFound />
                                        }
                                    </div>
                                )
                                : active === "subjectLink-tab" ?
                                    (
                                        <div className="table-content">
                                            {subjectListLinked?.length > 0 ?
                                                subjectListLinked?.map((data, index) =>
                                                    <div key={index} className="card mb-3">
                                                        <div className="card-body p-0">
                                                            <div className="card">
                                                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                                                    <span>
                                                                        <strong className="mr-r-5 f-20 text-capitalize">{data?.className}</strong>
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-warning mr-r-4"
                                                                        onClick={() => {
                                                                            subjectLinkedModal(data);
                                                                        }}
                                                                    >
                                                                       <Link />
                                                                    </button>
                                                                </div>

                                                                {/* If class has direct subjects (no sections) */}
                                                                {data?.subjects && data?.subjects?.length > 0 && (
                                                                    <div className="card-body">
                                                                        <table className="table table-bordered mb-0">
                                                                            <thead className="table-secondary">
                                                                                <tr>
                                                                                    <th>Subject Name</th>
                                                                                    <th>Subject Code</th>
                                                                                    <th>Max Marks</th>
                                                                                    <th>Pass Marks</th>
                                                                                    <th>Created At</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {data?.subjects?.map((subject, subjectIdx) =>
                                                                                    <tr key={subjectIdx}>
                                                                                        <td>{subject?.subjectName}</td>
                                                                                        <td>{subject?.subjectCode}</td>
                                                                                        <td>{subject?.maxMarks}</td>
                                                                                        <td>{subject?.passMarks}</td>
                                                                                        <td>{subject?.createdAt}</td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}

                                                                {/* If class has section-based subjects */}
                                                                {data?.sectionSubjects && data?.sectionSubjects?.length > 0 &&
                                                                    data?.sectionSubjects?.map((item, idx) =>
                                                                        <div key={idx} className="card-body">
                                                                            <p className="badge bg-warning">Section - {item?.sectionName}</p>
                                                                            <table className="table table-bordered mb-0">
                                                                                <thead className="table-secondary">
                                                                                    <tr>
                                                                                        <th>Subject Name</th>
                                                                                        <th>Subject Code</th>
                                                                                        <th>Max Marks</th>
                                                                                        <th>Pass Marks</th>
                                                                                        <th>Created At</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {item?.subjects && item?.subjects?.map((subject, subjectIdx) =>
                                                                                        <tr key={subjectIdx}>
                                                                                            <td>{subject?.subjectName}</td>
                                                                                            <td>{subject?.subjectCode}</td>
                                                                                            <td>{subject?.maxMarks}</td>
                                                                                            <td>{subject?.passMarks}</td>
                                                                                            <td>{subject?.createdAt}</td>
                                                                                        </tr>
                                                                                    )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                <NoDataFound />
                                            }
                                        </div>
                                    )
                                    :
                                    active === "contact-tab" &&
                                    (
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
                                                                <td>{data?.masterSection?.length > 0
                                                                    ? data?.masterSection?.sort().map((d, idx) => (
                                                                        <span key={idx}>{d?.sectionName + ","}</span>
                                                                    ))
                                                                    : "no section linked"}
                                                                </td>
                                                                <td>{data?.createdBy ? data?.createdBy : "N/A"}</td>
                                                                <td>{data?.createdAt ? data?.createdAt : "N/A"}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-warning mr-r-4"
                                                                        onClick={() => {
                                                                            SetIsModal(true);
                                                                            setFormState({ ...formState, className: data?.className });
                                                                            setClassUuid(data?.masterClassUuid);

                                                                            // ✅ Pre-select linked sections
                                                                            if (data?.masterSection?.length > 0) {
                                                                                const linkedSectionIds = data.masterSection.map((s) => s.masterSectionUuid);
                                                                                setSelected(options.filter((opt) => linkedSectionIds.includes(opt.value)));
                                                                            } else {
                                                                                setSelected([]);
                                                                            }
                                                                        }}
                                                                    ><Link /></button>
                                                                      <button className="btn btn-success mr-r-4">  <FilePen /></button>
                                                                <button className="btn btn-danger"><Trash /></button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                                :
                                                <NoDataFound />
                                            }
                                        </div>
                                    )
                    }
                </div>
            </div>

            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {active === "home-tab"
                                        ? "Create Class"
                                        : active === "profile-tab"
                                            ? "Create Section"
                                            : active === "Subject-tab"
                                                ? "Create Subject"
                                                : active === "subjectLink-tab"
                                                    ? isNewLinkage ? "New Subject Linkage" : "Edit Subject Linkage"
                                                    : "Link Class & Section"}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModal()}>
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
                                        </div>
                                        : active === "Subject-tab" ?
                                            <div className="form-content">
                                                <div className="form-group">
                                                    <label className="form-group-label">Subject Name</label>
                                                    <input type="text" className="form-control" name="subjectName" placeholder="Enter Subject" onChange={(e) => handlerChange(e)} />
                                                </div>
                                                <div className="d-flex">
                                                    <div className="flex-50 pd-r-10">
                                                        <div className="form-group">
                                                            <label className="form-group-label">Min Marks</label>
                                                            <input type="text" className="form-control" name="minMarks" placeholder="Enter Min Marks" onChange={(e) => handlerChange(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-50 pd-l-10">
                                                        <div className="form-group">
                                                            <label className="form-group-label">Max Marks</label>
                                                            <input type="number" className="form-control" name="maxMarks" placeholder="Enter Max Marks" onChange={(e) => handlerChange(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-100">
                                                        <div className="form-group">
                                                            <label className="form-group-label">Description</label>
                                                            <input type="text" className="form-control" name="description" placeholder="Enter Description" onChange={(e) => handlerChange(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : active === "subjectLink-tab" ?
                                                <div className="form-content" key={modalKey}>
                                                    {/* Class Selection - Only show for new linkage */}
                                                    {isNewLinkage && (
                                                        <div className="form-group">
                                                            <label className="form-group-label">Class Name</label>
                                                            <select
                                                                className="form-control"
                                                                value={selectedClass?.value || ""}
                                                                onChange={(e) => {
                                                                    const selected = classOptions.find(opt => opt.value === e.target.value);
                                                                    handleClassChange(selected);
                                                                }}
                                                            >
                                                                <option value="">Select Class</option>
                                                                {classOptions.map(option => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    {/* Class Name - Read only for existing linkage */}
                                                    {!isNewLinkage && (
                                                        <div className="form-group">
                                                           <label className="form-group-label">Class Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={formState?.className}
                                                                readOnly
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="form-group">
                                                        <label className="form-group-label">Section Name</label>
                                                        <MultiSelect
                                                            key={`section-${modalKey}-${classUuid}`}
                                                            options={options}
                                                            value={selected}
                                                            onChange={setSelected}
                                                            labelledBy="Select Sections"
                                                            hasSelectAll={false}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-group-label">Subject Name</label>
                                                        <MultiSelect
                                                            key={`subject-${modalKey}-${classUuid}`}
                                                            options={SubjectOption}
                                                            value={selectedSubject}
                                                            onChange={handleSubjectChange}
                                                            labelledBy="Select Subjects"
                                                            hasSelectAll={false}
                                                            disableSearch={false}
                                                            closeOnChangedValue={false}
                                                            overrideStrings={{
                                                                selectSomeItems: "Select Subjects...",
                                                                allItemsAreSelected: "All subjects selected",
                                                                selectAll: "Select All",
                                                                search: "Search subjects"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                :
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => formSubmit(
                                        active === "home-tab" ? "CreateClass"
                                            : active === "profile-tab" ? "CreateSection"
                                                : active === "Subject-tab" ? "createSubject"
                                                    : active === "subjectLink-tab"
                                                        ? isNewLinkage ? "newSubjectLinkage" : "subjectLinkedClass"
                                                        : "LinkClassSection"
                                    )}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default ManageClasses;

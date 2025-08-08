import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux';
import {
    getClasses,
    createClassAndSection,
    getSubject,
    getSubjectLinked,
    createSubjectAndLinked,
    getSubjectClassSecList,
    createClassEntities
} from '../../Redux/Action/manageClassAction';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import NoDataFound from '../../components/NoDataFound';
import { FilePen, Link, Trash } from 'lucide-react';
import { Plus, X, GraduationCap, Users, BookOpen, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ManageClasses() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectListLinked, AllClassEntities } = useSelector((state) => state.manageClassesReducer);
    console.log("subjectListLinked", AllClassEntities);
    const [isModal, SetIsModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    console.log({ selectedClass })
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [showSectionInput, setShowSectionInput] = useState(false);
    const [showSubjectInput, setShowSubjectInput] = useState(false);
    const [newSection, setNewSection] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [customSections, setCustomSections] = useState([]);
    const [customSubjects, setCustomSubjects] = useState([]);

    // --- Event handlers (same as your original, unchanged for brevity) ---
    const handleClassChange = (className) => setSelectedClass(className);
    const handleSectionChange = (section) => {
        setSelectedSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
    };
    const handleSubjectChange = (subject) => {
        setSelectedSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]);
    };

    const removeCustomSection = (sectionToRemove) => {
        setCustomSections(prev => prev.filter(section => section !== sectionToRemove));
        setSelectedSections(prev => prev.filter(section => section !== sectionToRemove));
    };
    const removeCustomSubject = (subjectToRemove) => {
        setCustomSubjects(prev => prev.filter(subject => subject !== subjectToRemove));
        setSelectedSubjects(prev => prev.filter(subject => subject !== subjectToRemove));
    };


    useEffect(() => {
        dispatch(getSubjectLinked());
    }, []);

    useEffect(() => {
        dispatch(getSubjectClassSecList());
    }, []);

    const openCreateClassModal = () => {
        // navigate("/CreateAndUpdateClass");

        SetIsModal(true);
    }

    // ✅ Close Modal and Reset State
    const closeModal = () => {
        SetIsModal(false);
    };

    const formSubmit = (type) => {
        let data = {}
        data = {
            masterClassUuid: selectedClass,
            masterSectionUuid: [
                ...selectedSections
            ],
            subjectNames: [
                ...selectedSubjects
            ]
        }
        if (newSection !== "" && newSubject !== "") {
            data = { ...data, sectionName: newSection, subjectNames: [...selectedSubjects, newSubject] }
        }
        else if (newSection !== "") {
            data = { ...data, sectionName: newSection }
        }
        else if (newSubject !== "") {
            data = { ...data, subjectNames: [...selectedSubjects, newSubject] }
        }
        dispatch(createClassEntities(data, toast));
        closeModal();
    };

    return (
        <>
            <div className="header">
                <h1>{t('manageClasses')}</h1>
                <div className="header-right">
                    <div className="create-button">
                        <button type="button" className="btn btn-outline-light" onClick={() => openCreateClassModal()}>Create class</button>
                    </div>
                </div>
            </div>

            <div className="content-body">
                <div className="table-content mb-0">
                    {subjectListLinked?.length > 0 ?
                        subjectListLinked?.map((data, index) =>
                            <div key={index} className={`card ${index === 0 ? 'mb-3' : ''}`}>
                                <div className="card-body p-0">
                                    <div className="card">
                                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong className="mr-r-5 f-20 text-capitalize">Class - {data?.className}</strong>
                                            </span>
                                            {/* <button
                                                type="button"
                                                className="btn btn-warning mr-r-4"
                                                onClick={() => {
                                                    subjectLinkedModal(data);
                                                }}
                                            >
                                                <Link />
                                            </button> */}
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
            </div>

            {isModal &&
                <div className="modal d-block">
                    <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Create Class
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <form className="row g-4 justify-content-center classCreationModal">
                                    {/* Class Selection */}
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="icon-grad-blue rounded-lg d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                                                        <GraduationCap size={24} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <h5 className="card-title mb-1">Select Class</h5>
                                                        <div className="text-muted small">Choose your academic level (You Can Select Only One class at a time)</div>
                                                    </div>
                                                </div>
                                                <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2">
                                                    {AllClassEntities?.masterClasses?.map((data, index) => (
                                                        <div className="col" key={index}>
                                                            <label className={`w-100 position-relative`}>
                                                                <input
                                                                    type="radio"
                                                                    name="class"
                                                                    value={data?.masterClassUuid}
                                                                    checked={selectedClass === data?.masterClassUuid}
                                                                    onChange={() => handleClassChange(data?.masterClassUuid)}
                                                                    className="btn-check"
                                                                    autoComplete="off"
                                                                />
                                                                <span className={`btn checkboxCustom checkbox-blue w-100 py-2 position-relative ${selectedClass === data?.masterClassUuid ? 'activeClass' : ''}`}>
                                                                    {data?.className}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Selection */}
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="icon-grad-green rounded-lg d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                                                            <Users size={22} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <h5 className="card-title mb-1">Select Sections</h5>
                                                            <div className="text-muted small">Choose class sections (You Can Select Multiple Section and Add New section)</div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success checkbox-green d-flex align-items-center"
                                                        onClick={() => setShowSectionInput(v => !v)}
                                                    >
                                                        <Plus size={18} className="me-1" /> Add Section
                                                    </button>
                                                </div>

                                                {showSectionInput &&
                                                    <div className="alert alert-success d-flex align-items-center py-3 mb-4">
                                                        <div className="flex-90">
                                                            <div className="form-group mb-0 pd-r-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control me-2"
                                                                    placeholder="Enter new section name"
                                                                    value={newSection}
                                                                    onChange={e => setNewSection(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex-10 pd-l-10">
                                                            {/* <button type="button" className="btn btn-success me-2" onClick={addSection}>Add</button> */}
                                                            <button type="button" className="btn btn-secondary w-100" onClick={() => { setShowSectionInput(false); setNewSection(''); }}>Cancel</button>
                                                        </div>
                                                    </div>
                                                }

                                                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2">
                                                    {AllClassEntities?.masterSections?.map((data, index) => (
                                                        <div className="col" key={index}>
                                                            <label className="w-100 d-flex align-items-center position-relative checkboxCustom checkbox-green">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input me-2"
                                                                    checked={selectedSections.includes(data?.masterSectionUuid)}
                                                                    onChange={() => handleSectionChange(data?.masterSectionUuid)}
                                                                />
                                                                <span className={`flex-grow-1 ${selectedSections.includes(data.masterSectionUuid) ? 'activeSection' : ''}`}>
                                                                    Section - {data.sectionName}
                                                                </span>
                                                                {customSections.includes(data.masterSectionUuid) &&
                                                                    <button type="button" tabIndex={-1}
                                                                        onClick={e => { e.preventDefault(); removeCustomSection(data.masterSectionUuid); }}
                                                                        className="btn-close ms-2 small"
                                                                        style={{ filter: 'none' }} title="Remove section"
                                                                    />
                                                                }
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject Selection */}
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="icon-grad-pink rounded-lg d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                                                            <BookOpen size={22} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <h5 className="card-title mb-1">Select Subjects</h5>
                                                            <div className="text-muted small">Choose academic subjects (You Can Select Multiple Subject and Add New Subject)</div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary checkbox-pink d-flex align-items-center"
                                                        onClick={() => setShowSubjectInput(v => !v)}
                                                    >
                                                        <Plus size={18} className="me-1" /> Add Subject
                                                    </button>
                                                </div>

                                                {showSubjectInput &&
                                                    <div className="alert alert-primary d-flex align-items-center py-3 mb-4">
                                                        <div className="flex-90  pd-r-10">
                                                            <div className="form-group mb-0">
                                                                <input
                                                                    type="text"
                                                                    className="form-control me-2"
                                                                    placeholder="Enter new subject name"
                                                                    value={newSubject}
                                                                    onChange={e => setNewSubject(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex-10  pd-l-10">
                                                            {/* <button type="button" className="btn btn-primary me-2" onClick={addSubject}>Add</button> */}
                                                            <button type="button" className="btn w-100 btn-secondary" onClick={() => { setShowSubjectInput(false); setNewSubject(''); }}>Cancel</button>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2">
                                                    {AllClassEntities?.masterSubjects?.map((data, index) => (
                                                        <div className="col" key={index}>
                                                            <label className="w-100 d-flex align-items-center position-relative checkboxCustom checkbox-pink ">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input me-2"
                                                                    checked={selectedSubjects.includes(data?.subjectName)}
                                                                    onChange={() => handleSubjectChange(data?.subjectName)}
                                                                />
                                                                <span className={`flex-grow-1 ${selectedSubjects.includes(data?.subjectName) ? 'activeSubject' : ''}`}>
                                                                    {data?.subjectName}
                                                                </span>
                                                                {customSubjects.includes(data?.subjectName) &&
                                                                    <button type="button" tabIndex={-1}
                                                                        onClick={e => { e.preventDefault(); removeCustomSubject(data?.subjectName); }}
                                                                        className="btn-close ms-2 small"
                                                                        style={{ filter: 'none' }}
                                                                        title="Remove subject"
                                                                    />
                                                                }
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    {/* <div className="col-12">
                                        <div className="alert alert-light border shadow-sm">
                                            <div className="row g-3 align-items-center">
                                                <div className="col-md-4">
                                                    <div className="fw-semibold mb-1 text-primary">
                                                        <GraduationCap size={16} className="me-1 text-primary icon-grad" /> Selected Class:
                                                    </div>
                                                    <div className={`badge ${selectedClass ? 'bg-primary text-light' : 'bg-secondary-subtle text-secondary'}`}>
                                                        {selectedClass || 'None selected'}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="fw-semibold mb-1 text-success">
                                                        <Users size={16} className="me-1 text-success" /> Selected Sections: ({selectedSections.length})
                                                    </div>
                                                    <div className={`badge ${selectedSections.length > 0 ? 'bg-success text-light' : 'bg-secondary-subtle text-secondary'}`}>
                                                        {selectedSections.length > 0 ? selectedSections.join(', ') : 'None selected'}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="fw-semibold mb-1 text-primary">
                                                        <BookOpen size={16} className="me-1 text-primary" /> Selected Subjects: ({selectedSubjects.length})
                                                    </div>
                                                    <div className={`badge ${selectedSubjects.length > 0 ? 'bg-primary text-light' : 'bg-secondary-subtle text-secondary'}`}>
                                                        {selectedSubjects.length > 0 ? selectedSubjects.join(', ') : 'None selected'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => formSubmit()}
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

import React, { useState } from 'react';
import { Plus, X, GraduationCap, Users, BookOpen, Check } from 'lucide-react';

const SchoolFormModal = ({ show, onClose }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showSectionInput, setShowSectionInput] = useState(false);
  const [showSubjectInput, setShowSubjectInput] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [customSections, setCustomSections] = useState([]);
  const [customSubjects, setCustomSubjects] = useState([]);

  const classes = [
    'Play School', 'Nursery', 'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];
  const defaultSections = ['Section A', 'Section B', 'Section C', 'Section D', 'Section E'];
  const defaultSubjects = [
    'Mathematics', 'English', 'Hindi', 'Science', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'History', 'Geography',
    'Computer Science', 'Physical Education', 'Art', 'Music'
  ];
  const allSections = [...defaultSections, ...customSections];
  const allSubjects = [...defaultSubjects, ...customSubjects];

  // Handlers (same as before)
  const handleClassChange = (className) => setSelectedClass(className);
  const handleSectionChange = (section) => {
    setSelectedSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };
  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]);
  };
  const addSection = () => {
    if (newSection.trim() && !allSections.includes(newSection.trim())) {
      setCustomSections(prev => [...prev, newSection.trim()]);
      setNewSection('');
      setShowSectionInput(false);
    }
  };
  const addSubject = () => {
    if (newSubject.trim() && !allSubjects.includes(newSubject.trim())) {
      setCustomSubjects(prev => [...prev, newSubject.trim()]);
      setNewSubject('');
      setShowSubjectInput(false);
    }
  };
  const removeCustomSection = (sectionToRemove) => {
    setCustomSections(prev => prev.filter(section => section !== sectionToRemove));
    setSelectedSections(prev => prev.filter(section => section !== sectionToRemove));
  };
  const removeCustomSubject = (subjectToRemove) => {
    setCustomSubjects(prev => prev.filter(subject => subject !== subjectToRemove));
    setSelectedSubjects(prev => prev.filter(subject => subject !== subjectToRemove));
  };
  const handleSubmit = () => {
    alert('Form submitted! Check console for details.');
    console.log({ selectedClass, selectedSections, selectedSubjects });
    onClose();
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{background: 'rgba(0,0,0,0.35)'}}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3" style={{width: 48, height: 48}}>
                <GraduationCap size={28} className="text-white" />
              </div>
              <div>
                <h3 className="modal-title mb-1 fw-bold">Configure School Details</h3>
                <div className="text-secondary small">Fill your academic profile below</div>
              </div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}/>
          </div>
          <div className="modal-body pb-0">
            {/* Step 1: Class */}
            <div className="mb-4">
              <div className="fs-5 fw-bold text-primary mb-2 d-flex align-items-center">
                <span className="badge bg-primary me-2">1</span> Select Class
              </div>
              <div className="row row-cols-2 row-cols-md-4 g-2">
                {classes.map(c => (
                  <div className="col" key={c}>
                    <label className="w-100">
                      <input
                        type="radio"
                        name="class"
                        className="btn-check"
                        checked={selectedClass === c}
                        onChange={() => handleClassChange(c)}
                      />
                      <span
                        className={`btn btn-outline-primary w-100 ${selectedClass === c ? "active fw-bold" : ""}`}>{c}
                        {selectedClass === c && <Check size={16} className="ms-2 text-success" />} 
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Step 2: Section */}
            <div className="mb-4 mt-2">
              <div className="fs-5 fw-bold text-success mb-2 d-flex align-items-center">
                <span className="badge bg-success me-2">2</span> Select Sections
                <button
                  type="button"
                  onClick={() => setShowSectionInput(v => !v)}
                  className="btn btn-outline-success btn-sm ms-3 d-flex align-items-center"
                >
                  <Plus size={16} className="me-1" /> Add Section
                </button>
              </div>
              {showSectionInput &&
                <div className="mb-3 d-flex">
                  <input
                    value={newSection}
                    onChange={e => setNewSection(e.target.value)}
                    className="form-control form-control-sm me-2"
                    placeholder="Add section"
                  />
                  <button type="button" className="btn btn-success btn-sm me-2" onClick={addSection}>Add</button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowSectionInput(false)}>Cancel</button>
                </div>
              }
              <div className="row row-cols-2 row-cols-md-3 g-2">
                {allSections.map(section => (
                  <div className="col" key={section}>
                    <label className="w-100 d-flex align-items-center position-relative">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={selectedSections.includes(section)}
                        onChange={() => handleSectionChange(section)}
                      />
                      <span className={`flex-grow-1 ${selectedSections.includes(section) ? 'fw-bold text-success' : ''}`}>
                        {section}
                      </span>
                      {customSections.includes(section) &&
                        <button type="button" tabIndex={-1}
                          onClick={e => {e.preventDefault(); removeCustomSection(section);}}
                          className="btn-close ms-2 small"
                          style={{filter: 'none'}} title="Remove section"
                        />
                      }
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Step 3: Subjects */}
            <div className="mb-4 mt-2">
              <div className="fs-5 fw-bold text-info mb-2 d-flex align-items-center">
                <span className="badge bg-info me-2">3</span> Select Subjects
                <button
                  type="button"
                  onClick={() => setShowSubjectInput(v => !v)}
                  className="btn btn-outline-info btn-sm ms-3 d-flex align-items-center"
                >
                  <Plus size={16} className="me-1" /> Add Subject
                </button>
              </div>
              {showSubjectInput &&
                <div className="mb-3 d-flex">
                  <input
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    className="form-control form-control-sm me-2"
                    placeholder="Add subject"
                  />
                  <button type="button" className="btn btn-info btn-sm me-2" onClick={addSubject}>Add</button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowSubjectInput(false)}>Cancel</button>
                </div>
              }
              <div className="row row-cols-2 row-cols-md-3 g-2">
                {allSubjects.map(subject => (
                  <div className="col" key={subject}>
                    <label className="w-100 d-flex align-items-center position-relative">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span className={`flex-grow-1 ${selectedSubjects.includes(subject) ? 'fw-bold text-info' : ''}`}>
                        {subject}
                      </span>
                      {customSubjects.includes(subject) &&
                        <button type="button" tabIndex={-1}
                          onClick={e => { e.preventDefault(); removeCustomSubject(subject);}}
                          className="btn-close ms-2 small"
                          style={{filter: 'none'}}
                          title="Remove subject"
                        />
                      }
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Summary */}
            <div className="mt-3 py-2 px-3 bg-light rounded-3">
              <div className="fw-bold mb-1">Summary</div>
              <div><span className="text-primary fw-bold">Class:</span> {selectedClass || <span className="text-secondary">None</span>}</div>
              <div><span className="text-success fw-bold">Sections:</span> {selectedSections.length ? selectedSections.join(', ') : <span className="text-secondary">None</span>}</div>
              <div><span className="text-info fw-bold">Subjects:</span> {selectedSubjects.length ? selectedSubjects.join(', ') : <span className="text-secondary">None</span>}</div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!selectedClass || selectedSections.length === 0 || selectedSubjects.length === 0}
            >
              <Check size={18} className="me-1" /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolFormModal;

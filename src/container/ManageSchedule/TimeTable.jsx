import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, BookOpen, Edit3, Trash2, Plus, Eye, Filter, Search, Save, X, UserCheck } from 'lucide-react';
import axios from 'axios';

const TimetableSystem = () => {
  const [timetables, setTimetables] = useState([]);
  const [teacherTimetables, setTeacherTimetables] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms] = useState(['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab 1', 'Lab 2', 'Gym', 'Art Room']);
  const [userRole] = useState('admin');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [viewMode, setViewMode] = useState('class'); // 'class' or 'teacher'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timetableLoading, setTimetableLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Updated time slots with lunch after 4 periods
  const timeSlots = [
    '08:00 - 08:45',    // Period 1
    '08:45 - 09:30',    // Period 2
    '09:30 - 10:15',    // Period 3
    '10:15 - 11:00',    // Period 4
    '11:00 - 11:45',    // Lunch (not selectable)
    '11:45 - 12:30',    // Period 5
    '12:30 - 13:15',    // Period 6
    '13:15 - 14:00',    // Period 7
    '14:00 - 14:45'     // Period 8
  ];

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  // Enhanced subject color function
  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'subject-math',
      'Maths': 'subject-math',
      'English': 'subject-english',
      'Hindi': 'subject-hindi',
      'Science': 'subject-science',
      'History': 'subject-history',
      'Geography': 'subject-geography',
      'Art': 'subject-art',
      'PE': 'subject-pe',
      'Physics': 'subject-physics',
      'Chemistry': 'subject-chemistry',
      'Biology': 'subject-biology',
      'Computer Science': 'subject-computer',
      'Social Studies': 'subject-social',
      'Music': 'subject-music',
    };
    return colors[subject] || 'subject-default';
  };

  // Fetch all data on component mount
  useEffect(() => {
    initializeData();
  }, []);

  // Fetch timetable based on view mode
  useEffect(() => {
    if (viewMode === 'class' && selectedClass) {
      fetchClassTimetable();
    } else if (viewMode === 'teacher' && selectedTeacher) {
      fetchTeacherTimetable();
    } else {
      setTimetables([]);
      setTeacherTimetables([]);
    }
  }, [selectedClass, selectedSection, selectedTeacher, viewMode]);

  // Initialize all required data
  const initializeData = async () => {
    setLoading(true);
    try {
      const [classesData] = await Promise.all([
        fetchClassesAndSections(),
        fetchTeachers(),
        fetchSubjects()
      ]);

      if (classesData && classesData.length > 0) {
        autoSelectFirstClass(classesData);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-select the first available class
  const autoSelectFirstClass = (classesData) => {
    const firstClass = classesData[0];
    if (firstClass) {
      setSelectedClass(firstClass.value);

      if (firstClass.sections && firstClass.sections.length > 0) {
        const sectionOptions = firstClass.sections.map(section => ({
          label: section.sectionName,
          value: section.masterSectionUuid
        }));
        setSections(sectionOptions);
        setSelectedSection(sectionOptions[0].value);
      } else {
        setSections([]);
        setSelectedSection('');
      }
    }
  };

  // API call to fetch classes and sections
  const fetchClassesAndSections = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/sa/class-section-link');
      const data = response.data;

      const classOptions = data.map(item => ({
        label: item.className,
        value: item.masterClassUuid,
        sections: item.masterSection || []
      }));

      setClasses(classOptions);
      return classOptions;

    } catch (error) {
      console.error('Error fetching classes and sections:', error);
      return [];
    }
  };

  // API call to fetch teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/sa/user?page=1&limit=100&userType=teacher');
      const teachersData = response.data.data || [];

      const teacherOptions = teachersData.map(teacher => ({
        label: teacher.fullName,
        value: teacher.userUuid,
        username: teacher.username,
        phoneNo: teacher.phoneNo
      }));

      setTeachers(teacherOptions);

    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // API call to fetch subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/subjects/list');
      const subjectsData = response.data || [];

      const subjectOptions = subjectsData.map(subject => ({
        label: subject.subjectName,
        value: subject.subjectName,
        description: subject.description
      }));

      setSubjects(subjectOptions);

    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // API call to fetch class timetable
  const fetchClassTimetable = async () => {
    if (!selectedClass) return;

    try {
      setTimetableLoading(true);

      let apiUrl;
      if (selectedSection) {
        apiUrl = `http://localhost:8080/api/v1/timetable/class/${selectedClass}?sectionUuid=${selectedSection}`;
      } else {
        apiUrl = `http://localhost:8080/api/v1/timetable/class/${selectedClass}`;
      }

      console.log('Fetching class timetable from:', apiUrl);

      const response = await axios.get(apiUrl);
      const data = response.data;

      console.log('Class timetable data:', data);

      const transformedData = data.map(item => ({
        id: item.id,
        class: item.className,
        day: item.dayOfWeek,
        timeSlot: `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`,
        subject: item.subjectName,
        teacher: item.teacherName,
        room: item.roomNo,
        masterClassUuid: item.masterClassUuid,
        masterSectionUuid: item.masterSectionUuid,
        teacherUuid: item.teacherUuid,
        teacherTimetableUuid: item.teacherTimetableUuid,
        startTime: item.startTime,
        endTime: item.endTime,
        sectionName: item.sectionName
      }));

      setTimetables(transformedData);

    } catch (error) {
      console.error('Error fetching class timetable:', error);
      setTimetables([]);
    } finally {
      setTimetableLoading(false);
    }
  };

  // Updated API call to fetch teacher timetable using the new endpoint
  const fetchTeacherTimetable = async () => {
    if (!selectedTeacher) return;

    try {
      setTimetableLoading(true);

      console.log(`Fetching teacher timetable for: ${selectedTeacher}`);

      // Use the new API endpoint for teacher timetable
      const response = await axios.get(`http://localhost:8080/api/v1/timetable/teacher/${selectedTeacher}`);
      const data = response.data;

      console.log('Teacher timetable data:', data);

      // The API returns an array of timetable entries directly
      const transformedData = data.map(item => ({
        id: item.id,
        class: item.className,
        day: item.dayOfWeek,
        timeSlot: `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`,
        subject: item.subjectName,
        teacher: item.teacherName,
        room: item.roomNo,
        masterClassUuid: item.masterClassUuid,
        masterSectionUuid: item.masterSectionUuid,
        teacherUuid: item.teacherUuid,
        teacherTimetableUuid: item.teacherTimetableUuid,
        startTime: item.startTime,
        endTime: item.endTime,
        sectionName: item.sectionName
      }));

      setTeacherTimetables(transformedData);

    } catch (error) {
      console.error('Error fetching teacher timetable:', error);
      setTeacherTimetables([]);
    } finally {
      setTimetableLoading(false);
    }
  };

  // Helper function to format time (handle both object and string formats)
  const formatTime = (timeObj) => {
    if (!timeObj) return '';

    if (typeof timeObj === 'string') {
      return timeObj.substring(0, 5); // Extract HH:MM from HH:MM:SS
    }

    if (typeof timeObj === 'object' && timeObj.hour !== undefined) {
      const hour = String(timeObj.hour).padStart(2, '0');
      const minute = String(timeObj.minute).padStart(2, '0');
      return `${hour}:${minute}`;
    }

    return '';
  };

  // Helper function to convert time slot to HH:mm:ss format
  const parseTimeSlotToString = (timeSlot) => {
    try {
      const [startTimeStr, endTimeStr] = timeSlot.split(' - ');

      if (!startTimeStr || !endTimeStr) {
        throw new Error(`Invalid time slot format: ${timeSlot}`);
      }

      const formatTimeString = (time) => {
        const [hour, minute] = time.split(':');
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
      };

      return {
        startTime: formatTimeString(startTimeStr),
        endTime: formatTimeString(endTimeStr)
      };
    } catch (error) {
      console.error('Error parsing time slot:', timeSlot, error);
      throw error;
    }
  };

  // API call to create/update timetable entry
  const saveTimetableEntry = async (formData, isUpdate = false) => {
    try {
      setSaving(true);

      const { startTime, endTime } = parseTimeSlotToString(formData.timeSlot);
      const selectedClassData = classes.find(cls => cls.label === formData.class);
      const selectedTeacherData = teachers.find(teacher => teacher.label === formData.teacher);
      const selectedSectionData = sections.find(section => section.value === selectedSection);

      const payload = {
        className: formData.class,
        dayOfWeek: formData.day,
        startTime: startTime,
        endTime: endTime,
        subjectName: formData.subject,
        teacherName: formData.teacher,
        roomNo: formData.room,
        masterClassUuid: selectedClassData?.value || selectedClass,
        masterSectionUuid: selectedSectionData?.value || selectedSection || null,
        sectionName: selectedSectionData?.label || "",
        teacherUuid: selectedTeacherData?.value || ""
      };

      if (isUpdate && editingEntry?.id) {
        payload.id = editingEntry.id;
        payload.teacherTimetableUuid = editingEntry?.teacherTimetableUuid || "";
      }

      console.log('Payload being sent:', JSON.stringify(payload, null, 2));

      const response = await axios.put('http://localhost:8080/api/v1/timetable', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Save response:', response.data);

      alert(isUpdate ? 'Timetable entry updated successfully!' : 'Timetable entry created successfully!');

      // Refresh appropriate timetable
      if (viewMode === 'class') {
        await fetchClassTimetable();
      } else if (viewMode === 'teacher') {
        await fetchTeacherTimetable();
      }

      return response.data;

    } catch (error) {
      console.error('Error saving timetable entry:', error);
      const errorMessage = error.response?.data?.message || 'Invalid data provided';
      alert(`Error: ${errorMessage}`);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setTimetables([]);
    setTeacherTimetables([]);

    if (mode === 'class') {
      setSelectedTeacher('');
    } else {
      setSelectedClass('');
      setSelectedSection('');
    }
  };

  // Handle class selection change
  const handleClassChange = (classUuid) => {
    setSelectedClass(classUuid);
    setSelectedSection('');
    setTimetables([]);

    const selectedClassData = classes.find(cls => cls.value === classUuid);
    if (selectedClassData && selectedClassData.sections) {
      const sectionOptions = selectedClassData.sections.map(section => ({
        label: section.sectionName,
        value: section.masterSectionUuid
      }));
      setSections(sectionOptions);

      if (sectionOptions.length > 0) {
        setSelectedSection(sectionOptions[0].value);
      }
    } else {
      setSections([]);
    }
  };

  // Handle section selection change
  const handleSectionChange = (sectionUuid) => {
    setSelectedSection(sectionUuid);
  };

  // Handle teacher selection change
  const handleTeacherChange = (teacherUuid) => {
    console.log('Teacher selected:', teacherUuid);
    setSelectedTeacher(teacherUuid);
    setTeacherTimetables([]);
  };

  const [formData, setFormData] = useState({
    class: '',
    day: '',
    timeSlot: '',
    subject: '',
    teacher: '',
    room: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.class || !formData.day || !formData.timeSlot || !formData.subject || !formData.teacher || !formData.room) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await saveTimetableEntry(formData, !!editingEntry);
      resetForm();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      class: entry.class,
      day: entry.day,
      timeSlot: entry.timeSlot,
      subject: entry.subject,
      teacher: entry.teacher,
      room: entry.room
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const currentTimetables = viewMode === 'class' ? timetables : teacherTimetables;
      const filteredTimetables = currentTimetables.filter(item => item.id !== id);

      if (viewMode === 'class') {
        setTimetables(filteredTimetables);
      } else {
        setTeacherTimetables(filteredTimetables);
      }
    }
  };

  const handleAddToSlot = (day, timeSlot) => {
    const selectedClassName = classes.find(cls => cls.value === selectedClass)?.label || '';
    setFormData({
      class: selectedClassName,
      day: day,
      timeSlot: timeSlot,
      subject: '',
      teacher: '',
      room: ''
    });
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      class: '',
      day: '',
      timeSlot: '',
      subject: '',
      teacher: '',
      room: ''
    });
    setEditingEntry(null);
    setIsModalOpen(false);
  };

  const renderTimetableGrid = (data, title, showAddButtons = false) => {
    const grid = {};

    // Initialize grid
    days.forEach(day => {
      grid[day] = {};
      timeSlots.forEach(slot => {
        grid[day][slot] = null;
      });
    });

    // Fill grid with data
    data.forEach(item => {
      if (grid[item.day]) {
        grid[item.day][item.timeSlot] = item;
      }
    });

    return (
      <div className="timetable-container">
        <h3 className="timetable-title">{title}</h3>
        <div className="timetable-overflow">
          <div className="timetable-grid">
            {/* Header */}
            <div className="timetable-header-cell">
              Time
            </div>
            {days.map(day => (
              <div key={day} className="timetable-header-cell">
                {day.charAt(0) + day.slice(1).toLowerCase()}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map(slot => (
              <React.Fragment key={slot}>
                <div className="timetable-time-cell">
                  {slot}
                </div>
                {days.map(day => {
                  const entry = grid[day][slot];
                  const isLunch = slot === '11:00 - 11:45';

                  return (
                    <div key={`${day}-${slot}`} className="timetable-slot">
                      {isLunch ? (
                        <div className="break-cell">
                          Lunch
                        </div>
                      ) : entry ? (
                        <div className={`subject-cell ${getSubjectColor(entry.subject)} ${showAddButtons ? 'editable' : ''}`}>
                          <div className="subject-name">{entry.subject}</div>
                          <div className="teacher-name">{entry.teacher}</div>
                          <div className="room-name">{entry.room}</div>
                          {entry.sectionName && viewMode === 'teacher' && (
                            <div className="section-name">Section: {entry.sectionName}</div>
                          )}
                          {entry.class && viewMode === 'teacher' && (
                            <div className="class-name">Class: {entry.class}</div>
                          )}
                          {showAddButtons && (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEdit(entry)}
                                className="edit-btn"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() => handleDelete(entry.id)}
                                className="delete-btn"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="empty-cell">
                          {showAddButtons ? (
                            <button
                              onClick={() => handleAddToSlot(day, slot)}
                              className="add-slot-btn"
                            >
                              <Plus size={16} className="add-icon" />
                              <span className="add-text">Add Class</span>
                            </button>
                          ) : (
                            <span className="free-text">Free</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getCurrentTitle = () => {
    if (viewMode === 'teacher') {
      const teacherName = teachers.find(t => t.value === selectedTeacher)?.label || 'Teacher';
      return `${teacherName}'s Timetable`;
    } else {
      const className = classes.find(cls => cls.value === selectedClass)?.label || 'Class';
      const sectionName = sections.find(sec => sec.value === selectedSection)?.label || 'Section';

      if (selectedSection) {
        return `${className} - ${sectionName} Timetable`;
      } else {
        return `${className} Timetable`;
      }
    }
  };

  if (loading) {
    return (
      <div className="timetable-system">
        <div className="container">
          <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <div>Loading timetable data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <h1>Time Table's</h1>
      </div>
      <div className="content-body">
        {/* Compact Single Row Filters */}
        <div className="filters-section">
          <div className="filters-content">
            {/* View Mode Toggle */}
            <div className="filter-item">
              <label className="filter-label">View Type</label>
              <div className="view-mode-buttons">
                <button
                  className={`view-mode-btn ${viewMode === 'class' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('class')}
                >
                  <BookOpen size={14} />
                  Class
                </button>
                <button
                  className={`view-mode-btn ${viewMode === 'teacher' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('teacher')}
                >
                  <UserCheck size={14} />
                  Teacher
                </button>
              </div>
            </div>

            {/* Dynamic Filters based on View Mode */}
            {viewMode === 'class' ? (
              <>
                <div className="filter-item">
                  <label className="filter-label">Class</label>
                  <select
                    className="filter-select"
                    value={selectedClass}
                    onChange={(e) => handleClassChange(e.target.value)}
                  >
                    <option value="">Choose class...</option>
                    {classes.map(cls => (
                      <option key={cls.value} value={cls.value}>{cls.label}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-item">
                  <label className="filter-label">Section</label>
                  <select
                    className="filter-select"
                    value={selectedSection}
                    onChange={(e) => handleSectionChange(e.target.value)}
                    disabled={!selectedClass || sections.length === 0}
                  >
                    <option value="">Choose section...</option>
                    {sections.map(section => (
                      <option key={section.value} value={section.value}>{section.label}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="filter-item">
                <label className="filter-label">Teacher</label>
                <select
                  className="filter-select"
                  value={selectedTeacher}
                  onChange={(e) => handleTeacherChange(e.target.value)}
                >
                  <option value="">Choose teacher...</option>
                  {teachers.map(teacher => (
                    <option key={teacher.value} value={teacher.value}>{teacher.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Main Timetable View */}
        {((viewMode === 'class' && selectedClass) || (viewMode === 'teacher' && selectedTeacher)) ? (
          <>
            {timetableLoading ? (
              <div className="timetable-container">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                  <div>Loading timetable...</div>
                </div>
              </div>
            ) : (
              renderTimetableGrid(
                viewMode === 'class' ? timetables : teacherTimetables,
                getCurrentTitle(),
                userRole === 'admin'
              )
            )}
          </>
        ) : (
          <div className="timetable-container">
            <div className="no-selection">
              <p>
                {viewMode === 'class'
                  ? 'Please select a class to view timetable'
                  : 'Please select a teacher to view timetable'
                }
              </p>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && userRole === 'admin' && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingEntry ? 'Edit Timetable Entry' : 'Add Timetable Entry'}
                </h3>
                <button
                  onClick={resetForm}
                  className="close-button"
                  disabled={saving}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.value} value={cls.label}>{cls.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Day</label>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Day</option>
                    {days.map(day => (
                      <option key={day} value={day}>{day.charAt(0) + day.slice(1).toLowerCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.filter(slot => slot !== '11:00 - 11:45').map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.value} value={subject.value} title={subject.description}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Teacher</label>
                  <select
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.value} value={teacher.label} title={teacher.username}>
                        {teacher.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Room</label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    onClick={handleSubmit}
                    className="submit-button"
                    disabled={saving}
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : (editingEntry ? 'Update' : 'Add') + ' Entry'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="cancel-button"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    </>
  );
};

export default TimetableSystem;

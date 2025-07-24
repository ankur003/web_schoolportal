import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, BookOpen, Edit3, Trash2, Plus, Eye, Filter, Search, Save, X, UserCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PARENT, STUDENT, SUPER_ADMIN, TEACHER } from '../../Redux/Constants';
import { useNavigate } from 'react-router-dom';
import { getAllDetrails } from '../../Redux/Action/entityAction';

const TimetableSystem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationRole = sessionStorage.getItem("role");
  const { userId } = useSelector((state) => state.loginReducer);
  const { classAndSectionName, userDetails } = useSelector(state => state.entityReducer);
  console.log({ applicationRole, classAndSectionName });
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
  const [deleting, setDeleting] = useState(null);

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

  useEffect(() => {
    if (applicationRole === STUDENT) {
      dispatch(getAllDetrails(userId, null));
      setViewMode('class');
    }
  }, [])

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
      const [classesData, teachersData] = await Promise.all([
        fetchClassesAndSections(),
        fetchTeachers(),
        fetchSubjects()
      ]);

      if (classesData && classesData.length > 0) {
        autoSelectFirstClass(classesData);
      }

      // Store teachers data for later use in view mode change
      if (teachersData && teachersData.length > 0) {
        setTeachers(teachersData);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-select the first available class
  const autoSelectFirstClass = (classesData) => {
    console.log({ classesData });
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

  // Auto-select the first available teacher
  const autoSelectFirstTeacher = (teachersData) => {
    if (teachersData && teachersData.length > 0) {
      const firstTeacher = teachersData[0];
      setSelectedTeacher(firstTeacher.value);
      console.log('Auto-selected first teacher:', firstTeacher.label, firstTeacher.value);
    }
  };

  // API call to fetch classes and sections
  const fetchClassesAndSections = async () => {
    if (applicationRole === PARENT || applicationRole === SUPER_ADMIN || applicationRole === STUDENT) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/sa/class-section-link');
        let data = response.data;
        console.log({ data })
        console.log({ userDetails })
        if (applicationRole === PARENT || applicationRole === STUDENT) {
          let filterClassname = applicationRole === STUDENT ? userDetails?.className : classAndSectionName?.classname;
          let filterSectionname = applicationRole === STUDENT ? userDetails?.sectionName : classAndSectionName?.sectionname;
          console.log("parents")
          const classLi = data
            .filter(item => item.className === filterClassname)
            .map(item => ({
              ...item,
              masterSection: item.masterSection.filter(section => section.sectionName === filterSectionname)
            }));
          console.log({ classList: classLi })
          data = classLi;
        }

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
    }
  };

  // API call to fetch teachers
  const fetchTeachers = async () => {
    if (applicationRole !== PARENT) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/sa/user?page=1&limit=100&userType=teacher');
        const teachersData = response.data.data || [];

        const teacherOptions = teachersData.map(teacher => ({
          label: teacher.fullName,
          value: teacher.userUuid,
          username: teacher.username,
          phoneNo: teacher.phoneNo
        }));

        return teacherOptions; // Return the data instead of setting state here

      } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
      }
    }
  };

  // API call to fetch subjects
  const fetchSubjects = async () => {
    if (applicationRole === SUPER_ADMIN) {
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
    let url = "";
    try {
      setSaving(true);

      const { startTime, endTime } = parseTimeSlotToString(formData.timeSlot);
      const selectedClassData = classes.find(cls => cls.label === formData.class);
      const selectedTeacherData = teachers.find(teacher => teacher.label === formData.teacher);

      // Find section data based on class and section name
      let selectedSectionData = null;
      if (formData.section && selectedClassData) {
        const classWithSections = classes.find(cls => cls.value === selectedClassData.value);
        if (classWithSections && classWithSections.sections) {
          selectedSectionData = classWithSections.sections.find(section => section.sectionName === formData.section);
        }
      }

      const payload = {
        className: formData.class,
        dayOfWeek: formData.day,
        startTime: startTime,
        endTime: endTime,
        subjectName: formData.subject,
        teacherName: formData.teacher,
        roomNo: formData.room,
        masterClassUuid: selectedClassData?.value || selectedClass,
        masterSectionUuid: selectedSectionData?.masterSectionUuid || selectedSection || "",
        sectionName: formData.section || "",
        teacherUuid: selectedTeacherData?.value || ""
      };

      console.log({ payload })

      if (isUpdate && editingEntry?.id) {
        url = `http://localhost:8080/api/v1/timetable?id=${editingEntry?.id}`;
        payload.teacherTimetableUuid = editingEntry?.teacherTimetableUuid || "";
      }
      else {
        url = `http://localhost:8080/api/v1/timetable`;
      }

      console.log('Payload being sent:', JSON.stringify(payload, null, 2));

      const response = await axios.put(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Save response:', response.data);

      toast.success(isUpdate ? 'Timetable entry updated successfully!' : 'Timetable entry created successfully!');

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
      toast.error(`Error: ${errorMessage}`);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // API call to delete timetable entry
  const deleteTimetableEntry = async (entryId) => {
    try {
      setDeleting(entryId);

      const deleteUrl = `http://localhost:8080/api/v1/timetable/${entryId}`;
      console.log('Deleting timetable entry from:', deleteUrl);

      const response = await axios.delete(deleteUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Delete response:', response.data);
      toast.success('Timetable entry deleted successfully!');

      // Refresh appropriate timetable after successful deletion
      if (viewMode === 'class') {
        await fetchClassTimetable();
      } else if (viewMode === 'teacher') {
        await fetchTeacherTimetable();
      }

      return response.data;

    } catch (error) {
      console.error('Error deleting timetable entry:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete timetable entry';
      toast.error(`Error: ${errorMessage}`);
      throw error;
    } finally {
      setDeleting(null);
    }
  };

  // Updated handle view mode change with auto-selection
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setTimetables([]);
    setTeacherTimetables([]);

    if (mode === 'class') {
      // Switching to class view - reset teacher and auto-select first class if available
      setSelectedTeacher('');
      if (classes.length > 0 && !selectedClass) {
        autoSelectFirstClass(classes);
      }
    } else {
      // Switching to teacher view - reset class/section and auto-select first teacher
      setSelectedClass('');
      setSelectedSection('');
      setSections([]);

      // Auto-select first teacher if available
      if (teachers.length > 0) {
        autoSelectFirstTeacher(teachers);
      }
    }
  };

  useEffect(() => {
    if (applicationRole === "TEACHER") {
      autoSelectFirstTeacher(userId);
      setViewMode("teacher");
      setSelectedTeacher(userId);
    }
  }, [])

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

  // Handle teacher selection change - now changeable
  const handleTeacherChange = (teacherUuid) => {
    console.log('Teacher selected:', teacherUuid);
    setSelectedTeacher(teacherUuid);
    setTeacherTimetables([]); // Clear current timetable data
  };

  const [formData, setFormData] = useState({
    class: '',
    section: '',
    day: '',
    timeSlot: '',
    subject: '',
    teacher: '',
    room: ''
  });

  const [modalSections, setModalSections] = useState([]);

  // Updated handleInputChange function with proper section handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If class changes in modal, update available sections
    if (name === 'class') {
      const selectedClassData = classes.find(cls => cls.label === value);
      if (selectedClassData && selectedClassData.sections) {
        setModalSections(selectedClassData.sections.map(section => ({
          label: section.sectionName,
          value: section.sectionName
        })));
      } else {
        setModalSections([]);
      }
      // Reset section when class changes
      setFormData(prev => ({ ...prev, section: '' }));
    }
  };

  const handleSubmit = async () => {
    console.log({ formData })
    if (!formData.class || !formData.day || !formData.timeSlot || !formData.subject || !formData.teacher || !formData.room) {
      toast.info('Please fill in all fields');
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

    // Set form data
    setFormData({
      class: entry.class,
      section: entry.sectionName || '',
      day: entry.day,
      timeSlot: entry.timeSlot,
      subject: entry.subject,
      teacher: entry.teacher,
      room: entry.room
    });

    // Set available sections for the selected class
    const selectedClassData = classes.find(cls => cls.label === entry.class);
    if (selectedClassData && selectedClassData.sections) {
      setModalSections(selectedClassData.sections.map(section => ({
        label: section.sectionName,
        value: section.sectionName
      })));
    } else {
      setModalSections([]);
    }

    setIsModalOpen(true);
  };

  // Updated handleDelete function to use API
  const handleDelete = async (entry) => {
    const entryId = entry.id || entry.teacherTimetableUuid;

    if (!entryId) {
      toast.error('Unable to delete: Entry ID not found');
      return;
    }

    if (window.confirm('Are you sure you want to delete this timetable entry?')) {
      try {
        await deleteTimetableEntry(entry.teacherTimetableUuid);
      } catch (error) {
        console.error('Delete error:', error);
        // Error toast is already shown in deleteTimetableEntry function
      }
    }
  };

  const handleAddToSlot = (day, timeSlot) => {
    let selectedClassName = '';
    let selectedSectionName = '';
    let selectedTeacherName = '';

    if (viewMode === 'class') {
      selectedClassName = classes.find(cls => cls.value === selectedClass)?.label || '';
      selectedSectionName = sections.find(sec => sec.value === selectedSection)?.label || '';
    } else if (viewMode === 'teacher') {
      selectedTeacherName = teachers.find(t => t.value === selectedTeacher)?.label || '';
    }

    setFormData({
      class: selectedClassName,
      section: selectedSectionName,
      day: day,
      timeSlot: timeSlot,
      subject: '',
      teacher: selectedTeacherName,
      room: ''
    });

    // Set available sections for the selected class
    if (selectedClassName) {
      const selectedClassData = classes.find(cls => cls.label === selectedClassName);
      if (selectedClassData && selectedClassData.sections) {
        setModalSections(selectedClassData.sections.map(section => ({
          label: section.sectionName,
          value: section.sectionName
        })));
      } else {
        setModalSections([]);
      }
    } else {
      setModalSections([]);
    }

    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      class: '',
      section: '',
      day: '',
      timeSlot: '',
      subject: '',
      teacher: '',
      room: ''
    });
    setModalSections([]);
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
                          {(applicationRole === SUPER_ADMIN && showAddButtons) && (
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEdit(entry)}
                                className="edit-btn"
                                disabled={deleting === (entry.id || entry.teacherTimetableUuid)}
                                title="Edit Entry"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() => handleDelete(entry)}
                                className="delete-btn"
                                disabled={deleting === (entry.id || entry.teacherTimetableUuid)}
                                title="Delete Entry"
                              >
                                {deleting === (entry.id || entry.teacherTimetableUuid) ? (
                                  <div className="spinner" style={{ width: '12px', height: '12px' }}></div>
                                ) : (
                                  <Trash2 size={12} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="empty-cell">
                          {applicationRole === SUPER_ADMIN ?
                            <>
                              {showAddButtons ? (
                                <button
                                  onClick={() => handleAddToSlot(day, slot)}
                                  className="add-slot-btn"
                                >
                                  <Plus size={16} className="add-icon" />
                                </button>
                              ) : (
                                <span className="free-text">Free</span>
                              )}
                            </>
                            :
                            <span className="free-text">Free</span>
                          }
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
        <div className="header-right">
          {applicationRole === PARENT &&
            <button type="button" className="btn btn-outline-light" onClick={() => { navigate("/StudentPage") }}>Back</button>
          }
        </div>
      </div>
      <div className="content-body">
        {/* Compact Single Row Filters */}
        {applicationRole === SUPER_ADMIN &&
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
        }

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

        {/* FIXED Modal with Proper Section Selectability */}
        {isModalOpen && userRole === 'admin' && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingEntry ? 'Edit Timetable Entry' : 'Add Timetable Entry'}
                  <span className="modal-context">
                    ({viewMode === 'class' ? 'Class View' : 'Teacher View'})
                  </span>
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
                <div className="d-flex">
                  <div className="flex-50 pd-r-10">
                    {/* Class Field */}
                    <div className="form-group">
                      <label className="form-label">Class</label>
                      <select
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving || (viewMode === 'class')} // Read-only for class view
                      >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                          <option key={cls.value} value={cls.label}>{cls.label}</option>
                        ))}
                      </select>
                      {viewMode === 'class' && (
                        <small className="form-help">Class is fixed in class view</small>
                      )}
                    </div>
                  </div>
                  <div className="flex-50 pd-l-10">
                    {/* FIXED Section Field - Now properly selectable for teacher view */}
                    <div className="form-group">
                      <label className="form-label">Section</label>
                      <select
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving || (viewMode === 'class')} // Only disabled for class view and when saving
                      >
                        <option value="">Select Section</option>
                        {modalSections.map(section => (
                          <option key={section.value} value={section.value}>{section.label}</option>
                        ))}
                      </select>
                      {viewMode === 'class' ? (
                        <small className="form-help">Section is fixed in class view</small>
                      ) : (
                        !formData.class && (
                          <small className="form-help">Select a class first to view sections</small>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex-50 pd-r-10">
                    {/* Day Field */}
                    <div className="form-group">
                      <label className="form-label">Day</label>
                      <select
                        name="day"
                        value={formData.day}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving || (viewMode === 'class') || (viewMode === 'teacher')} // Read-only for both views
                      >
                        <option value="">Select Day</option>
                        {days.map(day => (
                          <option key={day} value={day}>{day.charAt(0) + day.slice(1).toLowerCase()}</option>
                        ))}
                      </select>
                      <small className="form-help">Day is fixed when adding from timetable slot</small>
                    </div>
                  </div>
                  <div className="flex-50 pd-l-10">
                    {/* Time Slot Field */}
                    <div className="form-group">
                      <label className="form-label">Time Slot</label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving || (viewMode === 'class') || (viewMode === 'teacher')} // Read-only for both views
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.filter(slot => slot !== '11:00 - 11:45').map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <small className="form-help">Time slot is fixed when adding from timetable slot</small>
                    </div>
                  </div>
                  <div className="flex-50 pd-r-10">
                    {/* Teacher Field */}
                    <div className="form-group">
                      <label className="form-label">Teacher</label>
                      <select
                        name="teacher"
                        value={formData.teacher}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving || (viewMode === 'teacher')} // Read-only for teacher view
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                          <option key={teacher.value} value={teacher.label} title={teacher.username}>
                            {teacher.label}
                          </option>
                        ))}
                      </select>
                      {viewMode === 'teacher' && (
                        <small className="form-help">Teacher is fixed in teacher view</small>
                      )}
                    </div>
                  </div>
                  <div className="flex-50 pd-l-10">
                    {/* Subject Field */}
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
                  </div>
                  <div className="flex-100">
                    {/* Room Field */}
                    <div className="form-group">
                      <label className="form-label">Room</label>
                      <input
                        type="text"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                        disabled={saving}
                      />
                    </div>
                  </div>
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

      {/* Add spinner CSS */}
      <style jsx="true">{`
        .spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-context {
          font-size: 14px;
          font-weight: normal;
          color: #6b7280;
          margin-left: 8px;
        }

        .form-help {
          display: block;
          margin-top: 4px;
          color: #6b7280;
          font-size: 12px;
          font-style: italic;
        }

        .form-select:disabled {
          background-color: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </>
  );
};

export default TimetableSystem;

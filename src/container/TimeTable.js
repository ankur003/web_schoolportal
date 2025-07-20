import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, BookOpen, Edit3, Trash2, Plus, Eye, Filter, Search, Save, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const TimetableSystem = () => {
    const userRole = useSelector(state => state.loginReducer.role);
    console.log({ userRole })
    const [timetables, setTimetables] = useState([]);
    const [classes, setClasses] = useState(['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']);
    const [teachers, setTeachers] = useState(['Mr. Smith', 'Ms. Johnson', 'Dr. Brown', 'Mrs. Davis', 'Prof. Wilson']);
    const [subjects, setSubjects] = useState(['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art', 'PE']);
    const [rooms, setRooms] = useState(['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab 1', 'Lab 2', 'Gym', 'Art Room']);
    // const [userRole, setUserRole] = useState('SUPER_ADMIN'); // 'SUPER_ADMIN', 'teacher', 'student'
    const [selectedClass, setSelectedClass] = useState('Class 1');
    const [selectedTeacher, setSelectedTeacher] = useState('Mr. Smith');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const timeSlots = [
        '08:00 - 08:45',
        '08:45 - 09:30',
        '09:30 - 10:15',
        '10:15 - 10:30',
        '10:30 - 11:15',// Break
        '11:15 - 12:00',
        '12:00 - 12:45',
        '12:45 - 13:30',
        '13:30 - 14:15'
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Sample initial data
    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                class: 'Class 1',
                day: 'Monday',
                timeSlot: '08:00 - 08:45',
                subject: 'Mathematics',
                teacher: 'Mr. Smith',
                room: 'Room 101'
            },
            {
                id: 2,
                class: 'Class 1',
                day: 'Monday',
                timeSlot: '08:45 - 09:30',
                subject: 'English',
                teacher: 'Ms. Johnson',
                room: 'Room 102'
            },
            {
                id: 3,
                class: 'Class 1',
                day: 'Tuesday',
                timeSlot: '08:00 - 08:45',
                subject: 'Science',
                teacher: 'Dr. Brown',
                room: 'Lab 1'
            },
            {
                id: 4,
                class: 'Class 1',
                day: 'Wednesday',
                timeSlot: '09:30 - 10:15',
                subject: 'History',
                teacher: 'Mrs. Davis',
                room: 'Room 201'
            },
            {
                id: 5,
                class: 'Class 2',
                day: 'Tuesday',
                timeSlot: '08:00 - 08:45',
                subject: 'Science',
                teacher: 'Dr. Brown',
                room: 'Lab 1'
            }
        ];
        setTimetables(sampleData);
    }, []);

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

    const handleSubmit = () => {
        // Basic validation
        if (!formData.class || !formData.day || !formData.timeSlot || !formData.subject || !formData.teacher || !formData.room) {
            alert('Please fill in all fields');
            return;
        }

        if (editingEntry) {
            setTimetables(timetables.map(item =>
                item.id === editingEntry.id ? { ...formData, id: editingEntry.id } : item
            ));
        } else {
            const newEntry = {
                ...formData,
                id: Date.now()
            };
            setTimetables([...timetables, newEntry]);
        }
        resetForm();
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setFormData(entry);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            setTimetables(timetables.filter(item => item.id !== id));
        }
    };

    const handleAddToSlot = (day, timeSlot) => {
        setFormData({
            class: selectedClass,
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

    const getClassTimetable = (className) => {
        return timetables.filter(item => item.class === className);
    };

    const getTeacherTimetable = (teacherName) => {
        return timetables.filter(item => item.teacher === teacherName);
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'Mathematics': 'subject-math',
            'English': 'subject-english',
            'Science': 'subject-science',
            'History': 'subject-history',
            'Geography': 'subject-geography',
            'Art': 'subject-art',
            'PE': 'subject-pe'
        };
        return colors[subject] || 'subject-default';
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
                                {day}
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
                                    const isBreak = slot === '10:30 - 11:15'
                                        // || slot === '12:45 - 13:30'
                                        ;

                                    return (
                                        <div key={`${day}-${slot}`} className="timetable-slot">
                                            {isBreak ? (
                                                <div className="break-cell">
                                                    {slot === '10:30 - 11:15' ? 'Lunch' : 'Beak'}
                                                </div>
                                            ) : entry ? (
                                                <div className={`subject-cell ${getSubjectColor(entry.subject)} ${showAddButtons ? 'editable' : ''}`}>
                                                    <div className="subject-name">{entry.subject}</div>
                                                    <div className="teacher-name">{entry.teacher}</div>
                                                    <div className="room-name">{entry.room}</div>
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

    const getCurrentViewData = () => {
        switch (userRole) {
            case 'SUPER_ADMIN':
                return getClassTimetable(selectedClass);
            case 'teacher':
                return getTeacherTimetable(selectedTeacher);
            case 'student':
                return getClassTimetable(selectedClass);
            default:
                return [];
        }
    };

    const getCurrentTitle = () => {
        switch (userRole) {
            case 'SUPER_ADMIN':
                return `${selectedClass}`;
            case 'teacher':
                return `${selectedTeacher}`;
            case 'student':
                return `${selectedClass}`;
            default:
                return 'Timetable';
        }
    };

    return (
        <>
            <div className="header">
                <h1>Timetable Management</h1>
            </div>
            <div className="content-body">
                <div className="content-filter">
                    <div className='d-flex'>
                        {userRole === 'SUPER_ADMIN' && (
                            <div className="flex-25 pd-l-5 pd-r-5">
                                <div className="form-group">

                                    <>
                                        <select
                                            className="form-control"
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                        >
                                            {classes.map(cls => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                    </>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="timetable-system">
                    <>
                        {/* Main Timetable View */}
                        {renderTimetableGrid(
                            getCurrentViewData(),
                            getCurrentTitle(),
                            userRole === 'SUPER_ADMIN'
                        )}

                        {/* Modal */}
                        {isModalOpen && userRole === 'SUPER_ADMIN' && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title">
                                            {editingEntry ? 'Edit Timetable Entry' : 'Add Timetable Entry'}
                                        </h3>
                                        <button
                                            onClick={resetForm}
                                            className="close-button"
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
                                            >
                                                <option value="">Select Class</option>
                                                {classes.map(cls => (
                                                    <option key={cls} value={cls}>{cls}</option>
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
                                            >
                                                <option value="">Select Day</option>
                                                {days.map(day => (
                                                    <option key={day} value={day}>{day}</option>
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
                                            >
                                                <option value="">Select Time Slot</option>
                                                {timeSlots.filter(slot => slot !== '10:15 - 10:30' && slot !== '12:45 - 13:30').map(slot => (
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
                                            >
                                                <option value="">Select Subject</option>
                                                {subjects.map(subject => (
                                                    <option key={subject} value={subject}>{subject}</option>
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
                                            >
                                                <option value="">Select Teacher</option>
                                                {teachers.map(teacher => (
                                                    <option key={teacher} value={teacher}>{teacher}</option>
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
                                            >
                                                <Save size={16} />
                                                {editingEntry ? 'Update' : 'Add'} Entry
                                            </button>
                                            <button
                                                onClick={resetForm}
                                                className="cancel-button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </div>

        </>
    );
};

export default TimetableSystem;

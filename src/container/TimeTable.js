import React, { useState } from "react";

const timetableData = {
    1: {
        periods: 5,
        times: ["9:00-9:40", "9:40-10:20", "10:20-10:40", "10:40-11:20", "11:20-12:00"],
        schedule: {
            Monday: ["English", "Math", "Break", "Art", "Games"],
            Tuesday: ["Math", "English", "Break", "Drawing", "Story Time"],
            Wednesday: ["Hindi", "Math", "Break", "Music", "Play Time"],
            Thursday: ["English", "EVS", "Break", "Craft", "Games"],
            Friday: ["Math", "Hindi", "Break", "Dance", "Fun Time"],
            Saturday: ["English", "Math", "Break", "Art", "Games"],
        },
    },
    2: {
        periods: 5,
        times: ["9:00-9:40", "9:40-10:20", "10:20-10:40", "10:40-11:20", "11:20-12:00"],
        schedule: {
            Monday: ["English", "Math", "Break", "EVS", "Games"],
            Tuesday: ["Math", "Hindi", "Break", "Art", "Computer"],
            Wednesday: ["Hindi", "English", "Break", "Music", "PE"],
            Thursday: ["Math", "EVS", "Break", "Craft", "Library"],
            Friday: ["English", "Math", "Break", "Dance", "Games"],
            Saturday: ["Hindi", "Art", "Break", "Story", "Play"],
        },
    },
    3: {
        periods: 6,
        times: ["9:00-9:40", "9:40-10:20", "10:20-11:00", "11:00-11:20", "11:20-12:00", "12:00-12:40"],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Games"],
            Tuesday: ["Math", "Hindi", "English", "Break", "Art", "Computer"],
            Wednesday: ["Hindi", "Science", "Math", "Break", "Music", "PE"],
            Thursday: ["English", "Social", "Hindi", "Break", "Craft", "Library"],
            Friday: ["Math", "Science", "English", "Break", "Dance", "Games"],
            Saturday: ["Hindi", "Math", "Art", "Break", "Story", "Play"],
        },
    },
    4: {
        periods: 6,
        times: ["9:00-9:40", "9:40-10:20", "10:20-11:00", "11:00-11:20", "11:20-12:00", "12:00-12:40"],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Games"],
            Tuesday: ["Math", "Hindi", "English", "Break", "Art", "Computer"],
            Wednesday: ["Hindi", "Science", "Math", "Break", "Music", "PE"],
            Thursday: ["English", "Social", "Hindi", "Break", "Craft", "Library"],
            Friday: ["Math", "Science", "English", "Break", "GK", "Games"],
            Saturday: ["Hindi", "Math", "Art", "Break", "Moral Sci", "Play"],
        },
    },
    5: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "English", "Break", "Art", "Computer", "Music"],
            Wednesday: ["Hindi", "Science", "Math", "Break", "Social", "PE", "Library"],
            Thursday: ["English", "Social", "Hindi", "Break", "Science", "Craft", "Games"],
            Friday: ["Math", "Science", "English", "Break", "GK", "Dance", "Assembly"],
            Saturday: ["Hindi", "Math", "Art", "Break", "Moral Sci", "Games", "Story"],
        },
    },
    6: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "English", "Break", "Art", "Computer", "Music"],
            Wednesday: ["Hindi", "Science", "Math", "Break", "Social", "PE", "Library"],
            Thursday: ["English", "Geography", "Hindi", "Break", "Science", "Craft", "Games"],
            Friday: ["Math", "History", "English", "Break", "Sanskrit", "Dance", "Assembly"],
            Saturday: ["Hindi", "Math", "Art", "Break", "Moral Sci", "Games", "Activity"],
        },
    },
    7: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "Physics", "Break", "Geography", "Computer", "Music"],
            Wednesday: ["Hindi", "Chemistry", "Math", "Break", "History", "PE", "Library"],
            Thursday: ["English", "Biology", "Hindi", "Break", "Physics", "Art", "Games"],
            Friday: ["Math", "History", "English", "Break", "Sanskrit", "Dance", "Assembly"],
            Saturday: ["Hindi", "Math", "Geography", "Break", "Moral Sci", "Games", "Activity"],
        },
    },
    8: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Science", "Break", "Social", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "Physics", "Break", "Geography", "Computer", "Music"],
            Wednesday: ["Hindi", "Chemistry", "Math", "Break", "History", "PE", "Library"],
            Thursday: ["English", "Biology", "Hindi", "Break", "Physics", "Art", "Games"],
            Friday: ["Math", "History", "English", "Break", "Sanskrit", "Dance", "Assembly"],
            Saturday: ["Hindi", "Math", "Geography", "Break", "Civics", "Games", "Activity"],
        },
    },
    9: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Physics", "Break", "Chemistry", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "Biology", "Break", "History", "Computer", "Music"],
            Wednesday: ["Hindi", "Physics", "Math", "Break", "Geography", "PE", "Library"],
            Thursday: ["English", "Chemistry", "Hindi", "Break", "Biology", "Art", "Games"],
            Friday: ["Math", "History", "English", "Break", "Sanskrit", "Economics", "Assembly"],
            Saturday: ["Hindi", "Math", "Geography", "Break", "Civics", "Games", "Activity"],
        },
    },
    10: {
        periods: 7,
        times: [
            "9:00-9:40",
            "9:40-10:20",
            "10:20-11:00",
            "11:00-11:20",
            "11:20-12:00",
            "12:00-12:40",
            "12:40-1:20",
        ],
        schedule: {
            Monday: ["English", "Math", "Physics", "Break", "Chemistry", "Hindi", "Games"],
            Tuesday: ["Math", "Hindi", "Biology", "Break", "History", "Computer", "Music"],
            Wednesday: ["Hindi", "Physics", "Math", "Break", "Geography", "PE", "Library"],
            Thursday: ["English", "Chemistry", "Hindi", "Break", "Biology", "Art", "Games"],
            Friday: ["Math", "History", "English", "Break", "Sanskrit", "Economics", "Assembly"],
            Saturday: ["Hindi", "Math", "Geography", "Break", "Civics", "Games", "Activity"],
        },
    },
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function TimeTable() {
    const [currentClass, setCurrentClass] = useState(1);

    const handleClassChange = (classNumber) => {
        setCurrentClass(classNumber);
    };

    const data = timetableData[currentClass];

    return (
        <>
            <div className="header">
                <h1>Time Tables</h1>
                <div className="header-right">
                    <button type="button" className="btn btn-outline-light">Add Time Table</button>
                </div>
            </div>
            <div className="content-body">
                <div className="timeTablecontainer">
                    <div className="class-selector">
                        {[...Array(10)].map((_, idx) => (
                            <button
                                key={idx + 1}
                                className={`class-btn${currentClass === idx + 1 ? " active" : ""}`}
                                onClick={() => handleClassChange(idx + 1)}
                            >
                                Class {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="timetable-container">
                        {/* <h2 className="class-title">Class {currentClass} - Timetable</h2> */}
                        <div className="timetable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        {data.times.map((time, idx) => (
                                            <th key={idx}>
                                                Period {idx + 1}
                                                <br />
                                                <span className="period-time">{time}</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((day) => (
                                        <tr key={day}>
                                            <td className="day-cell">{day}</td>
                                            {data.schedule[day].map((subject, idx) => {
                                                if (subject === "Break") {
                                                    return (
                                                        <td className="break-cell" key={idx}>
                                                            🍽️ {subject}
                                                        </td>
                                                    );
                                                } else if (subject === "Free" || subject === "") {
                                                    return (
                                                        <td className="empty-cell" key={idx}>
                                                            Free Period
                                                        </td>
                                                    );
                                                } else {
                                                    return (
                                                        <td className="subject-cell" key={idx}>
                                                            {subject}
                                                        </td>
                                                    );
                                                }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color legend-subject"></div>
                                <span>Subject</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-break"></div>
                                <span>Break</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-empty"></div>
                                <span>Free Period</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimeTable;

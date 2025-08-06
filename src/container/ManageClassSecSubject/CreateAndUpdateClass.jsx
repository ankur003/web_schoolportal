import React, { useState } from "react";

// Your static data
const classSectionSubjectData =[
    {
        "masterClassUuid": "5d733b95-b72e-4e53-818f-0d87aae77d54",
        "className": "NURSERY",
        "subjects": [],
        "sectionSubjects": [
            {
                "masterSectionUuid": "3f0e64f9-f61f-4a83-ae1e-7d455a2d966e",
                "sectionName": "C",
                "subjects": [
                    {
                        "subjectId": 3,
                        "subjectName": "English",
                        "subjectCode": "ENG",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T15:42:38",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    },
                    {
                        "subjectId": 4,
                        "subjectName": "Hindi",
                        "subjectCode": "HIN",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T15:42:38",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    }
                ]
            },
            {
                "masterSectionUuid": "598f758b-795c-45d4-95f9-c79bde822900",
                "sectionName": "B",
                "subjects": [
                    {
                        "subjectId": 8,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:16:20",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    },
                    {
                        "subjectId": 9,
                        "subjectName": "Hindi",
                        "subjectCode": "Hindi",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:16:20",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    }
                ]
            },
            {
                "masterSectionUuid": "80d1a513-c3fe-4368-8b4b-6d04ac1d1f83",
                "sectionName": "A",
                "subjects": [
                    {
                        "subjectId": 6,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:16:20",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    },
                    {
                        "subjectId": 7,
                        "subjectName": "Hindi",
                        "subjectCode": "Hindi",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:16:20",
                        "updatedAt": "2025-08-04T19:16:20",
                        "isActive": true
                    }
                ]
            }
        ]
    },
    {
        "masterClassUuid": "c5e6cd73-a9cb-4016-a4a1-e555e9d01e0d",
        "className": "5th",
        "subjects": [],
        "sectionSubjects": [
            {
                "masterSectionUuid": "3f0e64f9-f61f-4a83-ae1e-7d455a2d966e",
                "sectionName": "C",
                "subjects": [
                    {
                        "subjectId": 10,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 11,
                        "subjectName": "Science",
                        "subjectCode": "Science",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 5,
                        "subjectName": "Social Studies",
                        "subjectCode": "SOC",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T15:42:38",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    }
                ]
            },
            {
                "masterSectionUuid": "c837e7aa-6296-4c84-aed5-e90cd3d7d246",
                "sectionName": "D",
                "subjects": [
                    {
                        "subjectId": 12,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 14,
                        "subjectName": "Science",
                        "subjectCode": "Science",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 13,
                        "subjectName": "Social Studies",
                        "subjectCode": "Social Studies",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    }
                ]
            },
            {
                "masterSectionUuid": "598f758b-795c-45d4-95f9-c79bde822900",
                "sectionName": "B",
                "subjects": [
                    {
                        "subjectId": 18,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 20,
                        "subjectName": "Science",
                        "subjectCode": "Science",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 19,
                        "subjectName": "Social Studies",
                        "subjectCode": "Social Studies",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    }
                ]
            },
            {
                "masterSectionUuid": "80d1a513-c3fe-4368-8b4b-6d04ac1d1f83",
                "sectionName": "A",
                "subjects": [
                    {
                        "subjectId": 15,
                        "subjectName": "English",
                        "subjectCode": "English",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 17,
                        "subjectName": "Science",
                        "subjectCode": "Science",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    },
                    {
                        "subjectId": 16,
                        "subjectName": "Social Studies",
                        "subjectCode": "Social Studies",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T19:23:25",
                        "updatedAt": "2025-08-04T19:23:25",
                        "isActive": true
                    }
                ]
            }
        ]
    },
    {
        "masterClassUuid": "b254b29a-f749-41f6-a75e-4c5f027dbfe2",
        "className": "PRE-NURSERY",
        "subjects": [],
        "sectionSubjects": [
            {
                "masterSectionUuid": "598f758b-795c-45d4-95f9-c79bde822900",
                "sectionName": "B",
                "subjects": [
                    {
                        "subjectId": 2,
                        "subjectName": "Science",
                        "subjectCode": "SCI",
                        "maxMarks": 100,
                        "passMarks": 33,
                        "createdAt": "2025-08-04T15:42:38",
                        "updatedAt": "2025-08-04T18:12:50",
                        "isActive": true
                    }
                ]
            }
        ]
    }
];

function SubjectCard({ subject }) {
    return (
        <div
            style={{
                background: "linear-gradient(135deg,#ece9e6 60%,#ffffff 100%)",
                borderRadius: 12,
                boxShadow: "0 2px 8px #ece9e6cc",
                marginBottom: 12,
                padding: "14px 20px",
                minWidth: 180,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <span style={{ fontWeight: "bold", color: "#3838a9", fontSize: 16 }}>
                {subject.subjectName}
            </span>
            <span style={{ color: "#6232a3", fontSize: 13, margin: "3px 0" }}>
                Code: {subject.subjectCode}
            </span>
            <div
                style={{ display: "flex", fontSize: 13, color: "#295c7b" }}
            >
                <span>Max: {subject.maxMarks}</span>
                <span style={{ marginLeft: 12 }}>Pass: {subject.passMarks}</span>
            </div>
        </div>
    );
}

function SectionColumn({ section }) {
    return (
        <div
            style={{
                background: "linear-gradient(115deg,#f3f7fa 70%,#d8e2e7 100%)",
                borderRadius: 16,
                margin: 10,
                minWidth: 260,
                flex: "1 1 250px",
                padding: 22,
                boxShadow: "0 4px 18px #dde9ec60",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div style={{
                fontSize: 19, fontWeight: 700, color: "#20aedb",
                letterSpacing: 1, marginBottom: 14
            }}>
                Section {section.sectionName}
            </div>
            {section.subjects.length
                ? section.subjects.map(subj => (
                    <SubjectCard subject={subj} key={subj.subjectId} />
                ))
                : <span style={{ color: "#aaa" }}>No subjects assigned</span>}
        </div>
    );
}

function ClassesTabGridUI() {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const classes = classSectionSubjectData;
    const selectedClass = classes[selectedIdx];

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "48px auto",
                fontFamily: "system-ui,sans-serif",
                background: "linear-gradient(110deg,#e0ecfa 80%,#ffffff 100%)",
                padding: 34,
                borderRadius: 20,
                boxShadow: "0 8px 38px #e0ecfa"
            }}
        >
            <h2 style={{
                textAlign: "center",
                color: "#3e334e",
                fontWeight: 900,
                fontSize: 36,
                marginBottom: 20,
                textShadow: "0 2px 12px #e4e4ef"
            }}>
                Classes, Sections & Subjects
            </h2>
            {/* Tabs */}
            <div style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginBottom: 30,
                flexWrap: "wrap"
            }}>
                {classes.map((cls, idx) => (
                    <button
                        key={cls.masterClassUuid}
                        onClick={() => setSelectedIdx(idx)}
                        style={{
                            padding: "14px 34px",
                            borderRadius: 16,
                            fontSize: 20,
                            fontWeight: 700,
                            border: selectedIdx === idx ? "2.5px solid #4b1980" : "2px solid #d0d0ea",
                            background: selectedIdx === idx
                                ? "linear-gradient(90deg,#8ec5fc 0%,#e0c3fc 100%)"
                                : "linear-gradient(90deg,#f5f7fa 0%,#c9d6ff 100%)",
                            color: selectedIdx === idx ? "#4b1980" : "#6741ac",
                            cursor: "pointer",
                            boxShadow: selectedIdx === idx ? "0 2px 14px #b4d6ff88" : undefined,
                            outline: "none",
                            transition: "all 0.2s"
                        }}
                        aria-selected={selectedIdx === idx}
                        aria-controls={`class-panel-${idx}`}
                    >
                        {cls.className}
                    </button>
                ))}
            </div>
            {/* Only selected class's section blocks are displayed */}
            <div id={`class-panel-${selectedIdx}`}>
                <div style={{
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                    justifyContent: "flex-start"
                }}>
                    {selectedClass.sectionSubjects.map(section => (
                        <SectionColumn section={section} key={section.masterSectionUuid} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClassesTabGridUI;

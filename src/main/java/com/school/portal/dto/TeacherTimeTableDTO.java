package com.school.portal.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherTimeTableDTO {
    private Long id;
    private String teacherUuid;
    private String teacherTimetableUuid;
    private String masterClassUuid;
    private String masterSectionUuid;
    private String subjectName;
    private String dayOfWeek;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    private String roomNo;

    // Additional fields from joined tables
    private String teacherName;
    private String className;
    private String sectionName;

//    public TeacherTimeTableDTO(Long id, String teacherUuid, String teacherTimetableUuid,
//                               String masterClassUuid, String masterSectionUuid, String subjectName,
//                               String dayOfWeek, LocalTime startTime, LocalTime endTime, String roomNo,
//                               String teacherName, String className, String sectionName) {
//        this.id = id;
//        this.teacherUuid = teacherUuid;
//        this.teacherTimetableUuid = teacherTimetableUuid;
//        this.masterClassUuid = masterClassUuid;
//        this.masterSectionUuid = masterSectionUuid;
//        this.subjectName = subjectName;
//        this.dayOfWeek = dayOfWeek;
//        this.startTime = startTime;
//        this.endTime = endTime;
//        this.roomNo = roomNo;
//        this.teacherName = teacherName;
//        this.className = className;
//        this.sectionName = sectionName;
//    }

}

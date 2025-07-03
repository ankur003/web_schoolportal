package com.school.portal.utils;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;

public class TeacherTimeTableMapper {

    public static TeacherTimeTableDTO toDto(TeacherTimeTable entity) {
        return TeacherTimeTableDTO.builder()
                .id(entity.getId())
                .teacherTimetableUuid(entity.getTeacherTimetableUuid())
                .teacherUuid(entity.getTeacherUuid())
                .masterClassUuid(entity.getMasterClassUuid())
                .masterSectionUuid(entity.getMasterSectionUuid())
                .subjectName(entity.getSubjectName())
                .dayOfWeek(entity.getDayOfWeek())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .roomNo(entity.getRoomNo())
                .build();
    }

    public static TeacherTimeTable toEntity(TeacherTimeTableDTO dto) {
        return TeacherTimeTable.builder()
                .id(dto.getId())
                .teacherTimetableUuid(dto.getTeacherTimetableUuid())
                .teacherUuid(dto.getTeacherUuid())
                .masterClassUuid(dto.getMasterClassUuid())
                .masterSectionUuid(dto.getMasterSectionUuid())
                .subjectName(dto.getSubjectName())
                .dayOfWeek(dto.getDayOfWeek())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .roomNo(dto.getRoomNo())
                .build();
    }
}

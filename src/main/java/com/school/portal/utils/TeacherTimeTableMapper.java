package com.school.portal.utils;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;

public class TeacherTimeTableMapper {

    public static TeacherTimeTableDTO toDto(TeacherTimeTable entity) {
        return TeacherTimeTableDTO.builder()
                .id(entity.getId())
                .teacherUuid(entity.getTeacherUuid())
                .classUuid(entity.getClassUuid())
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
                .teacherUuid(dto.getTeacherUuid())
                .classUuid(dto.getClassUuid())
                .subjectName(dto.getSubjectName())
                .dayOfWeek(dto.getDayOfWeek())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .roomNo(dto.getRoomNo())
                .build();
    }
}

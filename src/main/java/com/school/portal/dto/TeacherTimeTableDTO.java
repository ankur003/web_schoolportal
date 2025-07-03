package com.school.portal.dto;

import lombok.*;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherTimeTableDTO {
    private Long id;
    private String teacherUuid;
    private String classUuid;
    private String subjectName;
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomNo;
}

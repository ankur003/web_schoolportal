package com.school.portal.domain;

import lombok.*;
import javax.persistence.*;

import com.school.portal.enums.AcademicYear;

import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "teacher_timetable")
public class TeacherTimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "teacher_uuid", nullable = false, length = 191)
    private String teacherUuid;

    @Column(name = "teacher_timetable_uuid", nullable = false, length = 191)
    private String teacherTimetableUuid;

    @Column(name = "master_class_uuid", nullable = false, length = 191)
    private String masterClassUuid;

    @Column(name = "master_section_uuid", length = 191)
    private String masterSectionUuid;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek; // MONDAY, TUESDAY, etc.

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "room_no")
    private String roomNo;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
	@Enumerated(EnumType.STRING)
	private AcademicYear academicYear;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

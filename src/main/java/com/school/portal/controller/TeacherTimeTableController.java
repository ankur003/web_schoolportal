package com.school.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;
import com.school.portal.service.TeacherTimeTableService;
import com.school.portal.utils.TeacherTimeTableMapper;

@RestController
@RequestMapping("/api/v1/timetable")
@CrossOrigin("*")
public class TeacherTimeTableController {

    @Autowired
    private TeacherTimeTableService timetableService;

    @PutMapping
    public ResponseEntity<TeacherTimeTableDTO> upsert(@RequestBody TeacherTimeTableDTO dto,
                                                      @RequestParam(value = "id", required = false) Long id) {
        TeacherTimeTable entity = TeacherTimeTableMapper.toEntity(dto);
        TeacherTimeTable saved = timetableService.upsertWithValidation(id, entity);
        return ResponseEntity.ok(TeacherTimeTableMapper.toDto(saved));
    }


    @GetMapping
    public List<TeacherTimeTableDTO> getAll() {
        return timetableService.getAll();
    }

    @GetMapping("/{teacherTimetableUuid}")
    public ResponseEntity<TeacherTimeTableDTO> getById(@PathVariable String teacherTimetableUuid) {
        return timetableService.findByTeacherTimetableUuid(teacherTimetableUuid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/teacher/{teacherUuid}")
    public List<TeacherTimeTableDTO> getByTeacher(@PathVariable String teacherUuid) {
        return timetableService.getByTeacher(teacherUuid);
    }

    @GetMapping("/class/{classUuid}")
    public List<TeacherTimeTableDTO> getByClassAndSection(@PathVariable String classUuid,
                                                @RequestParam(required = false) String sectionUuid) {
        return timetableService.getByClassAndSection(classUuid, sectionUuid);
    }

    @GetMapping("/day/{dayOfWeek}")
    public List<TeacherTimeTableDTO> getByDay(@PathVariable String dayOfWeek) {
        return timetableService.getByDay(dayOfWeek);
    }

    @DeleteMapping("/{teacherTimetableUuid}")
    public ResponseEntity<Void> delete(@PathVariable String teacherTimetableUuid) {
        timetableService.deleteEntry(teacherTimetableUuid);
        return ResponseEntity.ok().build();
    }
}

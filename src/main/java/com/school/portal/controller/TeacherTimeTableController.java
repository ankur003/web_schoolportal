package com.school.portal.controller;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;
import com.school.portal.service.TeacherTimeTableService;
import com.school.portal.utils.TeacherTimeTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/timetable")
public class TeacherTimeTableController {

    @Autowired
    private TeacherTimeTableService timetableService;

    @PostMapping
    public ResponseEntity<TeacherTimeTableDTO> create(@RequestBody TeacherTimeTableDTO dto) {
        TeacherTimeTable entity = TeacherTimeTableMapper.toEntity(dto);
        TeacherTimeTable saved = timetableService.createEntryWithValidation(entity);
        return ResponseEntity.ok(TeacherTimeTableMapper.toDto(saved));
    }

    @GetMapping
    public List<TeacherTimeTableDTO> getAll() {
        return timetableService.getAll().stream()
                .map(TeacherTimeTableMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherTimeTable> getById(@PathVariable Long id) {
        return timetableService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/teacher/{teacherUuid}")
    public List<TeacherTimeTableDTO> getByTeacher(@PathVariable String teacherUuid) {
        return timetableService.getByTeacher(teacherUuid).stream()
                .map(TeacherTimeTableMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/class/{classUuid}")
    public List<TeacherTimeTableDTO> getByClass(@PathVariable String classUuid) {
        return timetableService.getByClass(classUuid).stream()
                .map(TeacherTimeTableMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/day/{dayOfWeek}")
    public List<TeacherTimeTableDTO> getByDay(@PathVariable String dayOfWeek) {
        return timetableService.getByDay(dayOfWeek).stream()
                .map(TeacherTimeTableMapper::toDto)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        timetableService.deleteEntry(id);
        return ResponseEntity.ok().build();
    }
}

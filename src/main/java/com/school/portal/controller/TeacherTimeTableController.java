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
@CrossOrigin("*")
public class TeacherTimeTableController {

    @Autowired
    private TeacherTimeTableService timetableService;

//    @PostMapping
//    public ResponseEntity<TeacherTimeTableDTO> create(@RequestBody TeacherTimeTableDTO dto) {
//        TeacherTimeTable entity = TeacherTimeTableMapper.toEntity(dto);
//        TeacherTimeTable saved = timetableService.createEntryWithValidation(entity);
//        return ResponseEntity.ok(TeacherTimeTableMapper.toDto(saved));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<TeacherTimeTableDTO> update(@PathVariable Long id,
//                                                      @RequestBody TeacherTimeTableDTO dto) {
//        TeacherTimeTable updatedEntity = TeacherTimeTableMapper.toEntity(dto);
//        TeacherTimeTable saved = timetableService.updateEntryWithValidation(id, updatedEntity);
//        return ResponseEntity.ok(TeacherTimeTableMapper.toDto(saved));
//    }

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

//    @GetMapping("/class/{classUuid}")
//    public List<TeacherTimeTableDTO> getByClass(@PathVariable String classUuid) {
//        return timetableService.getByClass(classUuid);
//    }

    @GetMapping("/class/{classUuid}")
    public List<TeacherTimeTableDTO> getByClassAndSection(@PathVariable String classUuid,
                                                @RequestParam(required = false) String sectionUuid) {
        return timetableService.getByClassAndSection(classUuid, sectionUuid);
    }
//    @GetMapping("/class/section/{sectionUuid}")
//    public List<TeacherTimeTableDTO> getBySection(@PathVariable String sectionUuid) {
//        return timetableService.getByClass(sectionUuid).stream()
//                .map(TeacherTimeTableMapper::toDto)
//                .collect(Collectors.toList());
//    }

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

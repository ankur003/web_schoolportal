package com.school.portal.service;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.repo.TeacherTimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherTimeTableService {

    @Autowired
    private TeacherTimeTableRepository timetableRepo;

    public TeacherTimeTable createEntry(TeacherTimeTable entry) {
        return timetableRepo.save(entry);
    }

    public List<TeacherTimeTable> getAll() {
        return timetableRepo.findAll();
    }

    public Optional<TeacherTimeTable> getById(Long id) {
        return timetableRepo.findById(id);
    }

    public List<TeacherTimeTable> getByTeacher(String teacherUuid) {
        return timetableRepo.findByTeacherUuid(teacherUuid);
    }

    public List<TeacherTimeTable> getByClass(String classUuid) {
        return timetableRepo.findByClassUuid(classUuid);
    }

    public List<TeacherTimeTable> getByDay(String dayOfWeek) {
        return timetableRepo.findByDayOfWeek(dayOfWeek.toUpperCase());
    }

    public void deleteEntry(Long id) {
        timetableRepo.deleteById(id);
    }

    public TeacherTimeTable createEntryWithValidation(TeacherTimeTable entry) {
        List<TeacherTimeTable> clashes = timetableRepo.findOverlappingSlots(
                entry.getTeacherUuid(), entry.getDayOfWeek(),
                entry.getStartTime(), entry.getEndTime());

        if (!clashes.isEmpty()) {
            throw new RuntimeException("Teacher already has a class during this time.");
        }

        return timetableRepo.save(entry);
    }

}

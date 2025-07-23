package com.school.portal.service;

import com.school.portal.domain.TeacherTimeTable;
import com.school.portal.dto.TeacherTimeTableDTO;
import com.school.portal.repo.TeacherTimeTableRepository;
import com.school.portal.utils.SchoolPortalUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherTimeTableService {

    @Autowired
    private TeacherTimeTableRepository timetableRepo;

    public TeacherTimeTable createEntry(TeacherTimeTable entry) {
        return timetableRepo.save(entry);
    }

    public List<TeacherTimeTableDTO> getAll() {
        return timetableRepo.findAllWithDetails();
    }

    public Optional<TeacherTimeTableDTO> findByTeacherTimetableUuid(String teacherTimetableUuid) {
        return timetableRepo.findByTeacherTimeTableUuid(teacherTimetableUuid);
    }

    public List<TeacherTimeTableDTO> getByTeacher(String teacherUuid) {
        return timetableRepo.findByTeacherUuid(teacherUuid);
    }

    public List<TeacherTimeTableDTO> getByClass(String classUuid) {
        return timetableRepo.findByClassUuid(classUuid);
    }

    public List<TeacherTimeTableDTO> getByClassAndSection(String classUuid, String sectionUuid) {
        return timetableRepo.findByClassAndOptionalSection(classUuid, sectionUuid);
    }


//    public List<TeacherTimeTable> getBySection(String sectionUuid) {
//        return timetableRepo.findByMasterSectionUuid(sectionUuid);
//    }

    public List<TeacherTimeTableDTO> getByDay(String dayOfWeek) {
        return timetableRepo.findByDayOfWeek(dayOfWeek.toUpperCase());
    }

    public void deleteEntry(String teacherTimetableUuid) {
        timetableRepo.deleteByTeacherTimetableUuid(teacherTimetableUuid);
    }

//    public TeacherTimeTable createEntryWithValidation(TeacherTimeTable entry) {
//        List<TeacherTimeTable> clashes = timetableRepo.findOverlappingSlots(
//                entry.getTeacherUuid(), entry.getDayOfWeek(),
//                entry.getStartTime(), entry.getEndTime());
//
//        if (!clashes.isEmpty()) {
//            throw new RuntimeException("Teacher already has a class during this time.");
//        }
//        entry.setTeacherTimetableUuid(SchoolPortalUtils.getUniqueUuid());
//
//        return timetableRepo.save(entry);
//    }
//
//    public TeacherTimeTable updateEntryWithValidation(Long id, TeacherTimeTable updatedEntry) {
//        TeacherTimeTable existing = timetableRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Timetable entry not found"));
//
//        List<TeacherTimeTable> clashes = timetableRepo.findOverlappingSlots(
//                        updatedEntry.getTeacherUuid(),
//                        updatedEntry.getDayOfWeek(),
//                        updatedEntry.getStartTime(),
//                        updatedEntry.getEndTime()
//                ).stream()
//                .filter(entry -> !entry.getId().equals(id)) // Exclude self in clash check
//                .collect(Collectors.toList());
//
//        if (!clashes.isEmpty()) {
//            throw new RuntimeException("Teacher already has a class during this time.");
//        }
//
//        // Update the fields
//        existing.setDayOfWeek(updatedEntry.getDayOfWeek());
//        existing.setStartTime(updatedEntry.getStartTime());
//        existing.setEndTime(updatedEntry.getEndTime());
//        existing.setRoomNo(updatedEntry.getRoomNo());
//        existing.setSubjectName(updatedEntry.getSubjectName());
//        existing.setMasterClassUuid(updatedEntry.getMasterClassUuid());
//        existing.setMasterSectionUuid(updatedEntry.getMasterSectionUuid());
//        existing.setTeacherUuid(updatedEntry.getTeacherUuid());
//
//        return timetableRepo.save(existing);
//    }

    public TeacherTimeTable upsertWithValidation(Long id, TeacherTimeTable entry) {
        if (id == null) {
            // CREATE logic
            List<TeacherTimeTable> clashes = timetableRepo.findOverlappingSlots(
                    entry.getTeacherUuid(),
                    entry.getDayOfWeek(),
                    entry.getStartTime(),
                    entry.getEndTime()
            );

            if (!clashes.isEmpty()) {
                throw new RuntimeException("Teacher already has a class during this time.");
            }

            entry.setTeacherTimetableUuid(SchoolPortalUtils.getUniqueUuid());
            return timetableRepo.save(entry);
        } else {
            // UPDATE logic
            TeacherTimeTable existing = timetableRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Timetable entry not found"));

            List<TeacherTimeTable> clashes = timetableRepo.findOverlappingSlots(
                            entry.getTeacherUuid(),
                            entry.getDayOfWeek(),
                            entry.getStartTime(),
                            entry.getEndTime()
                    ).stream()
                    .filter(e -> !e.getId().equals(id))
                    .collect(Collectors.toList());

            if (!clashes.isEmpty()) {
                throw new RuntimeException("Teacher already has a class during this time.");
            }

            existing.setDayOfWeek(entry.getDayOfWeek());
            existing.setStartTime(entry.getStartTime());
            existing.setEndTime(entry.getEndTime());
            existing.setRoomNo(entry.getRoomNo());
            existing.setSubjectName(entry.getSubjectName());
            existing.setMasterClassUuid(entry.getMasterClassUuid());
            existing.setMasterSectionUuid(entry.getMasterSectionUuid());
            existing.setTeacherUuid(entry.getTeacherUuid());

            return timetableRepo.save(existing);
        }
    }



}

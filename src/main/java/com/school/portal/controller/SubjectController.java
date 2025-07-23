package com.school.portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.validation.Valid;

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

import com.school.portal.dto.ClassSectionSubjectDto;
import com.school.portal.dto.SectionSubjectDto;
import com.school.portal.dto.SubjectDto;
import com.school.portal.dto.SubjectFilterDto;
import com.school.portal.dto.SubjectRequestDto;
import com.school.portal.dto.SubjectResponseDto;
import com.school.portal.dto.UniqueSubjectDto;
import com.school.portal.requests.ClassSubjectLinkRequestDto;
import com.school.portal.service.SubjectService;

@RestController
@RequestMapping("/api/v1/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {
    
    @Autowired
    private SubjectService subjectService;
    
    /**
     * Create a new subject
     */
    @PutMapping
    public ResponseEntity<Object> createOrUpdateSubject(
            @Valid @RequestBody SubjectRequestDto requestDto) {
        
        subjectService.createOrUpdateSubject(requestDto);
       
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/link")
    public ResponseEntity<Object> createOrUpdateClassSubjectLinkage(
            @Valid @RequestBody ClassSubjectLinkRequestDto classSubjectLinkRequestDto) {
        
    	subjectService.createOrUpdateClassSubjectLinkage(classSubjectLinkRequestDto);
    	
    	subjectService.deLinkClassSubject(classSubjectLinkRequestDto);
       
        return ResponseEntity.ok().build();
    }
    
    /**
     * Get subjects with optional filters
     */
    @GetMapping
    public ResponseEntity<Object> getSubjects(
            @RequestParam(required = false) String classUuid,
            @RequestParam(required = false) String sectionUuid,
            @RequestParam(required = false) Integer subjectId) {
        
        SubjectFilterDto filterDto = new SubjectFilterDto(classUuid, sectionUuid, subjectId);
        List<SubjectResponseDto> subjects = subjectService.getSubjectsWithFilters(filterDto);
        
        List<SubjectResponseDto> validSubjects = subjects.stream()
                .filter(Objects::nonNull) // remove null objects
                .filter(s -> s.getMasterClassUuid() != null) // optional: remove entries with null class UUID
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(convertToClassSectionSubjectDto(validSubjects));
    }
    
    @GetMapping("/list")
    public ResponseEntity<Object> getSubjectsAsList() {
        
    	List<UniqueSubjectDto> dtos = subjectService.getSubjectsAsList();
        
        
        return ResponseEntity.ok(dtos);
    }
    
    /**
     * Delete subject (soft delete)
     */
    @DeleteMapping("/{subjectId}")
    public ResponseEntity<ApiResponse<String>> deleteSubject(@PathVariable Integer subjectId) {
        
        subjectService.deleteSubject(subjectId);
        
        ApiResponse<String> response = new ApiResponse<>(
                true,
                "Subject deleted successfully",
                null
        );
        
        return ResponseEntity.ok(response);
    }
    
    
    public List<ClassSectionSubjectDto> convertToClassSectionSubjectDto(List<SubjectResponseDto> subjectResponseDtos) {
        // Group by masterClassUuid
        Map<String, List<SubjectResponseDto>> classGroup = subjectResponseDtos.stream()
                .collect(Collectors.groupingBy(SubjectResponseDto::getMasterClassUuid));

        List<ClassSectionSubjectDto> result = new ArrayList<>();

        for (Map.Entry<String, List<SubjectResponseDto>> entry : classGroup.entrySet()) {
            String classUuid = entry.getKey();
            List<SubjectResponseDto> classSubjects = entry.getValue();

            ClassSectionSubjectDto classDto = new ClassSectionSubjectDto();
            classDto.setMasterClassUuid(classUuid);
            classDto.setClassName(classSubjects.get(0).getClassName());

            // Subjects without section (i.e., masterSectionUuid is null)
            List<SubjectDto> generalSubjects = classSubjects.stream()
                    .filter(s -> s.getMasterSectionUuid() == null)
                    .map(this::mapToSubjectDto)
                    .collect(Collectors.toList());
            classDto.setSubjects(generalSubjects);

            // Subjects with section (i.e., masterSectionUuid is not null)
            Map<String, List<SubjectResponseDto>> sectionGroup = classSubjects.stream()
                    .filter(s -> s.getMasterSectionUuid() != null)
                    .collect(Collectors.groupingBy(SubjectResponseDto::getMasterSectionUuid));

            List<SectionSubjectDto> sectionSubjectDtos = new ArrayList<>();

            for (Map.Entry<String, List<SubjectResponseDto>> sectionEntry : sectionGroup.entrySet()) {
                String sectionUuid = sectionEntry.getKey();
                List<SubjectResponseDto> sectionSubjects = sectionEntry.getValue();

                SectionSubjectDto sectionDto = new SectionSubjectDto();
                sectionDto.setMasterSectionUuid(sectionUuid);
                sectionDto.setSectionName(sectionSubjects.get(0).getSectionName());

                List<SubjectDto> subjectDtoList = sectionSubjects.stream()
                        .map(this::mapToSubjectDto)
                        .collect(Collectors.toList());
                sectionDto.setSubjects(subjectDtoList);

                sectionSubjectDtos.add(sectionDto);
            }

            classDto.setSectionSubjects(sectionSubjectDtos);
            result.add(classDto);
        }

        return result;
    }


    // Mapper from SubjectResponseDto to SubjectDto
    private SubjectDto mapToSubjectDto(SubjectResponseDto s) {
        SubjectDto dto = new SubjectDto();
        dto.setSubjectId(s.getSubjectId());
        dto.setSubjectName(s.getSubjectName());
        dto.setSubjectCode(s.getSubjectCode());
        dto.setMaxMarks(s.getMaxMarks());
        dto.setPassMarks(s.getPassMarks());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setUpdatedAt(s.getUpdatedAt());
        dto.setIsActive(s.getIsActive());
        return dto;
    }

    
    
}

// API Response wrapper class

class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private long timestamp;
    
    public ApiResponse() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public ApiResponse(boolean success, String message, T data) {
        this();
        this.success = success;
        this.message = message;
        this.data = data;
    }
    
    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    
    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}

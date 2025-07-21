package com.school.portal.controller;

import java.util.List;

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

import com.school.portal.dto.ClassWithSubjectsResponseDto;
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
    public ResponseEntity<ApiResponse<List<SubjectResponseDto>>> getSubjects(
            @RequestParam(required = false) String classUuid,
            @RequestParam(required = false) String sectionUuid,
            @RequestParam(required = false) Integer subjectId) {
        
        SubjectFilterDto filterDto = new SubjectFilterDto(classUuid, sectionUuid, subjectId);
        List<SubjectResponseDto> subjects = subjectService.getSubjectsWithFilters(filterDto);
        
        ApiResponse<List<SubjectResponseDto>> response = new ApiResponse<>(
                true,
                "Subjects retrieved successfully",
                subjects
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/subjects/grouped")
    public ResponseEntity<ApiResponse<List<ClassWithSubjectsResponseDto>>> getSubjectsGrouped(
            @RequestParam(required = false) String classUuid,
            @RequestParam(required = false) String sectionUuid,
            @RequestParam(required = false) Integer subjectId) {
    	SubjectFilterDto filterDto= new SubjectFilterDto(classUuid,sectionUuid,subjectId);
        List<ClassWithSubjectsResponseDto> data = subjectService.getSubjectsGroupedByClass(filterDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Subjects grouped by class retrieved successfully", data));
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

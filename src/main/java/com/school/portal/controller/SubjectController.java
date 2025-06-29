package com.school.portal.controller;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.dto.SubjectDTO;
import com.school.portal.service.impl.SubjectService;

@RestController
@RequestMapping("/api/v1/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {
    
    @Autowired
    private SubjectService subjectService;
    
    // GET /api/subjects - Get all active subjects
    @GetMapping
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        List<SubjectDTO> subjects = subjectService.getAllActiveSubjects();
        return ResponseEntity.ok(subjects);
    }
    
    // GET /api/subjects/paginated - Get subjects with pagination
    @GetMapping("/")
    public ResponseEntity<Page<SubjectDTO>> getAllSubjectsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "subjectId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<SubjectDTO> subjects = subjectService.getAllActiveSubjects(pageable);
        return ResponseEntity.ok(subjects);
    }
    
    // GET /api/subjects/{id} - Get subject by ID
    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Integer id) {
        SubjectDTO subject = subjectService.getSubjectById(id);
        return ResponseEntity.ok(subject);
    }
    
    // POST /api/subjects - Create new subject
    @PostMapping("/")
    public ResponseEntity<SubjectDTO> createSubject(@Valid @RequestBody SubjectDTO subjectDTO) {
        SubjectDTO createdSubject = subjectService.createSubject(subjectDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubject);
    }
    
    // PUT /api/subjects/{id} - Update subject
    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> updateSubject(
            @PathVariable Integer id, 
            @Valid @RequestBody SubjectDTO subjectDTO) {
        SubjectDTO updatedSubject = subjectService.updateSubject(id, subjectDTO);
        return ResponseEntity.ok(updatedSubject);
    }
    
    // DELETE /api/subjects/{id} - Soft delete subject
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Integer id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
    
    // PUT /api/subjects/{id}/restore - Restore soft deleted subject
    @PutMapping("/{id}/restore")
    public ResponseEntity<SubjectDTO> restoreSubject(@PathVariable Integer id) {
        SubjectDTO restoredSubject = subjectService.restoreSubject(id);
        return ResponseEntity.ok(restoredSubject);
    }
    
    // GET /api/subjects/search - Search subjects by name
    @GetMapping("/search")
    public ResponseEntity<List<SubjectDTO>> searchSubjects(@RequestParam String name) {
        List<SubjectDTO> subjects = subjectService.searchSubjectsByName(name);
        return ResponseEntity.ok(subjects);
    }
}
package com.school.portal.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.school.portal.domain.Subject;
import com.school.portal.dto.SubjectDTO;
import com.school.portal.exception.DuplicateResourceException;
import com.school.portal.exception.ResourceNotFoundException;
import com.school.portal.repo.SubjectRepository;

@Service
@Transactional
public class SubjectService {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    // Get all active subjects
    public List<SubjectDTO> getAllActiveSubjects() {
        return subjectRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get active subjects with pagination
    public Page<SubjectDTO> getAllActiveSubjects(Pageable pageable) {
        return subjectRepository.findByIsActiveTrue(pageable)
                .map(this::convertToDTO);
    }
    
    // Get subject by ID
    public SubjectDTO getSubjectById(Integer subjectId) {
        Subject subject = subjectRepository.findBySubjectIdAndIsActiveTrue(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + subjectId));
        return convertToDTO(subject);
    }
    
    // Create new subject
    public SubjectDTO createSubject(SubjectDTO subjectDTO) {
        // Check if subject code already exists
        if (subjectDTO.getSubjectCode() != null && 
            subjectRepository.findBySubjectCodeAndIsActiveTrue(subjectDTO.getSubjectCode()).isPresent()) {
            throw new DuplicateResourceException("Subject with code '" + subjectDTO.getSubjectCode() + "' already exists");
        }
        
        Subject subject = convertToEntity(subjectDTO);
        Subject savedSubject = subjectRepository.save(subject);
        return convertToDTO(savedSubject);
    }
    
    // Update subject
    public SubjectDTO updateSubject(Integer subjectId, SubjectDTO subjectDTO) {
        Subject existingSubject = subjectRepository.findBySubjectIdAndIsActiveTrue(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + subjectId));
        
        // Check if subject code already exists (excluding current subject)
        if (subjectDTO.getSubjectCode() != null && 
            !subjectDTO.getSubjectCode().equals(existingSubject.getSubjectCode()) &&
            subjectRepository.existsBySubjectCodeAndSubjectIdNotAndIsActiveTrue(subjectDTO.getSubjectCode(), subjectId)) {
            throw new DuplicateResourceException("Subject with code '" + subjectDTO.getSubjectCode() + "' already exists");
        }
        
        // Update fields
        existingSubject.setSubjectName(subjectDTO.getSubjectName());
        existingSubject.setSubjectCode(subjectDTO.getSubjectCode());
        existingSubject.setMaxMarks(subjectDTO.getMaxMarks());
        existingSubject.setPassMarks(subjectDTO.getPassMarks());
        
        Subject updatedSubject = subjectRepository.save(existingSubject);
        return convertToDTO(updatedSubject);
    }
    
    // Soft delete subject
    public void deleteSubject(Integer subjectId) {
        if (!subjectRepository.findBySubjectIdAndIsActiveTrue(subjectId).isPresent()) {
            throw new ResourceNotFoundException("Subject not found with id: " + subjectId);
        }
        
        int updated = subjectRepository.softDeleteById(subjectId);
        if (updated == 0) {
            throw new ResourceNotFoundException("Failed to delete subject with id: " + subjectId);
        }
    }
    
    // Restore subject
    public SubjectDTO restoreSubject(Integer subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + subjectId));
        
        if (subject.getIsActive()) {
            throw new IllegalStateException("Subject is already active");
        }
        
        int updated = subjectRepository.restoreById(subjectId);
        if (updated == 0) {
            throw new ResourceNotFoundException("Failed to restore subject with id: " + subjectId);
        }
        
        return convertToDTO(subjectRepository.findById(subjectId).get());
    }
    
    // Search subjects by name
    public List<SubjectDTO> searchSubjectsByName(String subjectName) {
        return subjectRepository.findBySubjectNameContainingIgnoreCaseAndIsActiveTrue(subjectName)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Convert Entity to DTO
    private SubjectDTO convertToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setSubjectId(subject.getSubjectId());
        dto.setSubjectName(subject.getSubjectName());
        dto.setSubjectCode(subject.getSubjectCode());
        dto.setMaxMarks(subject.getMaxMarks());
        dto.setPassMarks(subject.getPassMarks());
        dto.setIsActive(subject.getIsActive());
        dto.setCreatedAt(subject.getCreatedAt());
        dto.setUpdatedAt(subject.getUpdatedAt());
        return dto;
    }
    
    // Convert DTO to Entity
    private Subject convertToEntity(SubjectDTO dto) {
        Subject subject = new Subject();
        subject.setSubjectName(dto.getSubjectName());
        subject.setSubjectCode(dto.getSubjectCode());
        subject.setMaxMarks(dto.getMaxMarks());
        subject.setPassMarks(dto.getPassMarks());
        return subject;
    }
}
package com.school.portal.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.Subject;
import com.school.portal.dto.ClassWithSubjectsResponseDto;
import com.school.portal.dto.SubjectFilterDto;
import com.school.portal.dto.SubjectRequestDto;
import com.school.portal.dto.SubjectResponseDto;
import com.school.portal.dto.UniqueSubjectDto;
import com.school.portal.exception.DuplicateResourceException;
import com.school.portal.exception.ResourceNotFoundException;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterSectionRepo;
import com.school.portal.repo.SubjectRepository;
import com.school.portal.requests.ClassSubjectLinkRequestDto;
import com.school.portal.utils.LoggedInUserUtil;

@Service
@Transactional
public class SubjectService {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private MasterClassRepo masterClassRepository;
    
    @Autowired
    private MasterSectionRepo masterSectionRepository;
    
    public void createOrUpdateSubject(SubjectRequestDto requestDto) {
    	
        if (requestDto.getSubjectId() != null) {
        	Subject subject = subjectRepository.findBySubjectIdAndIsActiveAndAcademicYear(requestDto.getSubjectId(), true, LoggedInUserUtil.getLoginUserAcadmicYear());
        	if (subject != null) {
            	List<Subject> reqSubjects =  subjectRepository.findBySubjectNameAndIsActiveAndAcademicYear(requestDto.getSubjectName(), true, LoggedInUserUtil.getLoginUserAcadmicYear()); 
            	if (CollectionUtils.isNotEmpty(reqSubjects)) {
            		reqSubjects.forEach(sub -> {
                		sub.setDescription(requestDto.getDescription());
                		sub.setIsActive(true);
            			subjectRepository.save(sub);
                	});            	}
            	List<Subject> subjects =  subjectRepository.findBySubjectNameAndIsActiveAndAcademicYear(subject.getSubjectName(), true, LoggedInUserUtil.getLoginUserAcadmicYear()); 
            	subjects.forEach(sub -> {
            		sub.setSubjectName(requestDto.getSubjectName());
            		sub.setSubjectCode(requestDto.getSubjectName().length() < 3 ? requestDto.getSubjectName() : requestDto.getSubjectName().substring(0, 3).toUpperCase());
            		sub.setDescription(requestDto.getDescription());
            		sub.setIsActive(true);
            		sub.setPassMarks(requestDto.getPassMarks());
            		sub.setMaxMarks(requestDto.getMaxMarks());
        			subjectRepository.save(sub);
            	});
        	}
        } else {
        	List<Subject> reqSubjects =  subjectRepository.findBySubjectNameAndIsActiveAndAcademicYear(requestDto.getSubjectName(), true, LoggedInUserUtil.getLoginUserAcadmicYear()); 
        	if (CollectionUtils.isNotEmpty(reqSubjects)) {
                throw new DuplicateResourceException("Subject name already exists: " + requestDto.getSubjectName());
        	}
        	 Subject subject = new Subject();
             mapRequestToEntity(requestDto, subject);
             subject.setCreatedAt(LocalDateTime.now());
             subject.setUpdatedAt(LocalDateTime.now());
             subject.setIsActive(true);
             
             subjectRepository.save(subject);
        }
    	
       
    }
    
    public void createOrUpdateClassSubjectLinkage(ClassSubjectLinkRequestDto requestDto) {
        Long masterClassId = validateAndGetMasterClassId(requestDto.getMasterClassUuid());
        
        Long masterSectionId = null;
        if (requestDto.getMasterSectionUuid() != null) {
            masterSectionId = validateAndGetMasterSectionId(requestDto.getMasterSectionUuid());
        }
        Set<String> validSubjectNames = requestDto.getSubjectNames().stream()
                .filter(name -> name != null && !name.trim().isEmpty())
                .map(String::trim)
                .collect(Collectors.toSet());
        
        if (validSubjectNames.isEmpty()) {
            throw new IllegalArgumentException("At least one valid subject name is required");
        }
        
        // Process each subject
        for (String subjectName : validSubjectNames) {
            createOrUpdateSubject(subjectName, masterClassId, masterSectionId);
        }
    }
    
    private Long validateAndGetMasterClassId(String masterClassUuid) {
        if (masterClassUuid == null || masterClassUuid.trim().isEmpty()) {
            throw new IllegalArgumentException("Master class UUID cannot be null or empty");
        }
        
        MasterClass masterClass = masterClassRepository.findByMasterClassUuid(masterClassUuid.trim());
        if (masterClass == null) {
            throw new EntityNotFoundException("Master class not found with UUID: " + masterClassUuid);
        }
        return masterClass.getMasterClassId();
    }
    
	private Long validateAndGetMasterSectionId(String masterSectionUuid) {
		MasterSection masterSection = masterSectionRepository.findByMasterSectionUuid(masterSectionUuid);
		if (masterSection == null) {
			throw new EntityNotFoundException("Master section not found with UUID: " + masterSectionUuid);
		}
		return masterSection.getMasterSectionId();
	}
    
    private void createOrUpdateSubject(String subjectName, Long masterClassId, Long masterSectionId) {
        Optional<Subject> existingSubject;
		if (masterSectionId != null) {
        	 existingSubject = subjectRepository.findBySubjectNameAndMasterClassIdAndMasterSectionIdAndIsActiveTrueAndAcademicYear(subjectName, masterClassId, masterSectionId, LoggedInUserUtil.getLoginUserAcadmicYear());
        	 if (!existingSubject.isPresent()) { 
            	 linkSubject(subjectName, masterClassId, masterSectionId);
        	 }
        } else {
        	 existingSubject = subjectRepository.findBySubjectNameAndMasterClassIdAndIsActiveTrueAndAcademicYear(subjectName, masterClassId, LoggedInUserUtil.getLoginUserAcadmicYear());
        	 if (!existingSubject.isPresent()) { 
            	 linkSubject(subjectName, masterClassId, masterSectionId);
        	 }
        }
    }

	private void linkSubject(String subjectName, Long masterClassId, Long masterSectionId) {
		List<Subject> existingSubjects = subjectRepository.findBySubjectNameAndIsActiveTrueAndAcademicYear(subjectName, LoggedInUserUtil.getLoginUserAcadmicYear());
		for (Subject subject : existingSubjects) {
			if (masterSectionId != null) {
				if (subject.getMasterClassId() == null && subject.getMasterSectionId() == null) {
					subject.setMasterClassId(masterClassId);
					subject.setMasterSectionId(masterSectionId);
					subject.setIsActive(true);
					subjectRepository.save(subject);
					return;
				}
			} else {
				if (subject.getMasterClassId() == null) {
					subject.setMasterClassId(masterClassId);
					subject.setMasterSectionId(masterSectionId);
					subject.setIsActive(true);
					subjectRepository.save(subject);
					return;
				}
			}
		}
		 Subject sub = existingSubjects.get(0);
		 Subject subject = new Subject();
		 subject.setMasterClassId(masterClassId);
		 subject.setMasterSectionId(masterSectionId);
		 subject.setDescription(sub.getDescription());
		 subject.setMaxMarks(sub.getMaxMarks());
		 subject.setPassMarks(sub.getPassMarks());
		 subject.setSubjectCode(subjectName);
		 subject.setIsActive(true);
		 subject.setSubjectName(subjectName);
		 subjectRepository.save(subject);
	}
    
    @Transactional(readOnly = true)
    public List<SubjectResponseDto> getSubjectsWithFilters(SubjectFilterDto filterDto) {
        List<Subject> subjects = subjectRepository.findSubjectsWithFilters(
                filterDto.getClassUuid(),
                filterDto.getSectionUuid(),
                filterDto.getSubjectId(),
                LoggedInUserUtil.getLoginUserAcadmicYear()
        );
        
        if (CollectionUtils.isEmpty(subjects)) {
        	return Collections.emptyList();
        }
        
        return subjects.stream()
                .map(this::mapEntityToResponseWithClassSection)
                .collect(Collectors.toList());
    }
    
    
    public void deleteSubject(Integer subjectId) {
        Subject subject = subjectRepository.findBySubjectIdAndIsActiveTrueAndAcademicYear(subjectId, LoggedInUserUtil.getLoginUserAcadmicYear())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID: " + subjectId));
        
        subject.setIsActive(false);
        subject.setUpdatedAt(LocalDateTime.now());
        subjectRepository.save(subject);
    }
    
    
    private void mapRequestToEntity(SubjectRequestDto requestDto,  Subject subject) {
        subject.setSubjectName(requestDto.getSubjectName().trim());
        subject.setMaxMarks(requestDto.getMaxMarks() != null ? requestDto.getMaxMarks() : 100);
        subject.setPassMarks(requestDto.getPassMarks() != null ? requestDto.getPassMarks() : 33);
        subject.setDescription(requestDto.getDescription());
        subject.setSubjectCode(requestDto.getSubjectName().length() < 3 ? requestDto.getSubjectName() : requestDto.getSubjectName().substring(0, 3).toUpperCase());
    }
    
    private SubjectResponseDto mapEntityToResponse(Subject subject, String className, String sectionName, String classUuid, String sectionUuid) {
        SubjectResponseDto responseDto = new SubjectResponseDto();
        responseDto.setSubjectId(subject.getSubjectId());
        responseDto.setSubjectName(subject.getSubjectName());
        responseDto.setSubjectCode(subject.getSubjectCode());
      
        responseDto.setMaxMarks(subject.getMaxMarks());
        responseDto.setPassMarks(subject.getPassMarks());
        responseDto.setCreatedAt(subject.getCreatedAt());
        responseDto.setUpdatedAt(subject.getUpdatedAt());
        responseDto.setIsActive(subject.getIsActive());
        
        responseDto.setClassName(className);
        responseDto.setMasterClassUuid(classUuid);
        
        responseDto.setSectionName(sectionName);
        responseDto.setMasterSectionUuid(sectionUuid);
        
        return responseDto;
    }
    
    private SubjectResponseDto mapEntityToResponseWithClassSection(Subject subject) {
        // For filtered results, we need to fetch class and section names
        String className = null;
		String sectionName = null;
		String classUuid= null;
		String sectionUuid = null;
    	
		if (subject.getMasterClassId() != null) {
			Optional<MasterClass> optionalClass = masterClassRepository.findById(subject.getMasterClassId());
			if (optionalClass.isPresent()) {
	        	MasterClass mClass = optionalClass.get();
	        	className = mClass.getClassName();
	        	classUuid = mClass.getMasterClassUuid();
	        }
		}
		if (subject.getMasterSectionId() != null) {
	        Optional<MasterSection> optionalSection = masterSectionRepository.findById(subject.getMasterSectionId());
	        if (optionalSection.isPresent()) {
	        	MasterSection section = optionalSection.get();
	        	sectionName = section.getSectionName();
	        	sectionUuid = section.getMasterSectionUuid();
	        }
		}
		return mapEntityToResponse(subject, className, sectionName, classUuid, sectionUuid);
    }

	public void deLinkClassSubject(ClassSubjectLinkRequestDto classSubjectLinkRequestDto) {
		Long msId = null;
		Long mcId = null;
		if (classSubjectLinkRequestDto.getMasterSectionUuid() != null) {
			MasterSection ms = masterSectionRepository.findByMasterSectionUuid(classSubjectLinkRequestDto.getMasterSectionUuid());
			if (ms != null) {
				msId = ms.getMasterSectionId();
			}
		}
		
		if (classSubjectLinkRequestDto.getMasterClassUuid() != null) {
			MasterClass mc = masterClassRepository.findByMasterClassUuid(classSubjectLinkRequestDto.getMasterClassUuid());
			if (mc != null) {
				mcId = mc.getMasterClassId();
			}
		}
		List<Subject> subjects = null;
		if (mcId != null && msId != null) {
			subjects = subjectRepository.findByMasterClassIdAndMasterSectionIdAndIsActiveTrueAndAcademicYear(mcId, msId, LoggedInUserUtil.getLoginUserAcadmicYear());
			removeLinkage(classSubjectLinkRequestDto, subjects);
			
		} else if(mcId != null) {
			subjects = subjectRepository.findByMasterClassIdAndIsActiveTrueAndAcademicYear(mcId, LoggedInUserUtil.getLoginUserAcadmicYear());
			removeLinkage(classSubjectLinkRequestDto, subjects);
		}
		
	}

	private void removeLinkage(ClassSubjectLinkRequestDto classSubjectLinkRequestDto, List<Subject> subjects) {
		Set<String> uniqueSubjectNames;
		uniqueSubjectNames  = getRemovableSubjects(classSubjectLinkRequestDto, subjects);
		if (!uniqueSubjectNames.isEmpty()) {
			for (Subject subject : subjects) {
				if (uniqueSubjectNames.contains(subject.getSubjectName())) {
					subject.setIsActive(false);
					subjectRepository.delete(subject);
				}
			}
		}
	}

	private Set<String> getRemovableSubjects(ClassSubjectLinkRequestDto classSubjectLinkRequestDto, List<Subject> subjects) {
		Set<String> uniqueSubjectNames = subjects.stream().map(Subject::getSubjectName).collect(Collectors.toSet());
		Set<String> requestedSubjectName = classSubjectLinkRequestDto.getSubjectNames();
		
		uniqueSubjectNames.removeAll(requestedSubjectName);
		return uniqueSubjectNames;
	}

	public List<UniqueSubjectDto> getSubjectsAsList() {
		List<Subject> subjects = subjectRepository.findByIsActiveTrueAndAcademicYear(LoggedInUserUtil.getLoginUserAcadmicYear());
		if (CollectionUtils.isEmpty(subjects)) {
			return Collections.emptyList();
		}
		Map<String, Subject> uniqueMap = subjects.stream()
			    .filter(s -> s.getSubjectName() != null)
			    .collect(Collectors.toMap(
			        Subject::getSubjectName, // key: subject name
			        Function.identity(),     // value: full subject
			        (existing, replacement) -> existing // in case of duplicate subjectName, keep the first one
			    ));

		return uniqueMap.values().stream()
			    .map(s -> new UniqueSubjectDto(s.getSubjectName(), s.getDescription(), s.getSubjectId()))
			    .collect(Collectors.toList());
	}
	
	
	@Transactional(readOnly = true)
	public List<ClassWithSubjectsResponseDto> getSubjectsGroupedByClass(SubjectFilterDto filterDto) {
	   List<Subject> subjects = subjectRepository.findSubjectsWithFilters(
	        filterDto.getClassUuid(),
	        filterDto.getSectionUuid(),
	        filterDto.getSubjectId(),
	        LoggedInUserUtil.getLoginUserAcadmicYear()
	    );

	    if (CollectionUtils.isEmpty(subjects)) {
	        return Collections.emptyList();
	    }
	    
	    
	    for (Subject subject : subjects) {
			
		}
	    

	    // Map each subject to SubjectResponseDto
	    List<SubjectResponseDto> subjectDtos = subjects.stream()
	            .map(this::mapEntityToResponseWithClassSection)
	            .collect(Collectors.toList());

	    // Group by className + classUuid
	    Map<String, List<SubjectResponseDto>> groupedMap = subjectDtos.stream()
	        .collect(Collectors.groupingBy(dto -> dto.getClassName() + "::" + dto.getMasterClassUuid()));

	    // Convert to nested structure
	    List<ClassWithSubjectsResponseDto> result = new ArrayList<>();
	    for (Map.Entry<String, List<SubjectResponseDto>> entry : groupedMap.entrySet()) {
	        List<SubjectResponseDto> subjectList = entry.getValue();
	        if (!subjectList.isEmpty()) {
	            SubjectResponseDto first = subjectList.get(0);

	            ClassWithSubjectsResponseDto dto = new ClassWithSubjectsResponseDto();
	            dto.setClassName(first.getClassName());
	            dto.setMasterClassUuid(first.getMasterClassUuid());
	            dto.setSubjects(subjectList);

	            result.add(dto);
	        }
	    }

	    return result;
	}

	
	
}
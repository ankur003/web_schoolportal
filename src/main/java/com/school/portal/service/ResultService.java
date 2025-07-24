package com.school.portal.service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.school.portal.domain.Results;
import com.school.portal.domain.Subject;
import com.school.portal.domain.User;
import com.school.portal.enums.ExamType;
import com.school.portal.repo.ResultsRepository;
import com.school.portal.repo.SubjectRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.requests.ResultRequestDTO;
import com.school.portal.response.DashboardResultDTO;
import com.school.portal.response.ResultResponseDTO;

@Service
@Transactional
public class ResultService {

    @Autowired
    private ResultsRepository resultsRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public List<ResultResponseDTO> getResults(String userUuid, String classUuid, 
                                            String sectionUuid, ExamType examType, Boolean isFailed) {
        Boolean passedStatus = null;
        if (isFailed != null) {
            passedStatus = !isFailed; // If isFailed is true, we want isPassed to be false
        }
        
        return resultsRepository.findResultsWithFilters(userUuid, classUuid, sectionUuid, examType, passedStatus);
    }

    public Results saveOrUpdateResult(ResultRequestDTO requestDTO) {
        User user = userRepository.findByUserUuidAndIsActive(requestDTO.getUserUuid(), true);


        Subject subject = subjectRepository.findById(requestDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Results existingResult = resultsRepository.findByUserAndSubjectAndExamType(
                user.getUserId(), subject.getSubjectId(), requestDTO.getExamType());

        Results result;
        if (existingResult != null) {
            result = existingResult;
            result.setUpdatedAt(LocalDateTime.now());
        } else {
            result = new Results();
            result.setUser(user);
            result.setSubject(subject);
            result.setExamType(requestDTO.getExamType());
            result.setCreatedAt(LocalDateTime.now());
        }

        result.setMarksObtained(requestDTO.getMarksObtained());
        result.setGrade(requestDTO.getGrade());
        result.setRemarks(requestDTO.getRemarks());
        
        // Calculate percentage
        double percentage = (requestDTO.getMarksObtained().doubleValue() / subject.getMaxMarks()) * 100;
        result.setPercentage(percentage);
        
        // Check if passed
        result.setIsPassed(requestDTO.getMarksObtained() >= subject.getPassMarks());

        return resultsRepository.save(result);
    }

    public Map<String, Object> getDashboardData(String classUuid, String sectionUuid, 
                                              Boolean loosers, Boolean gainers, 
                                              ExamType examType, Integer subjectId) {
        Map<String, Object> dashboard = new HashMap<>();
        
        if (gainers == null || gainers) {
            List<DashboardResultDTO> topGainers = resultsRepository.findTopGainers(
                    classUuid, sectionUuid, examType, subjectId);
            
            Map<String, List<DashboardResultDTO>> gainersByClassSection = topGainers.stream()
                    .collect(Collectors.groupingBy(
                            dto -> dto.getMasterClassUuid() + "_" + dto.getMasterSectionUuid(),
                            Collectors.collectingAndThen(
                                    Collectors.toList(),
                                    list -> list.stream().limit(3).collect(Collectors.toList())
                            )
                    ));
            
            dashboard.put("topGainers", gainersByClassSection);
        }
        
        if (loosers == null || loosers) {
            List<DashboardResultDTO> topLoosers = resultsRepository.findTopLoosers(
                    classUuid, sectionUuid, examType, subjectId);
            
            Map<String, List<DashboardResultDTO>> loosersByClassSection = topLoosers.stream()
                    .collect(Collectors.groupingBy(
                            dto -> dto.getMasterClassUuid() + "_" + dto.getMasterSectionUuid(),
                            Collectors.collectingAndThen(
                                    Collectors.toList(),
                                    list -> list.stream().limit(3).collect(Collectors.toList())
                            )
                    ));
            
            dashboard.put("topLoosers", loosersByClassSection);
        }
        
        return dashboard;
    }
}

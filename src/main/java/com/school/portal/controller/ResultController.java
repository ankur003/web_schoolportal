package com.school.portal.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.domain.Results;
import com.school.portal.enums.ExamType;
import com.school.portal.requests.ResultRequestDTO;
import com.school.portal.response.ResultResponseDTO;
import com.school.portal.service.ResultService;

@RestController
@RequestMapping("/api/v1/results")
@CrossOrigin("*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @GetMapping
    public ResponseEntity<List<ResultResponseDTO>> getResults(
            @RequestParam(required = false) String userUuid,
            @RequestParam(required = false) String classUuid,
            @RequestParam(required = false) String sectionUuid,
            @RequestParam(required = false) ExamType examType,
            @RequestParam(required = false) Boolean isFailed) {
        
        List<ResultResponseDTO> results = resultService.getResults(
                userUuid, classUuid, sectionUuid, examType, isFailed);
        
        return ResponseEntity.ok(results);
    }

    @PutMapping
    public ResponseEntity<Results> saveOrUpdateResult(@RequestBody ResultRequestDTO requestDTO) {
        Results result = resultService.saveOrUpdateResult(requestDTO);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(
            @RequestParam(required = false) String classUuid,
            @RequestParam(required = false) String sectionUuid,
            @RequestParam(required = false) Boolean loosers,
            @RequestParam(required = false) Boolean gainers,
            @RequestParam(required = false) ExamType examType,
            @RequestParam(required = false) Integer subjectId) {
        
        Map<String, Object> dashboard = resultService.getDashboardData(
                classUuid, sectionUuid, loosers, gainers, examType, subjectId);
        
        return ResponseEntity.ok(dashboard);
    }
}

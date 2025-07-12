package com.school.portal.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.User;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.StudentParentLinkService;
import com.school.portal.utils.ModelMapperUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/student-parent-link")
public class StudentParentLinkController extends AbstractController {

    @Autowired
    private StudentParentLinkService studentParentLinkService;

    // return students of the parant.
    @GetMapping("/by-parent/{parentUuid}")
    public ResponseEntity<Object> getStudentParentLinksByParentId(@PathVariable String parentUuid) {
        List<User> students = studentParentLinkService.getStudentParentLinksByParentUuid(parentUuid);
        return map(students);
    }
    
	@GetMapping("/by-student/{studentUuid}")
    public ResponseEntity<Object> getStudentParentLinksByStudentId(@PathVariable String studentUuid) {
        List<User> parents = studentParentLinkService.getStudentParentLinksByStudentUuid(studentUuid);
        return map(parents);
    }
	
	private ResponseEntity<Object> map(List<User> usersData) {
    	List<UserResponseModel> userResponseModel = ModelMapperUtil.mapList(modelMapper, usersData , UserResponseModel.class);
		userResponseModel.forEach(model -> 
		    usersData.stream()
		            .filter(usr -> usr.getUserUuid().equals(model.getUserUuid())
		            		&& usr.getMasterClass() != null
		            		&& usr.getMasterSection() != null
		            		).findFirst()
		            .ifPresent(usr -> {
		                model.setClassName(usr.getMasterClass().getClassName());
		                model.setSectionName(usr.getMasterSection().getSectionName());
		            })
		);
		return ResponseEntity.ok(userResponseModel);
	}
    
    
    
}

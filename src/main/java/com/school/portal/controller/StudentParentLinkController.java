package com.school.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.portal.AbstractController;
import com.school.portal.domain.User;
import com.school.portal.response.UserResponseModel;
import com.school.portal.service.StudentParentLinkService;
import com.school.portal.service.UserService;
import com.school.portal.utils.ModelMapperUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/student-parent-link")
public class StudentParentLinkController extends AbstractController {

    @Autowired
    private StudentParentLinkService studentParentLinkService;
    
    @Autowired
    private UserService userService;

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
	
	@PutMapping("/student/{studentUuid}/parent/{parantUuid}")
    public ResponseEntity<Object> linkParantToStudent(@PathVariable String studentUuid, @PathVariable String parantUuid) {
		User parent = userService.getUserDetailByUuid(parantUuid);
		User student = userService.getUserDetailByUuid(studentUuid);
		if (parent != null && student != null) {
			studentParentLinkService.linkParantToStudent(parent.getUserId(), student.getUserId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.badRequest().build();
    }
	
	@DeleteMapping("/student/{studentUuid}/parent/{parantUuid}")
    public ResponseEntity<Object> delinkParantToStudent(@PathVariable String studentUuid, @PathVariable String parantUuid) {
		User parent = userService.getUserDetailByUuid(parantUuid);
		User student = userService.getUserDetailByUuid(studentUuid);
		if (parent != null && student != null) {
			studentParentLinkService.delinkParantToStudent(parent.getUserId(), student.getUserId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.badRequest().build();
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
		                model.setMasterClassUuid(usr.getMasterClass().getMasterClassUuid());
		                model.setMasterSectionUuid(usr.getMasterSection().getMasterSectionUuid());
		            })
		);
		return ResponseEntity.ok(userResponseModel);
	}
    
    
    
}

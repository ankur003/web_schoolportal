package com.school.portal.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "localhost:4200")
@RestController(value = "/user")
public class UserController {
	
	@GetMapping("/getString")
	public String getString() {
		return "Mr. BANSALA";
	}

}

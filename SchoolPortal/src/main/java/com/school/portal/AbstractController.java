package com.school.portal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;

import com.school.portal.facade.AuthenticationFacade;

@Validated
public abstract class AbstractController {
	
    @Autowired
    public ModelMapper modelMapper;
    
	@Autowired
	public AuthenticationFacade authenticationFacade;
	
}

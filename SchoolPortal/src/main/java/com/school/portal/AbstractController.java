package com.school.portal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.school.portal.facade.AuthenticationFacade;

public abstract class AbstractController {
	
    @Autowired
    public ModelMapper modelMapper;
    
	@Autowired
	public AuthenticationFacade authenticationFacade;
	
}

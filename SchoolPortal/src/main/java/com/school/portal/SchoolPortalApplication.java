package com.school.portal;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.school.portal.domain.Role;
import com.school.portal.domain.User;
import com.school.portal.enums.UserType;
import com.school.portal.repo.RoleRepo;
import com.school.portal.repo.UserRepo;
import com.school.portal.utils.SchoolPortalUtils;

@SpringBootApplication
public class SchoolPortalApplication {
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	public static void main(String[] args) {
		SpringApplication.run(SchoolPortalApplication.class, args);
	}
	
	@PostConstruct
	public void addRoles() {
		if (roleRepo.findAll().isEmpty()) {
			Stream.of(UserType.values()).forEach(usertype -> {
				Role role = new Role();
				role.setName(usertype.name());
				roleRepo.save(role);
			});
		}
		
		User user =  userRepo.findByUsernameAndIsActive("admin@schoolportal.com", true);
		if (user != null) { 
			return;
		}
		user = new User();
		user.setPassword(encoder.encode("superadmin"));
		
		Set<Role> roles = new HashSet<>();
		roles.add(roleRepo.findByName(UserType.SUPER_ADMIN.name()));
		user.setRoles(roles);
		
		user.setUsername("admin@schoolportal.com");
		user.setDoj(LocalDate.now());
		user.setUserType(UserType.SUPER_ADMIN.name());
		user.setIsSuperAdmin(true);
		user.setIsActive(true);
		user.setUserUuid(SchoolPortalUtils.getUniqueUuid());
		userRepo.save(user);
		
	}
	
	@Bean
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
		  .setFieldMatchingEnabled(true)
		  .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
		return modelMapper;
	}

}

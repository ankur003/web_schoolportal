package com.school.portal;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.Role;
import com.school.portal.domain.Subject;
import com.school.portal.domain.User;
import com.school.portal.enums.AcademicYear;
import com.school.portal.enums.UserType;
import com.school.portal.repo.MasterClassRepo;
import com.school.portal.repo.MasterSectionRepo;
import com.school.portal.repo.RoleRepo;
import com.school.portal.repo.SubjectRepository;
import com.school.portal.repo.UserRepo;
import com.school.portal.utils.SchoolPortalUtils;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SchoolPortalApplication {
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private MasterSectionRepo masterSectionRepo;
	
	@Autowired
	private MasterClassRepo masterClassRepo;
	
	@Autowired
	private SubjectRepository subjetRepo;

	public static void main(String[] args) {
		SpringApplication.run(SchoolPortalApplication.class, args);
	}
	
	@Autowired
    private DatabaseService databaseService;
	
	@PostConstruct
	public void onStartUpTasks() {
		addRoles();
		createMasterClass();
		createMasterSection();
		createDefaultSubjects();
	}
	
	public void addRoles() {
		//databaseService.deleteTable("holidays");
		if (roleRepo.findAll().isEmpty()) {
			Stream.of(UserType.values()).forEach(usertype -> {
				Role role = new Role();
				role.setName(usertype.name());
				roleRepo.save(role);
			});
		}
		
		User user =  userRepo.findByUsernameAndIsActive("admin@schoolportal.com", true);
		if (user != null) { 
			user.setPassword(encoder.encode("superadmin"));
			userRepo.save(user);
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
	
	
	public void createMasterClass() {
		String currentAcademicYear = SchoolPortalUtils.getCurrentAcademicYear();
	    AcademicYear academicYearEnum = AcademicYear.valueOf(currentAcademicYear);
	    
        List<String> classNames = Arrays.asList("PRE-NURSERY", "NURSERY", "L.K.G", "U.K.G", "1st", "2nd",
        		"3rd", "4th", "5th", "6th", "7th", "8th");

        for (String className : classNames) {
        	MasterClass masterClass = masterClassRepo.findByIsActiveAndAcademicYearAndClassName(true, academicYearEnum, className);
        	if (masterClass == null) {
        		masterClass = new MasterClass ();
        		masterClass.setClassName (className);
        		masterClass.setMasterClassUuid (SchoolPortalUtils.getUniqueUuid ());
        		masterClass.setCreatedAt (LocalDateTime.now ());
        		masterClass.setUpdatedAt (LocalDateTime.now ());
        		masterClass.setCreatedBy ("admin@schoolportal.com");
        		masterClass.setAcademicYear (academicYearEnum);
        		masterClass.setIsActive(true);
        		masterClassRepo.save (masterClass);
        	}
        	
        } 
        
	}
	
	
	public void createMasterSection() {
		String currentAcademicYear = SchoolPortalUtils.getCurrentAcademicYear();
	    AcademicYear academicYearEnum = AcademicYear.valueOf(currentAcademicYear);
	    
        List<String> sectionNames = Arrays.asList("A", "B", "C", "D", "E", "F");

        for (String secName : sectionNames) {
        	MasterSection masterSection = masterSectionRepo.findByIsActiveAndAcademicYearAndSectionName(true, academicYearEnum, secName);
        	if (masterSection == null) {
        		masterSection = new MasterSection ();
        		masterSection.setSectionName (secName);
        		masterSection.setMasterSectionUuid (SchoolPortalUtils.getUniqueUuid ());
        		masterSection.setCreatedAt (LocalDateTime.now ());
    			masterSection.setUpdatedAt (LocalDateTime.now ());
    			masterSection.setCreatedBy ("admin@schoolportal.com");
    			masterSection.setAcademicYear (academicYearEnum);
    			masterSection.setIsActive(true);
    			masterSectionRepo.save (masterSection);
        	}
        }
	    
}
	
	public void createDefaultSubjects() {
	    String currentAcademicYearStr = SchoolPortalUtils.getCurrentAcademicYear();
	    AcademicYear currentAcademicYear = AcademicYear.valueOf(currentAcademicYearStr);

	    List<String> defaultSubjects = Arrays.asList("Math", "Science", "English", "Hindi", "Social Studies");

	    for (String subjectName : defaultSubjects) {
	        Subject existingSubject = subjetRepo.findBySubjectNameAndAcademicYearAndIsActive(
	            subjectName, currentAcademicYear, true
	        );

	        if (existingSubject == null) {
	            Subject subject = new Subject();
	            subject.setSubjectName(subjectName);
	            subject.setSubjectCode(subjectName.substring(0, Math.min(3, subjectName.length())).toUpperCase());
	            subject.setDescription(subjectName);
	            subject.setAcademicYear(currentAcademicYear);
	            subject.setCreatedAt(LocalDateTime.now());
	            subject.setUpdatedAt(LocalDateTime.now());
	            subject.setIsActive(true);
	            subjetRepo.save(subject);
	        }
	    }
	}

	
	@Bean
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
		  .setFieldMatchingEnabled(true)
		  .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);
		return modelMapper;
	}

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
	    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 👈 Important
		return mapper;
	}

}

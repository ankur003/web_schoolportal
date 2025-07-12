package com.school.portal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.portal.domain.StudentParentLink;

@Repository
public interface StudentParentLinkRepository extends JpaRepository<StudentParentLink, Long> {
    List<StudentParentLink> findByParentId(Long parentId);
    
    List<StudentParentLink> findByStudentId(Long studentId);
    
    List<StudentParentLink> findByStudentIdAndParentId(Long studentId, Long parentId);

}
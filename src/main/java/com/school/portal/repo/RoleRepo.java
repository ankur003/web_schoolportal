package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school.portal.domain.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {

	Role findByName(String name);
}

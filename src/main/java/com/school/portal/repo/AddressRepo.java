package com.school.portal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.school.portal.domain.Address;
import com.school.portal.domain.User;

public interface AddressRepo extends JpaRepository<Address, Long> , PagingAndSortingRepository<Address, Long>, JpaSpecificationExecutor<Address> {

	Address findByUser(User user);
	
	
}
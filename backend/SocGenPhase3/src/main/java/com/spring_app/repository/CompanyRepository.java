package com.siddhartha.SocGenPhase3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.siddhartha.SocGenPhase3.entity.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {
	
	@Query("SELECT c FROM CompanyEntity c WHERE c.companycode= ?1")
	CompanyEntity findByAField(String ccode);
}

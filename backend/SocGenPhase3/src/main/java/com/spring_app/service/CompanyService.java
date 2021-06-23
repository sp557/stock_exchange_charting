package com.siddhartha.SocGenPhase3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.CompanyEntity;
import com.siddhartha.SocGenPhase3.repository.CompanyRepository;

@Service
public class CompanyService {
	
	@Autowired
	CompanyRepository comRepo;
	
	public List<CompanyEntity> getAllCompanies() {
		return comRepo.findAll();
	}
	
	public CompanyEntity getCompanyById(int id) {
		return comRepo.findById(id).orElse(null);
	}
	
	public CompanyEntity editCompany(CompanyEntity company, int id) {
		CompanyEntity existingCompany = comRepo.findById(id).orElse(null);
		existingCompany.setTurnover(company.getTurnover());
		existingCompany.setName(company.getName());
		existingCompany.setBrief(company.getBrief());
		existingCompany.setCeoname(company.getCeoname());
		existingCompany.setBoardDirectors(company.getBoardDirectors());
		existingCompany.setSector(company.getSector());
		return comRepo.save(existingCompany);
	}
	
	public CompanyEntity newCompany(CompanyEntity company) {
		return comRepo.save(company);
	}
	
	public void deleteCompany(int id) {
		comRepo.deleteById(id);
	}

}

package com.siddhartha.SocGenPhase3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.PlannedIposEntity;
import com.siddhartha.SocGenPhase3.repository.PlannedIposRepository;

@Service
public class PlannedIposService {
	
	@Autowired
	PlannedIposRepository ipoRepo;
	
	public List<PlannedIposEntity> getAllPlannedIpos() {
		return ipoRepo.findAll();
	}
	
	public PlannedIposEntity getPlannedIposById(int id) {
		return ipoRepo.findById(id).orElse(null);
	}
	
	public PlannedIposEntity editPlannedIpos(PlannedIposEntity plannedIpo, int id) {
		PlannedIposEntity existingIpo = ipoRepo.findById(id).orElse(null);
		existingIpo.setPrice(plannedIpo.getPrice());
		existingIpo.setRemarks(plannedIpo.getRemarks());
		existingIpo.setTotalNumber(plannedIpo.getTotalNumber());
		existingIpo.setTimestamp(plannedIpo.getTimestamp());
		existingIpo.setCompany(plannedIpo.getCompany());
		existingIpo.setStockExchange(plannedIpo.getStockExchange());
		return ipoRepo.save(existingIpo);
	}

	
	public PlannedIposEntity newPlannedIpos(PlannedIposEntity plannedIpo) {
		return ipoRepo.save(plannedIpo);
	}
	
	public void deletePlannedIpos(int id) {
		ipoRepo.deleteById(id);
	}

}

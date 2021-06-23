package com.siddhartha.SocGenPhase3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.SectorEntity;
import com.siddhartha.SocGenPhase3.repository.SectorRepository;

@Service
public class SectorService {
	
	@Autowired
	SectorRepository secRepo;
	
	public List<SectorEntity> getAllSectors() {
		return secRepo.findAll();
	}
	
	public SectorEntity getSectorById(int id) {
		return secRepo.findById(id).orElse(null);
	}
	
	public SectorEntity editSector(SectorEntity sector, int id) {
		SectorEntity existingSector = secRepo.findById(id).orElse(null);
		existingSector.setSectorBrief(sector.getSectorBrief());
		existingSector.setSectorName(sector.getSectorName());
		return secRepo.save(existingSector);
	}
	
	public SectorEntity newSector(SectorEntity sector) {
		return secRepo.save(sector);
	}
	
	public void deleteSector(int id) {
		secRepo.deleteById(id);
	}


}

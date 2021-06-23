package com.siddhartha.SocGenPhase3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siddhartha.SocGenPhase3.entity.SectorEntity;
import com.siddhartha.SocGenPhase3.service.SectorService;

@RestController
public class SectorController {
	
	@Autowired
	SectorService ss;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/sector/all", method=RequestMethod.GET)
	public List<SectorEntity> getAllSectors(){
		System.out.println("sectors sent");
		return ss.getAllSectors();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/sector/{id}/show", method=RequestMethod.GET)
	public SectorEntity getSectorById(@PathVariable int id){
		return ss.getSectorById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/sector/{id}/edit", method=RequestMethod.PUT)
	public String updateSector(@PathVariable int id, @RequestBody SectorEntity sector){
		if(ss.getSectorById(id)==null) return "sector does not exist";
		ss.editSector(sector, id);
		return sector.toString() + "has been edited successfully";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/sector/new", method=RequestMethod.POST)
	public SectorEntity saveSector(@RequestBody SectorEntity sector){
		return ss.newSector(sector);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/sector/{id}/delete", method=RequestMethod.DELETE)
	public void deleteSector(@PathVariable int id){
		ss.deleteSector(id);
	}


}

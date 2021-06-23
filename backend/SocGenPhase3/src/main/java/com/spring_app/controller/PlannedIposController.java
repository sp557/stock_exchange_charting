package com.siddhartha.SocGenPhase3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siddhartha.SocGenPhase3.entity.PlannedIposEntity;
import com.siddhartha.SocGenPhase3.service.PlannedIposService;

@RestController
public class PlannedIposController {
	
	@Autowired
	PlannedIposService ps;
	
	@CrossOrigin(origins = "*", allowedHeaders = "*", methods=RequestMethod.GET)
	@RequestMapping(value="/ipo/all", method=RequestMethod.GET)
	public List<PlannedIposEntity> getAllIpos(){
		System.out.println("ipos sent");
		return ps.getAllPlannedIpos();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/ipo/{id}/show", method=RequestMethod.GET)
	public PlannedIposEntity getIpoById(@PathVariable int id){
		return ps.getPlannedIposById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/ipo/{id}/edit", method=RequestMethod.PUT)
	public String updateIpo(@PathVariable int id, @RequestBody PlannedIposEntity ipo){
		if(ps.getPlannedIposById(id)==null) return "ipo does not exist";
		ps.editPlannedIpos(ipo, id);
		return ipo.toString() + "has been edited successfully";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/ipo/new", method=RequestMethod.POST)
	public PlannedIposEntity saveCompany(@RequestBody PlannedIposEntity ipo){
		return ps.newPlannedIpos(ipo);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/ipo/{id}/delete", method=RequestMethod.DELETE)
	public void deleteIpo(@PathVariable int id){
		ps.deletePlannedIpos(id);
	}

}

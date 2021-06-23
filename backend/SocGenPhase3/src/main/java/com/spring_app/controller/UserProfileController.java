package com.siddhartha.SocGenPhase3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siddhartha.SocGenPhase3.entity.UserEntity;
import com.siddhartha.SocGenPhase3.service.UserService;

@RestController
public class UserProfileController {
	
	@Autowired
	UserService us;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/myprofile/{name}", method=RequestMethod.GET)
	public UserEntity getUser(@PathVariable String name){
		UserEntity theuser =  us.getUserDetail(name);
		System.out.println("profile controller was called" + theuser + name);
		
		return theuser;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/myprofile/{name}/edit", method=RequestMethod.PUT)
	public void updateUser(@PathVariable String name, @RequestBody UserEntity user){
		us.updateUserDetail(user);
	}

}

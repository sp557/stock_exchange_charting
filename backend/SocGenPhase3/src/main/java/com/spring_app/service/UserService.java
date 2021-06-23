package com.siddhartha.SocGenPhase3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.UserEntity;
import com.siddhartha.SocGenPhase3.helper.CustomUserDetails;
import com.siddhartha.SocGenPhase3.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	UserRepository userRepo;
		
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		final UserEntity user = userRepo.findByUsername(username);
		if(user==null) {
			throw new UsernameNotFoundException("Username doesn't exist");
		}
		else {
			return new CustomUserDetails(user);
		}
	}

	public UserEntity getUserDetail(String name) {
		return userRepo.findByUsername(name);
	}
	
	public void updateUserDetail(UserEntity user) {
		UserEntity existingUser = userRepo.findByUsername(user.getUsername());
		existingUser.setPassword(user.getPassword());
		existingUser.setMobile(user.getMobile());
		existingUser.setUsername(user.getUsername());
	}
	
	public void registerUser(UserEntity user) throws Exception {
		if(userRepo.findByUsername(user.getUsername())!=null) {
			throw new Exception("User Already Exist!");
		}
		else userRepo.save(user);
	}

}

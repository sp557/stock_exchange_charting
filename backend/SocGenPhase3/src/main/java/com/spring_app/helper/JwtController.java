package com.siddhartha.SocGenPhase3.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siddhartha.SocGenPhase3.entity.UserEntity;
import com.siddhartha.SocGenPhase3.service.UserService;

@RestController
public class JwtController {
	
	@Autowired
	private AuthenticationManager authenticationManagaer;
	
	@Autowired
	private UserService us;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/login", method=RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		System.out.println(jwtRequest);
		try {
			
			this.authenticationManagaer.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
			
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Bad Credentials");
		}catch (BadCredentialsException e) {
			e.printStackTrace();
			throw new Exception("Galat hai bhai");
		}
		
		UserDetails userDetails = this.us.loadUserByUsername(jwtRequest.getUsername());
		
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/register", method=RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody UserEntity newUser) throws Exception{
		System.out.println(newUser);
		
		us.registerUser(newUser);
		try {
			
			this.authenticationManagaer.authenticate(new UsernamePasswordAuthenticationToken(newUser.getUsername(), newUser.getPassword()));
			
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Bad Credentials");
		}catch (BadCredentialsException e) {
			e.printStackTrace();
			throw new Exception("Galat hai bhai");
		}
		
		UserDetails userDetails = this.us.loadUserByUsername(newUser.getUsername());
		
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}

}

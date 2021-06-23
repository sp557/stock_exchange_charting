package com.siddhartha.SocGenPhase3.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.siddhartha.SocGenPhase3.helper.JwtUtil;
import com.siddhartha.SocGenPhase3.service.UserService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserService us;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String reqTokenHeader = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;
		
		if(reqTokenHeader!=null && reqTokenHeader.startsWith("Bearer ")) {
			jwtToken = reqTokenHeader.substring(7);
			System.out.println(jwtToken + " HELLO ");
			try {
				username = this.jwtUtil.getUsernameFromToken(jwtToken);
			}catch(Exception e) {
				e.printStackTrace();
			}
			
			UserDetails userDetails = this.us.loadUserByUsername(username);
			
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				//System.out.println(username + "HELLO SHUKLA JI jjj");
			}else {
				System.out.println("token galt hai");
			}
			
		}
		filterChain.doFilter(request, response);
		
	}
	 
	
	 

}

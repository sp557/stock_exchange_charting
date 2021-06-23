package com.siddhartha.SocGenPhase3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siddhartha.SocGenPhase3.entity.StockExchangeEntity;
import com.siddhartha.SocGenPhase3.service.StockExchangeService;

@RestController
public class StockExchangeController {
	
	@Autowired
	StockExchangeService ses;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stockexchanges/all", method=RequestMethod.GET)
	public List<StockExchangeEntity> getAllExchanges(){
		System.out.println("exchanges sent");
		return ses.getAllExchanges();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stockexchanges/{id}/show", method=RequestMethod.GET)
	public StockExchangeEntity getExchangeById(@PathVariable int id){
		return ses.getExchangeById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stockexchanges/{id}/edit", method=RequestMethod.PUT)
	public String updateExchange(@PathVariable int id, @RequestBody StockExchangeEntity exchange){
		if(ses.getExchangeById(id)==null) return "exchange does not exist";
		ses.editExchange(exchange, id);
		return exchange.toString() + "has been edited successfully";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")	
	@RequestMapping(value="/stockexchanges/new", method=RequestMethod.POST)
	public StockExchangeEntity saveExchange(@RequestBody StockExchangeEntity exchange){
		return ses.newExchange(exchange);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stockexchanges/{id}/delete", method=RequestMethod.DELETE)
	public void deleteSector(@PathVariable int id){
		ses.deleteExchange(id);
	}

}

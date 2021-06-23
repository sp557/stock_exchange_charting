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
import com.siddhartha.SocGenPhase3.entity.StocksEntity;
import com.siddhartha.SocGenPhase3.service.StocksService;

@RestController
public class StocksController {
	
	@Autowired
	StocksService sts;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stocks/all", method=RequestMethod.GET)
	public List<StocksEntity> getAllStocks(){
		System.out.println("stocks sent");
		return sts.getAllStocks();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stocks/{id}/show", method=RequestMethod.GET)
	public StocksEntity getStockById(@PathVariable int id){
		return sts.getStockById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stocks/{id}/edit", method=RequestMethod.PUT)
	public String updateStocks(@PathVariable int id, @RequestBody StocksEntity stock){
		if(sts.getStockById(id)==null) return "stock does not exist";
		sts.editStock(stock, id);
		return stock.toString() + "has been edited successfully";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stocks/new", method=RequestMethod.POST)
	public StocksEntity saveStock(@RequestBody StocksEntity stock){
		return sts.newStock(stock);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/stocks/{id}/delete", method=RequestMethod.DELETE)
	public void deleteStock(@PathVariable int id){
		sts.deleteStock(id);
	}

}

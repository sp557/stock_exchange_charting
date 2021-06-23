package com.siddhartha.SocGenPhase3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.StockExchangeEntity;
import com.siddhartha.SocGenPhase3.repository.StockExchangeRepository;

@Service
public class StockExchangeService {
	
	@Autowired
	StockExchangeRepository exchangeRepo;
	
	public List<StockExchangeEntity> getAllExchanges() {
		return exchangeRepo.findAll();
	}
	
	public StockExchangeEntity getExchangeById(int id) {
		return exchangeRepo.findById(id).orElse(null);
	}
	
	public StockExchangeEntity editExchange(StockExchangeEntity exchange, int id) {
		StockExchangeEntity existingExchange = exchangeRepo.findById(id).orElse(null);
		existingExchange.setAddress(exchange.getAddress());
		existingExchange.setIntro(exchange.getIntro());
		existingExchange.setName(exchange.getName());
		existingExchange.setRemarks(exchange.getRemarks());
		return exchangeRepo.save(existingExchange);
	}
	
	public StockExchangeEntity newExchange(StockExchangeEntity exchange) {
		return exchangeRepo.save(exchange);
	}
	
	public void deleteExchange(int id) {
		exchangeRepo.deleteById(id);
	}


}

package com.siddhartha.SocGenPhase3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siddhartha.SocGenPhase3.entity.StocksEntity;
import com.siddhartha.SocGenPhase3.repository.StocksRepository;

@Service
public class StocksService {
	
	@Autowired
	StocksRepository stockRepo;
	
	public List<StocksEntity> getAllStocks() {
		return stockRepo.findAll();
	}
	
	public StocksEntity getStockById(int id) {
		return stockRepo.findById(id).orElse(null);
	}
	
	public StocksEntity editStock(StocksEntity stock, int id) {
		StocksEntity existingStock = stockRepo.findById(id).orElse(null);
		existingStock.setDate(stock.getDate());
		existingStock.setPrice(stock.getPrice());
		existingStock.setTime(stock.getTime());
		existingStock.setCompany(stock.getCompany());
		existingStock.setStockExchange(stock.getStockExchange());
		return stockRepo.save(existingStock);
	}
	
	public StocksEntity newStock(StocksEntity stock) {
		return stockRepo.save(stock);
	}
	
	public void deleteStock(int id) {
		stockRepo.deleteById(id);
	}


}

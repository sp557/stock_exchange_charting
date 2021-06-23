package com.siddhartha.SocGenPhase3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siddhartha.SocGenPhase3.entity.StockExchangeEntity;

public interface StockExchangeRepository extends JpaRepository<StockExchangeEntity, Integer> {
	
	public StockExchangeEntity getByName(String name);
}

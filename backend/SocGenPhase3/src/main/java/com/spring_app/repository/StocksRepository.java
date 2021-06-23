package com.siddhartha.SocGenPhase3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siddhartha.SocGenPhase3.entity.StocksEntity;

public interface StocksRepository extends JpaRepository<StocksEntity, Integer> {

}

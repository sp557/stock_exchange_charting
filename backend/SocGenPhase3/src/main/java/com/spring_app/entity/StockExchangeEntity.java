package com.siddhartha.SocGenPhase3.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="stock_exchange_details")
public class StockExchangeEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Stock_Exchange_Id", nullable=false)
	private int id;
	
	@Column(name = "Stock_Exchange_Name", nullable=false)
	private String name;
	
	@Column(name = "Introduction")
	private String intro;
	
	@Column(name = "Stock_Exchange_Address", nullable=false)
	private String address;
	
	@Column(name = "Remarks")
	private String remarks;
	
	@OneToMany(mappedBy = "stockExchange", orphanRemoval=false, cascade=CascadeType.ALL)
	@JsonIgnore
	private List<PlannedIposEntity> plannedIpos = new ArrayList<>();
	
	@OneToMany(mappedBy="stockExchange", orphanRemoval=false, cascade=CascadeType.ALL)
	@JsonIgnore
	private List<StocksEntity> stocks = new ArrayList<>();
	
	StockExchangeEntity(){
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "StockExchangeEntity [id=" + id + ", name=" + name + ", intro=" + intro + ", address=" + address
				+ ", remarks=" + remarks + "]";
	}
	
	

	
}

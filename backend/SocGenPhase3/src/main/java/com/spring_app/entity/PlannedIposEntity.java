package com.siddhartha.SocGenPhase3.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="ipos_planned")
public class PlannedIposEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Ipo_Id", nullable=false)
	private int id;
	
	@Column(name="Ipo_Price", nullable=false)
	private float price;
	
	@Column(name="Total_no_of_ipos", nullable=false)
	private int totalNumber;
	
	@Column(name="open_date_time", nullable=false)
	private String timestamp;
	
	@Column(name="remarks", nullable=false)
	private String remarks;
	
	@ManyToOne
	@JoinColumn(name="company_id")
	private CompanyEntity company;
	
	@ManyToOne
	@JoinColumn(name="stock_exchange_id")
	private StockExchangeEntity stockExchange;
	
	PlannedIposEntity(){
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getTotalNumber() {
		return totalNumber;
	}

	public void setTotalNumber(int totalNumber) {
		this.totalNumber = totalNumber;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public CompanyEntity getCompany() {
		return company;
	}

	public void setCompany(CompanyEntity company) {
		this.company = company;
	}

	public StockExchangeEntity getStockExchange() {
		return stockExchange;
	}

	public void setStockExchange(StockExchangeEntity stockExchange) {
		this.stockExchange = stockExchange;
	}

	@Override
	public String toString() {
		return "PlannedIposEntity [id=" + id + ", Price=" + price + ", totalNumber=" + totalNumber + ", timestamp="
				+ timestamp + ", remarks=" + remarks + ", company=" + company + ", stockExchange=" + stockExchange
				+ "]";
	}
	
	
}

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
@Table (name = "Stock_Details")
public class StocksEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Stock_Id", nullable=false)
	private int id;
	
	@Column(name="Stock_Price", nullable=false)
	private float Price;
	
	@Column(name="stock_date", nullable=false)
	private String date;
	
	@Column(name="stock_time", nullable=false)
	private String time;
	
	@ManyToOne
	@JoinColumn(name="company_id")
	private CompanyEntity company;
	
	@ManyToOne
	@JoinColumn(name="stock_exchange_id")
	private StockExchangeEntity stockExchange;
	


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getPrice() {
		return Price;
	}

	public void setPrice(float price) {
		Price = price;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
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
		return "StocksEntity [id=" + id + ", Price=" + Price + ", date=" + date + ", time=" + time + ", company="
				+ company + ", stockExchange=" + stockExchange + "]";
	}

	public StocksEntity() {
		super();
	}

	
	

}

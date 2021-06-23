package com.siddhartha.SocGenPhase3.ExcelUploader;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="temp_empty_ignore_it")
public class ExcelFormat {
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name = "Companycode")
	private String companycode;
	
	@Column(name = "Stockexchangename")
	private String exchangename;
	
	@Column(name = "Pricepershare")
	private String price;
	
	@Column(name = "Date")
	private String date;
	
	@Column(name ="Time")
	private String time;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCompanycode() {
		return companycode;
	}

	public void setCompanycode(String companycode) {
		this.companycode = companycode;
	}

	public String getExchangename() {
		return exchangename;
	}

	public void setExchangename(String exchangename) {
		this.exchangename = exchangename;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
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

	public ExcelFormat(String companycode, String exchangename, String price, String date, String time) {
		super();
		this.companycode = companycode;
		this.exchangename = exchangename;
		this.price = price;
		this.date = date;
		this.time = time;
	}

	public ExcelFormat() {
		super();
	}

	@Override
	public String toString() {
		return "ExcelFormat [id=" + id + ", companycode=" + companycode + ", exchangename=" + exchangename + ", price="
				+ price + ", date=" + date + ", time=" + time + "]";
	}
	
	
	

}

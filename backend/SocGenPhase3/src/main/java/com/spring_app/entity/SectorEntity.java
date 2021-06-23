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
@Table (name = "Sectors_Details")
public class SectorEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="sector_id", nullable=false)
	private int id;
	
	@Column(nullable=false)
	private String sectorName;
	
	@Column(name="brief")
	private String sectorBrief;
	
	@OneToMany(mappedBy = "sector", orphanRemoval=false, cascade=CascadeType.ALL)
	@JsonIgnore
	private List<CompanyEntity> companies = new ArrayList<>();
	
	SectorEntity(){
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSectorName() {
		return sectorName;
	}

	public void setSectorName(String sectorName) {
		this.sectorName = sectorName;
	}

	public String getSectorBrief() {
		return sectorBrief;
	}

	public void setSectorBrief(String sectorBrief) {
		this.sectorBrief = sectorBrief;
	}

	public List<CompanyEntity> getCompanies() {
		return companies;
	}

	public void addCompany(CompanyEntity company) {
		this.companies.add(company);
	}

	public void removeCompany(CompanyEntity company) {
		this.companies.remove(company);
	}

	public void setCompanies(List<CompanyEntity> companies) {
		this.companies = companies;
	}

	@Override
	public String toString() {
		return "SectorEntity [id=" + id + ", sectorName=" + sectorName + ", sectorBrief=" + sectorBrief + "]";
	}
	
	
	

}


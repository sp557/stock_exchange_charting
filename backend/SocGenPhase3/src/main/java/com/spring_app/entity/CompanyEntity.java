package com.siddhartha.SocGenPhase3.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table (name = "Company_Details")
public class CompanyEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Company_Id", nullable=false)
	private int id;
	
	@Column(name = "Company_Code", nullable=false)
	private String companycode;
	
	@Column(name = "Company_Name", nullable=false)
	private String name;
	
	@Column(name = "CEO_Name")
	private String ceoname;
	
	@Column(name = "Turnover", nullable=false)
	private float turnover;
	
	@Column(name = "Board_Of_Directors")
	private String boardDirectors;
	
	@Column(name = "Brief")
	private String brief;
	
	@ManyToOne
	@JoinColumn(name="sector_id")
	private SectorEntity sector;
	
	@OneToMany(mappedBy = "company", orphanRemoval=false, cascade=CascadeType.ALL)
	@JsonIgnore
	private List<PlannedIposEntity> plannedIpos = new ArrayList<>();

	@OneToMany(mappedBy="company", orphanRemoval=false, cascade=CascadeType.ALL)
	@JsonIgnore
	private List<StocksEntity> stocks = new ArrayList<>();

	
	CompanyEntity(){
	}

	
	
	public CompanyEntity(String name, String ceoname, float turnover, String boardDirectors, String brief,
			SectorEntity sector) {
		super();
		this.name = name;
		this.ceoname = ceoname;
		this.turnover = turnover;
		this.boardDirectors = boardDirectors;
		this.brief = brief;
		this.sector = sector;
	}



	public CompanyEntity(int id, String name, String ceoname, float turnover, String boardDirectors, String brief,
			SectorEntity sector) {
		super();
		this.id = id;
		this.name = name;
		this.ceoname = ceoname;
		this.turnover = turnover;
		this.boardDirectors = boardDirectors;
		this.brief = brief;
		this.sector = sector;
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

	public String getCeoname() {
		return ceoname;
	}

	public void setCeoname(String ceoname) {
		this.ceoname = ceoname;
	}

	public float getTurnover() {
		return turnover;
	}

	public void setTurnover(float turnover) {
		this.turnover = turnover;
	}

	public String getBoardDirectors() {
		return boardDirectors;
	}

	public void setBoardDirectors(String boardDirectors) {
		this.boardDirectors = boardDirectors;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public SectorEntity getSector() {
		return sector;
	}

	public void setSector(SectorEntity sector) {
		this.sector = sector;
	}



	public String getCompanycode() {
		return companycode;
	}



	public void setCompanycode(String companycode) {
		this.companycode = companycode;
	}



	public List<PlannedIposEntity> getPlannedIpos() {
		return plannedIpos;
	}



	public void setPlannedIpos(List<PlannedIposEntity> plannedIpos) {
		this.plannedIpos = plannedIpos;
	}



	public List<StocksEntity> getStocks() {
		return stocks;
	}



	public void setStocks(List<StocksEntity> stocks) {
		this.stocks = stocks;
	}



	@Override
	public String toString() {
		return "CompanyEntity [id=" + id + ", companycode=" + companycode + ", name=" + name + ", ceoname=" + ceoname
				+ ", turnover=" + turnover + ", boardDirectors=" + boardDirectors + ", brief=" + brief + ", sector="
				+ sector + "]";
	}


	
	
	
	
	
}

package com.siddhartha.SocGenPhase3.ExcelUploader;

//import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.siddhartha.SocGenPhase3.entity.CompanyEntity;
import com.siddhartha.SocGenPhase3.entity.StockExchangeEntity;
import com.siddhartha.SocGenPhase3.entity.StocksEntity;
import com.siddhartha.SocGenPhase3.repository.CompanyRepository;
import com.siddhartha.SocGenPhase3.repository.StockExchangeRepository;
import com.siddhartha.SocGenPhase3.repository.StocksRepository;

@Service
public class ExcelService {
	
	 @Autowired
	 ExcelUploadRepository repository;
	 
	 @Autowired
	 CompanyRepository cRepo;
	 
	 @Autowired
	 StockExchangeRepository sRepo;
	 
	 @Autowired
	 StocksRepository stockRepo;

	  public void save(MultipartFile file) {
	    try {
	      List<ExcelFormat> stockRows = ExcelHelper.excelToStockRows(file.getInputStream());
	      List<StocksEntity> allData = new ArrayList<>();
	      for(ExcelFormat row : stockRows) {
	    	  
	    	  //String ccode = row.getCompanycode().replaceAll("[^0-9.]", "");
	    	  //String exchangename = row.getExchangename();
	    	  
	    	  CompanyEntity company = cRepo.findByAField(row.getCompanycode().replaceAll("[^0-9.]", ""));
	    	  StockExchangeEntity exchange= sRepo.getByName(row.getExchangename());
	    	  StocksEntity stock = new StocksEntity();
	    	  stock.setCompany(company);
	    	  stock.setStockExchange(exchange);
	    	  stock.setDate(row.getDate());
	    	  stock.setPrice(Float.parseFloat(row.getPrice()));
	    	  stock.setTime(row.getTime());
	    	  allData.add(stock);
	      }
	      stockRepo.saveAll(allData);
	      //repository.saveAll(stockRows);
	      
	    } catch (IOException e) {
	      throw new RuntimeException("fail to store excel data, type mismatched: " + e.getMessage());
	    }
	  }

//	  public ByteArrayInputStream load() {
//	    List<ExcelFormat> stockRows = repository.findAll();
//
//	    ByteArrayInputStream in = ExcelHelper.stockRowsToExcel(stockRows);
//	    return in;
//	  }

//	  public List<ExcelFormat> getAllstockRows() {
//	    return repository.findAll();
//	  }

}

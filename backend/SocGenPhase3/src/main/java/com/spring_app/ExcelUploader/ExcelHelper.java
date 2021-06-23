package com.siddhartha.SocGenPhase3.ExcelUploader;

//import java.io.ByteArrayInputStream;
//import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class ExcelHelper {
	
	public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	  static String[] HEADERs = { "Id", "Companycode", "Stockexchangename", "Pricepershare", "Date", "Time" };
	  static String SHEET = "Sheet1";

	  public static boolean hasExcelFormat(MultipartFile file) {

	    if (!TYPE.equals(file.getContentType())) {
	      return false;
	    }

	    return true;
	  }

//	  public static ByteArrayInputStream stockRowsToExcel(List<ExcelFormat> stockRows) {
//
//	    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
//	      Sheet sheet = workbook.createSheet(SHEET);
//
//	      // Header
//	      Row headerRow = sheet.createRow(0);
//
//	      for (int col = 0; col < HEADERs.length; col++) {
//	        Cell cell = headerRow.createCell(col);
//	        cell.setCellValue(HEADERs[col]);
//	      }
//
//	      int rowIdx = 1;
//	      for (ExcelFormat stockRow : stockRows) {
//	        Row row = sheet.createRow(rowIdx++);
//	        
//	        //row.createCell(0).setCellValue(stockRow.getId());
//	        row.createCell(0).setCellValue(stockRow.getCompanycode());
//	        row.createCell(1).setCellValue(stockRow.getExchangename());
//	        row.createCell(2).setCellValue(stockRow.getPrice());
//	        row.createCell(3).setCellValue(stockRow.getDate());
//	        row.createCell(4).setCellValue(stockRow.getTime());
//	      }
//
//	      workbook.write(out);
//	      return new ByteArrayInputStream(out.toByteArray());
//	    } catch (IOException e) {
//	      throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
//	    }
//	  }

	  public static List<ExcelFormat> excelToStockRows(InputStream is) {
	    try {
	      Workbook workbook = new XSSFWorkbook(is);

	      Sheet sheet = workbook.getSheet(SHEET);
	      Iterator<Row> rows = sheet.iterator();

	      List<ExcelFormat> stockRows = new ArrayList<ExcelFormat>();

	      int rowNumber = 0;
	      while (rows.hasNext()) {
	        Row currentRow = rows.next();

	        // skip header
	        if (rowNumber == 0) {
	          rowNumber++;
	          continue;
	        }

	        Iterator<Cell> cellsInRow = currentRow.iterator();

	        ExcelFormat stockRow = new ExcelFormat();

	        int cellIdx = 0;
	        while (cellsInRow.hasNext()) {
	          Cell currentCell = cellsInRow.next();

	          switch (cellIdx) {
	          case 0:
	        	  stockRow.setId((int) currentCell.getNumericCellValue());
	            break;
	            
	          case 1:
	        	  stockRow.setCompanycode(currentCell.getStringCellValue());
	            break;

	          case 2:
	        	  stockRow.setExchangename(currentCell.getStringCellValue());
	            break;

	          case 3:
	        	  stockRow.setPrice(String.valueOf(currentCell.getNumericCellValue()));
	            break;

	          case 4:
	        	  stockRow.setDate(String.valueOf(currentCell.getDateCellValue()));
	            break;
	            
	          case 5:
	        	  stockRow.setTime(currentCell.getStringCellValue());
	            break;

	          default:
	            break;
	          }

	          cellIdx++;
	        }

	        stockRows.add(stockRow);
	      }

	      workbook.close();

	      return stockRows;
	    } catch (IOException e) {
	      throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
	    }
	  }

}

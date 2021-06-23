import axios from 'axios';
import authHeader from "./auth-header";

const STOCK_API_BASE_URL = "http://localhost:8080/stocks/";

class StockService {

    getStocks(){
        return axios.get(STOCK_API_BASE_URL+'all', { headers: authHeader() });
    }

    createStock(stock){
        return axios.post(STOCK_API_BASE_URL+'new', stock, { headers: authHeader() });
    }

    getStockById(stockId){
        return axios.get(STOCK_API_BASE_URL + stockId + '/show', { headers: authHeader() });
    }

    updateStock(stock, stockId){
        return axios.put(STOCK_API_BASE_URL + stockId +'/edit', stock, { headers: authHeader() });
    }

    deleteStock(stockId){
        return axios.delete(STOCK_API_BASE_URL + stockId + '/delete', { headers: authHeader() });
    }
}

export default new StockService()
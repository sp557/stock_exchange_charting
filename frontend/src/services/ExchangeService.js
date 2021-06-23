import axios from 'axios';
import authHeader from "./auth-header";

const EXCHANGE_API_BASE_URL = "http://localhost:8080/stockexchanges/";

class ExchangeService {

    getExchanges(){
        return axios.get(EXCHANGE_API_BASE_URL+'all', { headers: authHeader() });
    }

    createExchange(exchange){
        return axios.post(EXCHANGE_API_BASE_URL+'new', exchange, { headers: authHeader() });
    }

    getExchangeById(exchangeId){
        return axios.get(EXCHANGE_API_BASE_URL + exchangeId + '/show', { headers: authHeader() });
    }

    updateExchange(exchange, exchangeId){
        return axios.put(EXCHANGE_API_BASE_URL + exchangeId +'/edit', exchange, { headers: authHeader() });
    }

    deleteExchange(exchangeId){
        return axios.delete(EXCHANGE_API_BASE_URL + exchangeId + '/delete', { headers: authHeader() });
    }
}

export default new ExchangeService()
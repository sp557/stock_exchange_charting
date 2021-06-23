import axios from 'axios';
import authHeader from "./auth-header";

const IPO_API_BASE_URL = "http://localhost:8080/ipo/";

class IpoService {

    getIpos(){
        return axios.get(IPO_API_BASE_URL+'all', { headers: authHeader() });
    }

    createIpo(ipo){
        return axios.post(IPO_API_BASE_URL+'new', ipo, { headers: authHeader() });
    }

    getIpoById(ipoId){
        return axios.get(IPO_API_BASE_URL + ipoId + '/show', { headers: authHeader() });
    }

    updateIpo(ipo, ipoId){
        return axios.put(IPO_API_BASE_URL + ipoId +'/edit', ipo, { headers: authHeader() });
    }

    deleteIpo(ipoId){
        return axios.delete(IPO_API_BASE_URL + ipoId + '/delete', { headers: authHeader() });
    }
}

export default new IpoService()
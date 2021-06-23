import axios from 'axios';
import authHeader from "./auth-header";

const SECTOR_API_BASE_URL = "http://localhost:8080/sector/";

class SectorService {

    getSectors(){
        return axios.get(SECTOR_API_BASE_URL+'all', { headers: authHeader() });
    }

    createSector(sector){
        return axios.post(SECTOR_API_BASE_URL+'new', sector, { headers: authHeader() });
    }

    getSectorById(sectorId){
        return axios.get(SECTOR_API_BASE_URL + sectorId + '/show', { headers: authHeader() });
    }

    updateSector(sector, sectorId){
        return axios.put(SECTOR_API_BASE_URL + sectorId +'/edit', sector, { headers: authHeader() });
    }

    deleteSector(sectorId){
        return axios.delete(SECTOR_API_BASE_URL + sectorId + '/delete', { headers: authHeader() });
    }
}

export default new SectorService()
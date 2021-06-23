import axios from 'axios';
import authHeader from "./auth-header";

const COMPANY_API_BASE_URL = "http://localhost:8080/company/";

class CompanyService {

    getCompanies(){
        return axios.get(COMPANY_API_BASE_URL+'all', { headers: authHeader() });
    }

    createCompany(company){
        return axios.post(COMPANY_API_BASE_URL+'new', company, { headers: authHeader() });
    }

    getCompanyById(companyId){
        return axios.get(COMPANY_API_BASE_URL + companyId + '/show', { headers: authHeader() });
    }

    updateCompany(company, companyId){
        return axios.put(COMPANY_API_BASE_URL + companyId +'/edit', company, { headers: authHeader() });
    }

    deleteCompany(companyId){
        return axios.delete(COMPANY_API_BASE_URL + companyId + '/delete', { headers: authHeader() });
    }
}

export default new CompanyService()
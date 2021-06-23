import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";


const getUserDetails = () => {
  let currentUser = localStorage.getItem('username');
  if(!currentUser) return ;
  currentUser = currentUser.slice(1, -1);
  
  const NEW_API_URL = API_URL + "myprofile/";
  return axios.get(NEW_API_URL +  `${currentUser}`, { headers: authHeader() });
}

export{
  getUserDetails
};

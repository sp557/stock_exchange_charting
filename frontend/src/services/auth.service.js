import axios from "axios";

const API_URL = "http://localhost:8080/";

 const register = (username, email, password, mobile, isAdmin, confirmed) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    mobile,
    isAdmin,
    confirmed
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('username', JSON.stringify(username));
    }else{
      alert("THERE IS SOME ERROR. AUTHENTICATION UNSECCESSFUL!!!")
    }

    return response.data;
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(username));
      }else{
        alert("THERE IS SOME ERROR. AUTHENTICATION UNSECCESSFUL!!!")
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("username"));
};

export {
  register,
  login,
  logout,
  getCurrentUser,
};

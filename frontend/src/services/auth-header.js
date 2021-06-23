export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('username'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user && token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }
  
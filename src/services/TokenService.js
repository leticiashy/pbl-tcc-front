export default class TokenService {
  static getToken() {
    return localStorage.getItem("jwtToken") || null;
  }

  static saveToken(token) {
    console.log(token);
    localStorage.setItem("jwtToken", token);
  }

  static destroyToken() {
    localStorage.removeItem("jwtToken");
  }
}

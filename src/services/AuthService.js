import ApiClient from "@/services/ApiClient";
import TokenService from "@/services/TokenService";
import UserService from "@/services/UserService";

const CURRENT_USER_STORAGE = "current_user";
const CURRENT_SETTINGS_STORAGE = "company_settings";

const ANONYMOUS_USER = {
  id: undefined,
  email: undefined,
  name: undefined,
  token: undefined,
  roles: "none",
};

export default class AuthService {
  constructor() {
    this.apiClient = new ApiClient();
  }

  setCurrentUser(user) {
    return UserService.setCurrentUser(user);
  }

  getCurrentUser() {
    return UserService.getCurrentUser();
  }

  clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_STORAGE);
  }

  clearCurrentSettings() {
    localStorage.removeItem(CURRENT_SETTINGS_STORAGE);
  }

  login(email, password) {
    return this.apiClient
      .post("auth/login", { email, password })
      .then((user = ANONYMOUS_USER) => {
        if (user) {
          TokenService.saveToken(user.token);
        }

        this.setCurrentUser(user);

        return user;
      });
  }

  create(email, password, username) {
    return this.apiClient
      .post("users", { email, password, username })
      .then((user = ANONYMOUS_USER) => {
        return user;
      });
  }

  revalidateToken(isAdmin, roles) {
    this.apiClient.post("user/revalidate", { isAdmin, roles }).then(resp => {
      if (resp) {
        TokenService.saveToken(resp.token);
      }
    });
  }

  logout() {
    this.clearCurrentUser();
    this.clearCurrentSettings();
    //this.companyFilterService.clearEntity();
    TokenService.destroyToken();
  }

  isLoggedIn() {
    let ok = false;
    let currentUser = this.getCurrentUser();
    if (currentUser && currentUser.username) {
      ok = true;
    }
    return ok;
  }

  /**
   * Sends a request to recover the users password
   * @param  {any}             data User data
   * @return {Observable<any>}      [description]
   */
  forgotPassword(data) {
    return this.apiClient.post(`user/forgot-password`, data);
  }

  /**
   * Sends the new password
   * @param  {any}             data User data
   * @return {Observable<any>}      [description]
   */
  recoverPassword(data) {
    return this.apiClient.post(`user/recover-password`, data);
  }
}

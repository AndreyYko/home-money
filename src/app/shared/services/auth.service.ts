export class AuthService {
  private isAuth = false;
  logIn() {
    this.isAuth = true;
  }

  logOut() {
    this.isAuth = false;
    window.localStorage.clear();
  }

  isLoggedin() {
    return this.isAuth;
  }
}

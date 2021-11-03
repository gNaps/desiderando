import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { UserLogin } from "../models/userLogin";
import { UserRegister } from "../models/userRegister";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(login: UserLogin): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/auth/local`, login);
  }

  register(register: UserRegister): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/auth/local/register`,
      register
    );
  }

  setLoggedUser(
    id: number,
    email: string,
    icon_profile: number,
    username: string,
    jwt: string
  ) {
    localStorage.setItem(
      "userLoggedIn",
      JSON.stringify({ id, email, icon_profile, username })
    );
    localStorage.setItem("jwt", jwt);
  }

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem("userLoggedIn")!);
    const jwt = localStorage.getItem("jwt");
    return {
      ...user,
      jwt: jwt,
    };
  }

  logout() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("jwt");
  }

  sendEmailRecoveryPassword(email: string) {
    return this.httpClient.post(`${environment.apiUrl}/recovery-passwords`, {
      email: email,
    });
  }

  checkTokenValid(token: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/recovery-passwords/${token}`
    );
  }

  updatePasswordByToken(token: string, password: string) {
    return this.httpClient.post(
      `${environment.apiUrl}/recovery-passwords/update`,
      {
        token,
        password,
      }
    );
  }

  updateProfile(icon_profile: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.post(
      `${environment.apiUrl}/profile`,
      {
        icon_profile,
      },
      {
        headers: headers,
      }
    );
  }
}

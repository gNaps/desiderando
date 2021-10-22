import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { User, UserResponse } from "../models/user";
import { UserLogin } from "../models/userLogin";
import { UserRegister } from "../models/userRegister";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(login: UserLogin): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/auth/local`, login);
  }

  register(register: UserRegister): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/auth/local/register`,
      register
    );
  }

  setLoggedUser(id: number, email: string, icon_profile: number, jwt: string) {
    localStorage.setItem(
      "userLoggedIn",
      JSON.stringify({ id, email, icon_profile })
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
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {
  constructor(private httpClient: HttpClient) {}

  getAllActivities() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.get(`${environment.apiUrl}/activities`, {
      headers: headers,
    });
  }

  getLastThreeActivities() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.get(`${environment.apiUrl}/activities/last`, {
      headers: headers,
    });
  }
}

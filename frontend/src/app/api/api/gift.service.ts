import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GiftService {
  constructor(private httpClient: HttpClient) {}

  getAllGift() {}

  getGiftById(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.get(`${environment.apiUrl}/gifts/${id}`, {
      headers: headers,
    });
  }
}

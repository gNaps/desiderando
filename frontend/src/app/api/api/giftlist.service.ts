import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Giftlist } from "../models/giftlist";

@Injectable({
  providedIn: "root",
})
export class GiftlistService {
  constructor(private httpClient: HttpClient) {}

  getAllGiftlists() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.get(`${environment.apiUrl}/giftlists`, {
      headers: headers,
    });
  }

  getGiftlistById(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.get(`${environment.apiUrl}/giftlists/${id}`, {
      headers: headers,
    });
  }

  createGiftlist(giftlist: Giftlist) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.post(`${environment.apiUrl}/giftlists/`, giftlist, {
      headers: headers,
    });
  }

  updateGiftlist(giftlist: Giftlist) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.put(
      `${environment.apiUrl}/giftlists/${giftlist.id}`,
      giftlist,
      {
        headers: headers,
      }
    );
  }

  deleteGiftlist(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
    return this.httpClient.delete(`${environment.apiUrl}/giftlists/${id}`, {
      headers: headers,
    });
  }
}

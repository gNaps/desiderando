import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { GiftlistService } from "../api/api/giftlist.service";
import { Giftlist } from "../api/models/giftlist";

@Injectable({
  providedIn: "root",
})
export class GiftlistResolver implements Resolve<Giftlist> {
  constructor(private giftlistService: GiftlistService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Giftlist> {
    const giftlistId = +route.params.id;
    return this.giftlistService.getGiftlistById(giftlistId).pipe(
      take(1),
      catchError(() => {
        return EMPTY;
      })
    );
  }
}

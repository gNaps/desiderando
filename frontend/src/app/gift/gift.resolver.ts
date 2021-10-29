import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { GiftService } from '../api/api/gift.service';
import { Gift } from '../api/models/gift';

@Injectable({
  providedIn: 'root'
})
export class GiftResolver implements Resolve<Gift> {
  constructor(private giftService: GiftService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const giftId = +route.params.id;
    return this.giftService.getGiftById(giftId).pipe(
      take(1),
      catchError(() => {
        return EMPTY;
      })
    );
  }
}

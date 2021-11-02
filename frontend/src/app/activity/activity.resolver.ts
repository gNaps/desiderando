import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActivitiesService } from "../api/api/activities.service";
import { Activity } from "../api/models/activity";

@Injectable({
  providedIn: "root",
})
export class ActivityResolver implements Resolve<Activity[]> {
  constructor(private activitiesService: ActivitiesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.activitiesService.getAllActivities().pipe(
      take(1),
      catchError(() => {
        return EMPTY;
      })
    );
  }
}

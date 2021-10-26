import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActivitiesService } from "../api/api/activities.service";
import { GiftlistService } from "../api/api/giftlist.service";
import { Activity } from "../api/models/activity";
import { Gift } from "../api/models/gift";
import { Giftlist } from "../api/models/giftlist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  giftlists$: Observable<any> = new Observable();
  activities$: Observable<any> = new Observable();

  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private giftlistsService: GiftlistService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.giftlists$ = this.giftlistsService.getAllGiftlists();
    this.activities$ = this.activitiesService.getLastThreeActivities();
  }

  trackByFnGiftlist(index: number, item: Giftlist) {
    return item.id;
  }

  trackByFnActivities(index: number, item: Activity) {
    return item.id;
  }
}

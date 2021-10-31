import { Component, Input, OnInit } from "@angular/core";
import { Activity } from "src/app/api/models/activity";
import * as moment from "moment";
import { User } from "src/app/api/models/user";
import { TranslateService } from "@ngx-translate/core";
import { getTimeFromNow } from "src/app/core/utils";

@Component({
  selector: "app-activity-card",
  templateUrl: "./activity-card.component.html",
  styleUrls: ["./activity-card.component.scss"],
})
export class ActivityCardComponent implements OnInit {
  member: User[] = [];
  getTime = getTimeFromNow;

  @Input() activity!: Activity;
  @Input() classIndex: number = 0;

  constructor(private ts: TranslateService) {}

  ngOnInit(): void {
    const user: User = {
      id: this.activity.userId,
      username: this.activity.username,
      icon_profile: this.activity.icon_profile,
    };
    this.member = [...[], user];
  }

  getMessage() {
    const username = this.activity.username;
    const action =
      this.activity.action === "BUY"
        ? this.ts.instant("ACTIVITY.BUY")
        : this.ts.instant("ACTIVITY.ADD");
    return `${username} ${action}`;
  }
}

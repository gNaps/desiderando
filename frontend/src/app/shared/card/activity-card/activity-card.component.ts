import { Component, Input, OnInit } from "@angular/core";
import { Activity } from "src/app/api/models/activity";
import * as moment from "moment";
import { User } from "src/app/api/models/user";

@Component({
  selector: "app-activity-card",
  templateUrl: "./activity-card.component.html",
  styleUrls: ["./activity-card.component.scss"],
})
export class ActivityCardComponent implements OnInit {
  member: User[] = [];

  @Input() activity!: Activity;
  @Input() classIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    const user: User = {
      id: this.activity.userId,
      username: this.activity.username,
      icon_profile: this.activity.icon_profile,
    };
    this.member = [...[], user];
  }

  getTime(time: string) {
    const value: string = moment(time, "YYYY-MM-DDThh:mm:ss.sssZ").fromNow();
    const split = value.split(" ");
    if (split[0] === "an") split[0] = "1";
    return `${split[0] + split[1].charAt(0)}  ago`;
  }

  getMessage() {
    const username = this.activity.username;
    const action =
      this.activity.action === "BUY" ? "ha comprato" : "ha aggiunto";
    return `${username} ${action}`;
  }
}

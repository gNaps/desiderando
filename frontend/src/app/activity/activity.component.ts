import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Activity } from "../api/models/activity";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
})
export class ActivityComponent implements OnInit {
  activities!: Activity[];

  constructor(private route: ActivatedRoute) {
    this.activities = this.route.snapshot.data.activity;
  }

  ngOnInit(): void {}
}

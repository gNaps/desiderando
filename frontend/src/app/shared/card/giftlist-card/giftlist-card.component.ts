import { Component, Input, OnInit } from "@angular/core";
import { Giftlist } from "src/app/api/models/giftlist";

@Component({
  selector: "app-giftlist-card",
  templateUrl: "./giftlist-card.component.html",
  styleUrls: ["./giftlist-card.component.scss"],
})
export class GiftlistCardComponent implements OnInit {
  @Input() giftlist!: Giftlist;
  @Input() classIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  getCircleProgressColor(index: number) {
    switch (index) {
      case 0:
        return "#0CA07B";
      case 1:
        return "#a70641";
      case 2:
        return "#D1A300";
      case 3:
        return "#2a1488";
      default:
        return "";
    }
  }
}

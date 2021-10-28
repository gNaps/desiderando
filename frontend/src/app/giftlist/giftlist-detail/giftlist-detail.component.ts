import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Gift } from "src/app/api/models/gift";
import { Giftlist } from "src/app/api/models/giftlist";

@Component({
  selector: "app-giftlist-detail",
  templateUrl: "./giftlist-detail.component.html",
  styleUrls: ["./giftlist-detail.component.scss"],
})
export class GiftlistDetailComponent implements OnInit {
  giftlist?: Giftlist;
  giftsLeft?: number;

  constructor(private route: ActivatedRoute) {
    this.giftlist = this.route.snapshot.data.giftlist;
    this.giftsLeft = this.giftlist?.gifts?.filter(
      (g: Gift) => g.status !== "BOUGHT"
    ).length;
  }

  ngOnInit(): void {}
}

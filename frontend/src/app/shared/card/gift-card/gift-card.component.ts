import { Component, Input, OnInit } from "@angular/core";
import { Gift } from "src/app/api/models/gift";
import * as moment from "moment";
import { AuthService } from "src/app/api/api/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-gift-card",
  templateUrl: "./gift-card.component.html",
  styleUrls: ["./gift-card.component.scss"],
})
export class GiftCardComponent implements OnInit {
  @Input() gift!: Gift;
  @Input() canSeeWhat!: boolean;
  @Input() canSeeWho!: boolean;
  @Input() giftlistId!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getTime(time: string) {
    const date = new Date(time);
    return moment(date).format("DD/MM/YYYY");
  }

  openGift() {
    console.log("apri id ", this.gift.id);
    this.router.navigate([`giftlist/${this.giftlistId}/gift`, this.gift.id]);
  }
}

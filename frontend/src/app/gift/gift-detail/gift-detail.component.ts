import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/api/api/auth.service";
import { Gift } from "src/app/api/models/gift";
import { User } from "src/app/api/models/user";
import { getTime } from "src/app/core/utils";

@Component({
  selector: "app-gift-detail",
  templateUrl: "./gift-detail.component.html",
  styleUrls: ["./gift-detail.component.scss"],
})
export class GiftDetailComponent implements OnInit {
  gift!: Gift;
  canSeeWhat: boolean = true;
  canSeeWho: boolean = true;
  canModify: boolean = false;
  getTime = getTime;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.gift = this.route.snapshot.data.gift;
    console.log(this.gift);
  }

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    const user: User = this.gift.giftlist?.members!.find(
      (m) => m.id === userId && m.role === "OWNER"
    )!;

    if (user) {
      this.canSeeWhat = this.gift.giftlist?.what!;
      this.canSeeWho = this.gift.giftlist?.who!;
      this.canModify = true;
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/api/api/auth.service";
import { Gift } from "src/app/api/models/gift";
import { Giftlist } from "src/app/api/models/giftlist";
import { User } from "src/app/api/models/user";

@Component({
  selector: "app-giftlist-detail",
  templateUrl: "./giftlist-detail.component.html",
  styleUrls: ["./giftlist-detail.component.scss"],
})
export class GiftlistDetailComponent implements OnInit {
  giftlist?: Giftlist;
  giftsLeft?: number;
  canSeeWhat: boolean = true;
  canSeeWho: boolean = true;
  canModify: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.giftlist = this.route.snapshot.data.giftlist;
    this.giftsLeft = this.giftlist?.gifts?.filter(
      (g: Gift) => g.status !== "BOUGHT"
    ).length;
  }

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    const user: User = this.giftlist?.members!.find(
      (m) => m.id === userId && m.role === "OWNER"
    )!;

    if (user) {
      this.canSeeWhat = this.giftlist?.what!;
      this.canSeeWho = this.giftlist?.who!;
      this.canModify = true;
    }
  }

  editGiftlist() {
    this.router.navigate(["giftlist/edit", this.giftlist?.id!]);
  }

  createGift() {
    this.router.navigate([`../${this.giftlist?.id!}/gift/new`], {
      relativeTo: this.route.parent,
    });
  }
}

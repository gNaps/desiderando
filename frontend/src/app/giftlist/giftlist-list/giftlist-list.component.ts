import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivitiesService } from "src/app/api/api/activities.service";
import { AuthService } from "src/app/api/api/auth.service";
import { GiftlistService } from "src/app/api/api/giftlist.service";
import { Giftlist } from "src/app/api/models/giftlist";

@Component({
  selector: "app-giftlist-list",
  templateUrl: "./giftlist-list.component.html",
  styleUrls: ["./giftlist-list.component.scss"],
})
export class GiftlistListComponent implements OnInit {
  giftlists$: Observable<any> = new Observable();
  activities$: Observable<any> = new Observable();

  giftlistOwner?: Giftlist[];
  giftlistInvite?: Giftlist[];

  constructor(
    private giftlistsService: GiftlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    this.giftlistsService.getAllGiftlists().subscribe((data: any) => {
      this.giftlistOwner = data.filter((g: any) =>
        g.members.some((m: any) => m.id === userId && m.role === "OWNER")
      );
      this.giftlistInvite = data.filter((g: any) =>
        g.members.some((m: any) => m.id === userId && m.role === "GUEST")
      );
    });
  }

  trackByFnGiftlist(index: number, item: Giftlist) {
    return item.id;
  }
}

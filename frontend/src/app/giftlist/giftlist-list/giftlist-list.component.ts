import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/api/api/auth.service";
import { GiftlistService } from "src/app/api/api/giftlist.service";
import { Giftlist } from "src/app/api/models/giftlist";

@Component({
  selector: "app-giftlist-list",
  templateUrl: "./giftlist-list.component.html",
  styleUrls: ["./giftlist-list.component.scss"],
})
export class GiftlistListComponent implements OnInit {
  filterName: string = "";

  giftlists$: Observable<any> = new Observable();
  activities$: Observable<any> = new Observable();

  giftlistOriginal?: Giftlist[];
  giftlistOwner?: Giftlist[];
  giftlistInvite?: Giftlist[];

  constructor(
    private giftlistsService: GiftlistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    this.giftlistsService.getAllGiftlists().subscribe((data: any) => {
      this.giftlistOriginal = data;
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

  createGiftlist() {
    this.router.navigate(["giftlist/create"]);
  }

  findOriginalIndex(id: number) {
    return this.giftlistOriginal?.findIndex((g) => g.id === id)!;
  }

  filterList(filter: string) {
    this.filterName = filter;
  }

  applyFilter(giftlist: Giftlist) {
    return this.filterName && this.filterName !== ""
      ? giftlist.name
          ?.toLowerCase()
          .includes(this.filterName.toLocaleLowerCase())
      : true;
  }
}

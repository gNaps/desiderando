import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tap } from "rxjs/operators";
import { AuthService } from "src/app/api/api/auth.service";
import { GiftlistService } from "src/app/api/api/giftlist.service";
import { Gift } from "src/app/api/models/gift";
import { Giftlist } from "src/app/api/models/giftlist";
import { User } from "src/app/api/models/user";
import { MembersModalComponent } from "src/app/shared/modals/members-modal/members-modal.component";

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
  canBuy: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    public giftlistService: GiftlistService
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
      this.canBuy = this.giftlist?.owner_can_buy!;
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

  openMembers() {
    const modalRef = this.modalService.open(MembersModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.members = this.giftlist?.members;
    modalRef.componentInstance.canModify = this.canModify;
    modalRef.componentInstance.onInvite.subscribe((user: any) => {
      this.giftlistService
        .inviteUser(user, this.giftlist?.id!)
        .pipe(
          tap((giftlist: Giftlist) => {
            this.giftlist!.members = [...giftlist.members!];
            modalRef.componentInstance.members = giftlist.members!;
          })
        )
        .subscribe();
    });
    modalRef.componentInstance.onRemoveInvite.subscribe((id: number) => {
      this.giftlistService
        .removeUser({ user: id }, this.giftlist?.id!)
        .pipe(
          tap((giftlist: Giftlist) => {
            this.giftlist!.members = [...giftlist.members!];
            modalRef.componentInstance.members = giftlist.members!;
          })
        )
        .subscribe();
    });
  }
}

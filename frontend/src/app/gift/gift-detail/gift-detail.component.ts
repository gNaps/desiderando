import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { AuthService } from "src/app/api/api/auth.service";
import { GiftService } from "src/app/api/api/gift.service";
import { Gift } from "src/app/api/models/gift";
import { User } from "src/app/api/models/user";
import { getTime } from "src/app/core/utils";
import { BuyModalComponent } from "src/app/shared/modals/buy-modal/buy-modal.component";
import { SuccessModalComponent } from "src/app/shared/modals/success-modal/success-modal.component";

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
  canBuy: boolean = true;
  getTime = getTime;
  remainder!: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private giftService: GiftService,
    private ts: TranslateService
  ) {
    this.gift = this.route.snapshot.data.gift;

    if (this.gift.status === "GROUP") {
      this.remainder = this.gift.buyers.reduce(
        (acc, obj: any) => acc + obj.price,
        0
      );
    }
  }

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    const user: User = this.gift.giftlist?.members!.find(
      (m: any) => m.user === userId && m.role === "OWNER"
    )!;

    if (user) {
      this.canSeeWhat = this.gift.giftlist?.what!;
      this.canSeeWho = this.gift.giftlist?.who!;
      this.canBuy = this.gift.giftlist?.owner_can_buy!;
      this.canModify = true;
    }
  }

  editGift() {
    this.router.navigate([
      `giftlist/${this.gift.giftlist?.id!}/gift/edit`,
      this.gift.id,
    ]);
  }

  buy() {
    const modalRef = this.modalService.open(BuyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.status = this.gift.status;
    modalRef.componentInstance.totalPrice = this.gift.price;
    modalRef.componentInstance.giftName = this.gift.name;
    modalRef.componentInstance.onBuy.subscribe((data: number) => {
      this.giftService
        .buyGift(this.gift?.id!, { price: data })
        .pipe(
          tap((data: any) => {
            this.gift.status = data.status;
            this.gift.buyers = [...data.buyers];
            modalRef.close();
            const modalRefSuccess = this.modalService.open(
              SuccessModalComponent,
              {
                centered: true,
              }
            );
            modalRefSuccess.componentInstance.message =
              this.ts.instant("GIFT.BOUGHT");
          })
        )
        .subscribe();
    });
  }

  joinGroup() {
    const modalRef = this.modalService.open(BuyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.status = this.gift.status;
    modalRef.componentInstance.totalPrice = this.remainder;
    modalRef.componentInstance.giftName = this.gift.name;
  }

  alreadyInGroup() {
    const userId = this.authService.getLoggedUser().id;
    return this.gift.buyers!.some((b: any) => b.id === userId)!;
  }
}

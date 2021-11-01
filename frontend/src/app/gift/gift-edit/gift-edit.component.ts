import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { GiftService } from "src/app/api/api/gift.service";
import { Gift } from "src/app/api/models/gift";
import { Giftlist } from "src/app/api/models/giftlist";
import { categories } from "src/app/core/utils";
import { SuccessModalComponent } from "src/app/shared/modals/success-modal/success-modal.component";

@Component({
  selector: "app-gift-edit",
  templateUrl: "./gift-edit.component.html",
  styleUrls: ["./gift-edit.component.scss"],
})
export class GiftEditComponent implements OnInit {
  giftlist?: Giftlist;
  gift?: Gift;
  isEdit: boolean = false;
  giftForm!: FormGroup;
  categories = categories;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private giftService: GiftService,
    private modalService: NgbModal,
    private ts: TranslateService
  ) {
    this.giftlist = this.route.snapshot.data.giftlist;
    this.gift = this.route.snapshot.data.gift;
  }

  ngOnInit(): void {
    this.giftForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      where: new FormControl("", [Validators.required]),
      category: new FormControl(1),
      giftlist: new FormControl(this.giftlist?.id),
    });

    if (this.gift) {
      this.giftForm.patchValue(this.gift);
      this.giftForm.get("giftlist")?.setValue(this.gift.giftlist?.id);
      this.isEdit = true;
    }
  }

  selectIcon(icon: number) {
    this.giftForm.controls["category"].setValue(icon);
  }

  checkIfSelected(icon: number) {
    return this.giftForm.controls["category"].value === icon;
  }

  save() {
    if (this.giftForm.valid) {
      const gift = { ...this.giftForm.value };
      if (this.isEdit) {
        const gift: Gift = {
          ...this.giftForm.value,
          id: this.gift?.id,
        };
        this.giftService
          .updateGift(gift)
          .pipe(
            tap(() => {
              const modalRef = this.modalService.open(SuccessModalComponent, {
                centered: true,
              });
              modalRef.componentInstance.message =
                this.ts.instant("GIFT.UPDATED");
              setTimeout(() => {
                this.router.navigate([
                  `giftlist/${this.giftlist?.id}/gift/${this.gift?.id}`,
                ]);
              }, 500);
            })
          )
          .subscribe();
      } else {
        const gift: Gift = {
          ...this.giftForm.value,
        };
        this.giftService
          .createGift(gift)
          .pipe(
            tap((data: any) => {
              const modalRef = this.modalService.open(SuccessModalComponent, {
                centered: true,
              });
              modalRef.componentInstance.message =
                this.ts.instant("GIFT.CREATED");
              setTimeout(() => {
                this.router.navigate([
                  `giftlist/${this.giftlist?.id}/gift/${data.id}`,
                ]);
              }, 500);
            })
          )
          .subscribe();
      }
    } else {
      Object.keys(this.giftForm.controls).forEach((field) => {
        const control = this.giftForm.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getTitle() {
    return this.isEdit
      ? this.ts.instant("GIFT.EDIT")
      : this.ts.instant("GIFT.CREATE");
  }

  delete() {
    this.giftService
      .deleteGift(this.gift?.id!)
      .pipe(
        tap(() => {
          const modalRef = this.modalService.open(SuccessModalComponent, {
            centered: true,
          });
          modalRef.componentInstance.message = this.ts.instant("GIFT.DELETED");
          setTimeout(() => {
            this.router.navigate([`giftlist/${this.gift?.giftlist?.id}`]);
          }, 500);
        })
      )
      .subscribe();
  }
}

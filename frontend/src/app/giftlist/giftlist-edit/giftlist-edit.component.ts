import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { GiftlistService } from "src/app/api/api/giftlist.service";
import { Giftlist } from "src/app/api/models/giftlist";
import { SuccessModalComponent } from "src/app/shared/modals/success-modal/success-modal.component";

@Component({
  selector: "app-giftlist-edit",
  templateUrl: "./giftlist-edit.component.html",
  styleUrls: ["./giftlist-edit.component.scss"],
})
export class GiftlistEditComponent implements OnInit {
  giftlist?: Giftlist;
  isEdit: boolean = false;
  giftlistForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private giftlistService: GiftlistService,
    private router: Router,
    private modalService: NgbModal,
    private ts: TranslateService
  ) {}

  ngOnInit(): void {
    this.giftlist = this.route.snapshot.data.giftlist;

    this.giftlistForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      public: new FormControl(false),
      who: new FormControl(false),
      what: new FormControl(false),
      expiration: new FormControl(""),
    });

    if (this.giftlist) {
      this.isEdit = true;
      this.giftlistForm.patchValue(this.giftlist!);
    }
  }

  save() {
    if (this.giftlistForm.valid) {
      if (this.isEdit) {
        const giftlist: Giftlist = {
          ...this.giftlistForm.value,
          id: this.giftlist?.id,
        };
        this.giftlistService
          .updateGiftlist(giftlist)
          .pipe(
            tap(() => {
              const modalRef = this.modalService.open(SuccessModalComponent, {
                centered: true,
              });
              modalRef.componentInstance.message = this.ts.instant(
                "GIFTLIST.UPDATED"
              );
              setTimeout(() => {
                this.router.navigate(["giftlist"]);
              }, 500);
            })
          )
          .subscribe();
      } else {
        const giftlist: Giftlist = { ...this.giftlistForm.value };
        this.giftlistService
          .createGiftlist(giftlist)
          .pipe(
            tap(() => {
              const modalRef = this.modalService.open(SuccessModalComponent, {
                centered: true,
              });
              modalRef.componentInstance.message = this.ts.instant(
                "GIFTLIST.CREATED"
              );
              setTimeout(() => {
                this.router.navigate(["giftlist"]);
              }, 500);
            })
          )
          .subscribe();
      }
    } else {
      Object.keys(this.giftlistForm.controls).forEach((field) => {
        const control = this.giftlistForm.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

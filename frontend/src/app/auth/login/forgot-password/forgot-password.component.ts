import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { AuthService } from "src/app/api/api/auth.service";
import { SuccessModalComponent } from "src/app/shared/modals/success-modal/success-modal.component";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotGroup: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private ts: TranslateService
  ) {}

  ngOnInit(): void {}

  recoveryPassword() {
    if (this.forgotGroup.valid) {
      const { email } = this.forgotGroup.value;
      this.authService
        .sendEmailRecoveryPassword(email)
        .pipe(
          tap(() => {
            const modalRef = this.modalService.open(SuccessModalComponent, {
              centered: true,
            });
            modalRef.componentInstance.message =
              this.ts.instant("AUTH.RECOVERY_MAIL_SENDED");
          })
        )
        .subscribe();
    } else {
      Object.keys(this.forgotGroup.controls).forEach((field) => {
        const control = this.forgotGroup.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

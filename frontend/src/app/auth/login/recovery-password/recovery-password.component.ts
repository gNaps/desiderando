import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs/operators";
import { AuthService } from "src/app/api/api/auth.service";
import { SuccessModalComponent } from "src/app/shared/modals/success-modal/success-modal.component";
import { checkSamePassword } from "../../confirm-password.directive";

@Component({
  selector: "app-recovery-password",
  templateUrl: "./recovery-password.component.html",
  styleUrls: ["./recovery-password.component.scss"],
})
export class RecoveryPasswordComponent implements OnInit {
  recoveryForm: FormGroup;
  isValidToken: boolean = false;
  token?: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private ts: TranslateService
  ) {
    this.recoveryForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        checkSamePassword(),
      ]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { token } = params;
      if (token) {
        this.token = token;
        this.authService
          .checkTokenValid(token)
          .pipe(tap(() => (this.isValidToken = true)))
          .subscribe();
      }
    });
  }

  recoveryPassword() {
    if (this.recoveryForm.valid) {
      const { password } = this.recoveryForm.value;
      this.authService
        .updatePasswordByToken(this.token!, password)
        .pipe(
          tap(() => {
            const modalRef = this.modalService.open(SuccessModalComponent, {
              centered: true,
            });
            modalRef.componentInstance.message = this.ts.instant(
              "AUTH.PASSWORD_UPDATED"
            );
            this.router.navigate(["auth/login"]);
          })
        )
        .subscribe();
    } else {
      Object.keys(this.recoveryForm.controls).forEach((field) => {
        const control = this.recoveryForm.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

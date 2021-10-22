import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/api/api/auth.service";
import { UserResponse } from "src/app/api/models/user";
import { UserLogin } from "src/app/api/models/userLogin";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  credentialError: boolean = false;
  userLogin: FormGroup = new FormGroup({
    identifier: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userLogin.valueChanges.subscribe(() => (this.credentialError = false));
  }

  login() {
    if (this.userLogin.valid) {
      const user: UserLogin = { ...this.userLogin.value };
      this.authService.login(user).subscribe(
        (data: UserResponse) => {
          const { jwt, user } = data;
          const { id, email, icon_profile } = user;
          this.authService.setLoggedUser(id!, email!, icon_profile!, jwt);
        },
        (error) => {
          this.credentialError = true;
        }
      );
    } else {
      Object.keys(this.userLogin.controls).forEach((field) => {
        const control = this.userLogin.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

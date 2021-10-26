import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/api/api/auth.service";
import { User, UserResponse } from "src/app/api/models/user";
import { UserRegister } from "src/app/api/models/userRegister";
import { checkSamePassword } from "../confirm-password.directive";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  iconPageCurrent: number = 1;
  iconPagePosition: number[] = [];
  offset: number = 20;
  limit: number = 20;

  userToCreate: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
      ),
    ]),
    confirmPassword: new FormControl("", [checkSamePassword()]),
    born_date: new FormControl("", [Validators.required]),
    sex: new FormControl("", [Validators.required]),
    icon_profile: new FormControl("", [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.iconPagePosition = [...Array(20).keys()];
  }

  prevPage() {
    if (this.limit == 20) {
      this.iconPagePosition = [...Array(20).keys()].map((i) => i + 40);
      this.limit = 60;
    } else {
      const newPagePosition = this.iconPagePosition.map((i) => i - 20);
      this.iconPagePosition = [...newPagePosition];
      this.limit = this.limit - 20;
    }
  }

  nextPage() {
    if (this.limit == 60) {
      this.iconPagePosition = [...Array(20).keys()];
      this.limit = 20;
    } else {
      const newPagePosition = this.iconPagePosition.map((i) => i + 20);
      this.iconPagePosition = [...newPagePosition];
      this.limit = this.limit + 20;
    }
  }

  register() {
    if (this.userToCreate.valid) {
      const user: UserRegister = { ...this.userToCreate.value };
      this.authService.register(user).subscribe((data: UserResponse) => {
        const { jwt, user } = data;
        const { id, email, icon_profile, username } = user;
        this.authService.setLoggedUser(
          id!,
          email!,
          icon_profile!,
          username!,
          jwt
        );

        this.router.navigate(["dashboard"]);
      });
    } else {
      Object.keys(this.userToCreate.controls).forEach((field) => {
        const control = this.userToCreate.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  selectIcon(icon: number) {
    this.userToCreate.controls["icon_profile"].setValue(icon);
  }

  checkIfSelected(icon: number) {
    return this.userToCreate.controls["icon_profile"].value === icon;
  }
}

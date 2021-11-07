import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthService } from "../api/api/auth.service";
import { User } from "../api/models/user";
import { DictionaryService } from "../core/dictionary.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user!: User & { jwt: string };
  profileForm!: FormGroup;

  iconPageCurrent: number = 1;
  iconPagePosition: number[] = [];
  offset: number = 20;
  limit: number = 20;

  constructor(
    private authService: AuthService,
    private ds: DictionaryService,
    private router: Router
  ) {
    this.user = this.authService.getLoggedUser();

    this.profileForm = new FormGroup({
      icon_profile: new FormControl(""),
      born_date: new FormControl(""),
    });

    this.profileForm.patchValue(this.user);
  }

  ngOnInit(): void {
    this.iconPagePosition = [...Array(20).keys()];
  }

  selectIcon(icon: number) {
    this.profileForm.controls["icon_profile"].setValue(icon);
  }

  checkIfSelected(icon: number) {
    return this.profileForm.controls["icon_profile"].value === icon;
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

  saveProfile() {
    if (this.profileForm.valid) {
      const { icon_profile } = this.profileForm.value;
      this.authService
        .updateProfile(icon_profile)
        .pipe(
          tap(() => {
            const { id, email, username, jwt } = this.user;
            this.authService.setLoggedUser(
              id!,
              email!,
              icon_profile,
              username!,
              jwt
            );
            this.user.icon_profile = icon_profile;
          })
        )
        .subscribe();
    } else {
      Object.keys(this.profileForm.controls).forEach((field) => {
        const control = this.profileForm.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  changeLanguage(lang: string) {
    this.ds.changeLanguage(lang);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }
}

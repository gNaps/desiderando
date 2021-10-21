import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

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
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    birthDate: new FormControl(""),
    sex: new FormControl(""),
    icon: new FormControl(""),
  });

  constructor() {}

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
    console.log(this.userToCreate.value);
  }

  selectIcon(icon: number) {
    this.userToCreate.controls["icon"].setValue(icon);
  }

  checkIfSelected(icon: number) {
    return this.userToCreate.controls["icon"].value === icon;
  }
}

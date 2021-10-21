import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup = new FormGroup({
    identifier: new FormControl(""),
    password: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log(this.userLogin.value);
  }
}

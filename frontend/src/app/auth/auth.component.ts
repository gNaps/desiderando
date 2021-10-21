import { Component, OnInit } from "@angular/core";
import { DictionaryService } from "../core/dictionary.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  constructor(private ds: DictionaryService) {}

  ngOnInit(): void {}

  changeLanguage(lang: string) {
    this.ds.changeLanguage(lang);
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/api/models/user";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements OnInit {
  @Input() members!: User[];
  @Input() classIndex: number = 0;
  @Input() border: boolean = true;
  @Input() styleNavbar: boolean = false;

  firstThree!: User[];

  constructor() {}

  ngOnInit(): void {
    this.firstThree = this.members.slice(0, 3);
  }

  getStyle() {
    return this.styleNavbar ? "navbar-style" : "style-" + this.classIndex;
  }

  getBorder() {
    return this.border ? "" : "no-border";
  }
}

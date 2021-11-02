import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "src/app/api/api/auth.service";
import { User } from "src/app/api/models/user";
import { getTime } from "src/app/core/utils";

type navbarType = "DASHBOARD" | "MINIMAL" | "DETAIL-LIST" | "DETAIL-ITEM";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  user!: User;
  getTime = getTime;

  @Input() type: navbarType = "DASHBOARD";
  @Input() title: string = "";
  @Input() members?: User[];
  @Input() expiration?: Date;
  @Input() giftLefts?: number;
  @Input() giftName?: string;
  @Input() giftCategory?: number;
  @Input() progressList?: number = 0;

  @Output() onOpenMembers: EventEmitter<void> = new EventEmitter();

  constructor(private authService: AuthService, private location: Location) {
    this.user = this.authService.getLoggedUser();
  }

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  activeMembers() {
    this.onOpenMembers.emit();
  }
}

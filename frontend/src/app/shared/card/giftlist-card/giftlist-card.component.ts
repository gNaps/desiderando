import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/api/api/auth.service";
import { Giftlist } from "src/app/api/models/giftlist";
import { User } from "src/app/api/models/user";
import { getTime } from "src/app/core/utils";

@Component({
  selector: "app-giftlist-card",
  templateUrl: "./giftlist-card.component.html",
  styleUrls: ["./giftlist-card.component.scss"],
})
export class GiftlistCardComponent implements OnInit {
  canSeeWhat: boolean = true;
  getTime = getTime;

  @Input() giftlist!: Giftlist;
  @Input() classIndex: number = 0;
  @Input() complete?: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedUser().id;
    const user: User = this.giftlist?.members!.find(
      (m) => m.id === userId && m.role === "OWNER"
    )!;

    if (user) {
      this.canSeeWhat = this.giftlist?.what!;
    }
  }

  getCircleProgressColor(index: number) {
    switch (index) {
      case 0:
        return "#0CA07B";
      case 1:
        return "#a70641";
      case 2:
        return "#2a1488";
      case 3:
        return "#D1A300";
      default:
        return "";
    }
  }

  checkIfComplete() {
    return this.complete ? "complete" : "";
  }

  getShape(index: number) {
    let shape = "";
    switch (index) {
      case 0:
        shape = "pyramid";
        break;
      case 1:
        shape = "cube";
        break;
      case 2:
        shape = "cylinder";
        break;
      case 3:
        shape = "cristall";
        break;
      default:
        shape = "";
    }
    return `../../../../assets/images/shapes/${shape}.png`;
  }
}

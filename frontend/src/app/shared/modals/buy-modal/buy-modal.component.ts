import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-buy-modal",
  templateUrl: "./buy-modal.component.html",
  styleUrls: ["./buy-modal.component.scss"],
})
export class BuyModalComponent implements OnInit {
  status!: "TOBUY" | "GROUP";
  totalPrice!: number;
  currentPrice!: number;
  giftName!: string;
  buyForm!: FormGroup;

  onBuy: EventEmitter<number> = new EventEmitter();

  get type() {
    return this.buyForm.controls["type"].value;
  }

  constructor() {
    this.buyForm = new FormGroup({
      type: new FormControl("NOGROUP"),
      price: new FormControl(""),
    });
  }

  ngOnInit(): void {}

  buy() {
    let { price, type } = this.buyForm.value;
    if (type === "NOGROUP") {
      price = this.totalPrice;
    }
    this.onBuy.emit(price);
  }
}

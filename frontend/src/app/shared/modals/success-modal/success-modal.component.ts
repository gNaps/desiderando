import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-success-modal",
  templateUrl: "./success-modal.component.html",
  styleUrls: ["./success-modal.component.scss"],
})
export class SuccessModalComponent implements OnInit {
  message!: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}

import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GiftlistService } from "src/app/api/api/giftlist.service";
import { GiftlistUsersRoles } from "src/app/api/models/giftlistUserRoles";

@Component({
  selector: "app-members-modal",
  templateUrl: "./members-modal.component.html",
  styleUrls: ["./members-modal.component.scss"],
})
export class MembersModalComponent implements OnInit {
  members?: GiftlistUsersRoles[];
  inviteUserForm!: FormGroup;
  isCollapsed = true;
  canModify!: boolean;

  onInvite: EventEmitter<any> = new EventEmitter();
  onRemoveInvite: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.inviteUserForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      role: new FormControl("GUEST", [Validators.required]),
    });
  }

  saveMembers() {
    this.activeModal.close();
  }

  invites() {
    if (this.inviteUserForm.valid) {
      const user = { ...this.inviteUserForm.value };
      this.onInvite.emit(user);
      this.inviteUserForm.reset();
    } else {
      Object.keys(this.inviteUserForm.controls).forEach((field) => {
        const control = this.inviteUserForm.get(field)!;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  removeInvite(id: number) {
    this.onRemoveInvite.emit(id);
  }
}

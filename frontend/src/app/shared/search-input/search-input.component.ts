import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  @Input() buttonType: string[] = [];
  @Input() canModify?: boolean;

  @Output() onNewList: EventEmitter<void> = new EventEmitter();
  @Output() onNewItem: EventEmitter<void> = new EventEmitter();
  @Output() onSettingList: EventEmitter<void> = new EventEmitter();
  @Output() onSettingItem: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getClassWidth() {
    return "button-action-" + this.buttonType?.length;
  }

  newList() {
    this.onNewList.emit();
  }

  newItem() {
    this.onNewItem.emit();
  }

  settingList() {
    this.onSettingList.emit();
  }

  settingItem() {
    this.onSettingItem.emit();
  }
}

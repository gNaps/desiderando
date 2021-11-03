import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  searchControl: FormControl = new FormControl("");

  @Input() buttonType: string[] = [];
  @Input() canModify?: boolean;

  @Output() onNewList: EventEmitter<void> = new EventEmitter();
  @Output() onNewItem: EventEmitter<void> = new EventEmitter();
  @Output() onSettingList: EventEmitter<void> = new EventEmitter();
  @Output() onSettingItem: EventEmitter<void> = new EventEmitter();
  @Output() onFilter: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      this.onFilter.emit(v);
    });
  }

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

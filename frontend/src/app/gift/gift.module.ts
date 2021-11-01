import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GiftListComponent } from "./gift-list/gift-list.component";
import { GiftRoutingModule } from "./gift-routing.module";
import { SharedModule } from "../shared/shared.module";
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { TranslateModule } from "@ngx-translate/core";
import { GiftEditComponent } from './gift-edit/gift-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [GiftListComponent, GiftDetailComponent, GiftEditComponent],
  imports: [CommonModule, GiftRoutingModule, TranslateModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class GiftModule {}

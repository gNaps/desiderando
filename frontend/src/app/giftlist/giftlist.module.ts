import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GiftlistListComponent } from "./giftlist-list/giftlist-list.component";
import { GiftlistDetailComponent } from "./giftlist-detail/giftlist-detail.component";
import { GiftlistRoutingModule } from "./giftlist-routing.module";
import { SharedModule } from "../shared/shared.module";
import { GiftlistEditComponent } from "./giftlist-edit/giftlist-edit.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GiftlistListComponent,
    GiftlistDetailComponent,
    GiftlistEditComponent,
  ],
  imports: [
    CommonModule,
    GiftlistRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class GiftlistModule {}

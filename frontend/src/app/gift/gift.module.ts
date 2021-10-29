import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GiftListComponent } from "./gift-list/gift-list.component";
import { GiftRoutingModule } from "./gift-routing.module";
import { SharedModule } from "../shared/shared.module";
import { GiftDetailComponent } from './gift-detail/gift-detail.component';

@NgModule({
  declarations: [GiftListComponent, GiftDetailComponent],
  imports: [CommonModule, GiftRoutingModule, SharedModule],
})
export class GiftModule {}

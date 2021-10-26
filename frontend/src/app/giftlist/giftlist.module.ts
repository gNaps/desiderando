import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftlistListComponent } from './giftlist-list/giftlist-list.component';
import { GiftlistDetailComponent } from './giftlist-detail/giftlist-detail.component';
import { GiftlistRoutingModule } from './giftlist-routing.module';



@NgModule({
  declarations: [
    GiftlistListComponent,
    GiftlistDetailComponent
  ],
  imports: [
    CommonModule,
    GiftlistRoutingModule
  ]
})
export class GiftlistModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { GiftlistCardComponent } from './card/giftlist-card/giftlist-card.component';
import { MembersComponent } from './members/members.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    MembersComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot()
  ],
  exports: [
    ControlErrorsComponent,
    GiftlistCardComponent
  ]
})
export class SharedModule { }

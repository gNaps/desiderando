import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { GiftlistCardComponent } from './card/giftlist-card/giftlist-card.component';
import { MembersComponent } from './members/members.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ActivityCardComponent } from './card/activity-card/activity-card.component';

@NgModule({
  declarations: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    MembersComponent,
    ActivityCardComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot()
  ],
  exports: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    ActivityCardComponent
  ]
})
export class SharedModule { }

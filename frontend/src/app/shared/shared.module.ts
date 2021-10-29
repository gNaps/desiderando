import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { GiftlistCardComponent } from './card/giftlist-card/giftlist-card.component';
import { MembersComponent } from './members/members.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ActivityCardComponent } from './card/activity-card/activity-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { RouterModule } from '@angular/router';
import { GiftCardComponent } from './card/gift-card/gift-card.component';

@NgModule({
  declarations: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    MembersComponent,
    ActivityCardComponent,
    NavbarComponent,
    SearchInputComponent,
    NavigatorComponent,
    GiftCardComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot(),
    RouterModule
  ],
  exports: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    ActivityCardComponent,
    NavbarComponent,
    SearchInputComponent,
    NavigatorComponent,
    GiftCardComponent,
    MembersComponent
  ]
})
export class SharedModule { }

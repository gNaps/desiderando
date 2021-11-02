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
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { NgbCollapse, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MembersModalComponent } from './modals/members-modal/members-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ControlErrorsComponent,
    GiftlistCardComponent,
    MembersComponent,
    ActivityCardComponent,
    NavbarComponent,
    SearchInputComponent,
    NavigatorComponent,
    GiftCardComponent,
    SuccessModalComponent,
    MembersModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgCircleProgressModule.forRoot(),
    RouterModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule
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

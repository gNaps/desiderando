import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors/control-errors.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ControlErrorsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ControlErrorsComponent
  ]
})
export class SharedModule { }

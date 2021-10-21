import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth.component";
import { RegisterComponent } from "./register/register.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}

import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { TranslateModule } from "@ngx-translate/core";
import { appInit } from "./app-init";
import { DictionaryService } from "./core/dictionary.service";
import { ApiModule } from "./api/api.module";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    TranslateModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [DictionaryService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

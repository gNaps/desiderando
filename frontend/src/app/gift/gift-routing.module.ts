import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftDetailComponent } from "./gift-detail/gift-detail.component";
import { GiftListComponent } from "./gift-list/gift-list.component";
import { GiftResolver } from "./gift.resolver";

const routes: Routes = [
  {
    path: "",
    component: GiftListComponent,
  },
  {
    path: ":id",
    component: GiftDetailComponent,
    resolve: {
      gift: GiftResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftRoutingModule {}

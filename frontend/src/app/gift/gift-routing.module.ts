import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftlistResolver } from "../giftlist/giftlist.resolver";
import { GiftDetailComponent } from "./gift-detail/gift-detail.component";
import { GiftEditComponent } from "./gift-edit/gift-edit.component";
import { GiftListComponent } from "./gift-list/gift-list.component";
import { GiftResolver } from "./gift.resolver";

const routes: Routes = [
  {
    path: "",
    component: GiftListComponent,
  },
  {
    path: "new",
    component: GiftEditComponent,
    resolve: {
      giftlist: GiftlistResolver,
    }
  },
  {
    path: ":id",
    component: GiftDetailComponent,
    resolve: {
      gift: GiftResolver,
    }
  },
  {
    path: "edit/:id",
    component: GiftEditComponent,
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

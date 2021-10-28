import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftlistDetailComponent } from "./giftlist-detail/giftlist-detail.component";
import { GiftlistListComponent } from "./giftlist-list/giftlist-list.component";
import { GiftlistResolver } from "./giftlist.resolver";

const routes: Routes = [
  {
    path: "",
    component: GiftlistListComponent,
  },
  {
    path: ":id",
    component: GiftlistDetailComponent,
    resolve: {
      giftlist: GiftlistResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftlistRoutingModule {}

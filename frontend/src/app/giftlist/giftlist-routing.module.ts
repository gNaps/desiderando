import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftlistDetailComponent } from "./giftlist-detail/giftlist-detail.component";
import { GiftlistListComponent } from "./giftlist-list/giftlist-list.component";

const routes: Routes = [
  {
    path: "",
    component: GiftlistListComponent,
    children: [
      {
        path: "/:id",
        component: GiftlistDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftlistRoutingModule {}

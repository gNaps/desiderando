import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/auth.guard";
import { GiftlistDetailComponent } from "./giftlist-detail/giftlist-detail.component";
import { GiftlistEditComponent } from "./giftlist-edit/giftlist-edit.component";
import { GiftlistListComponent } from "./giftlist-list/giftlist-list.component";
import { GiftlistResolver } from "./giftlist.resolver";

const routes: Routes = [
  {
    path: "",
    component: GiftlistListComponent,
  },
  {
    path: "create",
    component: GiftlistEditComponent,
  },
  {
    path: ":id",
    children: [
      {
        path: "",
        component: GiftlistDetailComponent,
        resolve: {
          giftlist: GiftlistResolver,
        },
      },
      {
        path: "gift",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("../gift/gift.module").then((m) => m.GiftModule),
      },
    ],
  },
  {
    path: "edit/:id",
    component: GiftlistEditComponent,
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

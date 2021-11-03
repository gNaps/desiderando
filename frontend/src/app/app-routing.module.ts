import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { ActivityResolver } from "./activity/activity.resolver";
import { AuthGuard } from "./core/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutComponent } from "./layout/layout.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: "",
        canActivate: [AuthGuard],
        component: LayoutComponent,
        children: [
          {
            canActivate: [AuthGuard],
            path: "dashboard",
            component: DashboardComponent,
          },
          {
            canActivate: [AuthGuard],
            path: "activity",
            component: ActivityComponent,
            resolve: {
              activity: ActivityResolver,
            },
          },
          {
            canActivate: [AuthGuard],
            path: "user-profile",
            component: UserProfileComponent,
          },
          {
            path: "giftlist",
            canLoad: [AuthGuard],
            loadChildren: () =>
              import("./giftlist/giftlist.module").then(
                (m) => m.GiftlistModule
              ),
          },
          {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full",
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

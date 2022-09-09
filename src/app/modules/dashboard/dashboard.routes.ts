import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { ActivityComponent } from "./views/activity/activity.component";
import { CompanyComponent } from "./views/company/company.component";
import { MissionAllComponent } from "./views/mission/mission-all/mission-all.component";
import { MissionCreateComponent } from "./views/mission/mission-create/mission-create.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [
  { path: "dashboard", redirectTo: "dashboard/mission" },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "company", component: CompanyComponent },
      { path: "mission", redirectTo: "mission/all" },
      {
        path: "mission",
        children: [
          { path: "all", component: MissionAllComponent },
          { path: "create", component: MissionCreateComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

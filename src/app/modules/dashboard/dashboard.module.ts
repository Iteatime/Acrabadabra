import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModuleModule } from "src/app/shared/modules/shared-module/shared-module.module";

import { ActivityCardComponent } from "./components/activity-card/activity-card.component";
import { AlertComponent } from "./components/alert/alert.component";
import { ActivityCardSkeletonComponent } from "./components/card-skeleton/card-skeleton.component";
import { FormInputComponent } from "./components/form-input/form-input.component";
import { FromNowComponent } from "./components/from-now/from-now.component";
import { MessageComponent } from "./components/message/message.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routes";
import { ActivityComponent } from "./views/activity/activity.component";
import { CompanyComponent } from "./views/company/company.component";
import { MissionAllComponent } from "./views/mission/mission-all/mission-all.component";
import { MissionCreateComponent } from "./views/mission/mission-create/mission-create.component";
import { ProfileComponent } from "./views/profile/profile.component";

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ProfileComponent,
    ActivityComponent,
    CompanyComponent,
    MessageComponent,
    AlertComponent,
    FromNowComponent,
    MissionAllComponent,
    ActivityCardSkeletonComponent,
    ActivityCardComponent,
    MissionCreateComponent,
    FormInputComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}

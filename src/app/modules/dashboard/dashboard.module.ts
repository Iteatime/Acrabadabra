import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from 'src/app/shared/modules/shared-module/shared-module.module';

import { DashboardRoutingModule } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActivityComponent } from './components/activity/activity.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ProfileComponent,
    ActivityComponent,
    CompanyComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModuleModule],
})
export class DashboardModule {}

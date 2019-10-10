import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { CompanyComponent } from './components/company/company.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MissionListComponent } from '../mission/components/mission-list/mission-list.component';
import { MissionEditComponent } from '../mission/components/mission-edit/mission-edit.component';

const routes: Routes = [
  { path: 'dashboard', redirectTo: 'dashboard/activity' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'mission', redirectTo: 'mission/all' },
      {
        path: 'mission',
        children: [
          { path: 'all', component: MissionListComponent },
          { path: 'create', component: MissionEditComponent },
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

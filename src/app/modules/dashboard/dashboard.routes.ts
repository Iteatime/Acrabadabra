import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetEditComponent } from '../timesheet/components/timesheet-edit/timesheet-edit.component';
import { TimesheetReviewComponent } from '../timesheet/components/timesheet-review/timesheet-review.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MissionEditComponent } from '../mission/components/mission-edit/mission-edit.component';

const routes: Routes = [
  {
    path: 'timesheet',
    children: [
      { path: 'create', component: TimesheetEditComponent },
      { path: 'edit/:data', component: TimesheetEditComponent },
      { path: 'review/:data', component: TimesheetReviewComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mission', component: MissionEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

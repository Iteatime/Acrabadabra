import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/components/dashboard/dashboard.component';
import { TimesheetEditComponent } from '../timesheet/components/timesheet-edit/timesheet-edit.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }

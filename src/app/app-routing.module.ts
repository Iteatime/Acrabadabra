import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';

import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';

import { TimesheetService } from './shared/timesheet.service';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'timesheet/create', component: EditTimesheetComponent, canActivate: [TimesheetService] },
  { path: 'timesheet/edit/:token', component: EditTimesheetComponent, canActivate: [TimesheetService] },
  { path: 'timesheet/review/:token', component: ReviewTimesheetComponent, canActivate: [TimesheetService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

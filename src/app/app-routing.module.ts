import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'timesheet/:mode/:token', component: TimesheetComponent },
  { path: 'timesheet/:mode', component: TimesheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

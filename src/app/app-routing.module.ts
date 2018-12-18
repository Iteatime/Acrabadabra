import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { CanActivateTimesheetModeService } from './shared/routing/can-activate-timesheet-mode.service';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'timesheet/create', component: EditTimesheetComponent, canActivate: [CanActivateTimesheetModeService] },
  { path: 'timesheet/edit/:token', component: EditTimesheetComponent, canActivate: [CanActivateTimesheetModeService] },
  { path: 'timesheet/review/:token', component: ReviewTimesheetComponent, canActivate: [CanActivateTimesheetModeService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

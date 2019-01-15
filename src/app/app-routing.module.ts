import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';
import { PdfInvoiceComponent } from './pdf-invoice/pdf-invoice.component';
import { TimesheetEditComponent } from './components/timesheet/timesheet-edit/timesheet-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'timesheet/create', component: TimesheetEditComponent },
  { path: 'timesheet/edit/:data', component: TimesheetEditComponent },
  { path: 'timesheet/review/:data', component: ReviewTimesheetComponent },
  { path: 'invoice/:data', component: PdfInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

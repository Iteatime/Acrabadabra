import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/components/header/header.component';

import { InvoicePDFComponent } from './components/invoice-pdf/invoice-pdf.component';

import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetReviewComponent } from './components/timesheet-review/timesheet-review.component';

const routes: Routes = [
  {
    path: 'timesheet', children: [
      { path: 'create', component: TimesheetEditComponent },
      { path: 'edit/:data', component: TimesheetEditComponent },
      { path: 'review/:data', component: TimesheetReviewComponent },
    ]
  },
  { path: 'invoice/:data', component: InvoicePDFComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }

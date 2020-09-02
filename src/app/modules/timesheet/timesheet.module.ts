import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CalendarModule } from '../calendar/calendar.module';
import { ExpenseModule } from '../expense/expense.module';
import { TimesheetRoutingModule } from './timesheet.routes';

import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicePDFComponent } from './components/invoice-pdf/invoice-pdf.component';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetReviewComponent } from './components/timesheet-review/timesheet-review.component';

import { MailtoDirective } from 'src/app/shared/directives/mailto/mailto.directive';
import { SharedModuleModule } from 'src/app/shared/modules/shared-module/shared-module.module';

@NgModule({
  imports: [CommonModule, TimesheetRoutingModule, CalendarModule, FormsModule, ExpenseModule, SharedModuleModule],
  declarations: [
    InvoiceFormComponent,
    InvoicePDFComponent,
    TimesheetEditComponent,
    TimesheetReviewComponent,
    MailtoDirective,
  ],
})
export class TimesheetModule {}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CalendarModule } from '../calendar/calendar.module';

import { TimesheetRoutingModule } from './timesheet.routes';

import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicePDFComponent } from './components/invoice-pdf/invoice-pdf.component';
import { TimesheetEditComponent } from './components/timesheet-edit/timesheet-edit.component';
import { TimesheetReviewComponent } from './components/timesheet-review/timesheet-review.component';

import { CopyToClipboardDirective } from 'src/app/shared/directives/copy-to-clipboard/copy-to-clipboard.directive';
import { MailtoDirective } from 'src/app/shared/directives/mailto/mailto.directive';

import { ExpenseMileageTableComponent } from './components/expense-mileage-table/expense-mileage-table.component';
import { ExpenseMileageFormComponent } from './components/expense-mileage-form/expense-mileage-form.component';
import { ExpenseMiscellaneousFormComponent } from './components/expense-miscellaneous-form/expense-miscellaneous-form.component';
import { ExpenseMiscellaneousTableComponent } from './components/expense-miscellaneous-table/expense-miscellaneous-table.component';
import { ExpenseFlatFeeFormComponent } from './components/expense-flat-fee-form/expense-flat-fee-form.component';

@NgModule({
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    CalendarModule,
    FormsModule,
  ],
  declarations: [
    InvoiceFormComponent,
    InvoicePDFComponent,
    TimesheetEditComponent,
    TimesheetReviewComponent,
    ExpenseMileageFormComponent,

    CopyToClipboardDirective,
    MailtoDirective,
    ExpenseMileageTableComponent,
    ExpenseMiscellaneousFormComponent,
    ExpenseMiscellaneousTableComponent,
    ExpenseFlatFeeFormComponent,
  ]
})
export class TimesheetModule { }

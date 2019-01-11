import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app.routes';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { TimesheetModule } from './modules/timesheet/timesheet.module';

import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { InvoiceFormComponent } from './edit-timesheet/invoice-form/invoice-form.component';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';

import { CalendarComponent } from './calendar/calendar.component';

import { CopyToClipboardDirective } from './shared/copy-to-clipboard.directive';
import { MailtoDirective } from './shared/mailto.directive';

import { PdfInvoiceComponent } from './pdf-invoice/pdf-invoice.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    EditTimesheetComponent,
    InvoiceFormComponent,
    ReviewTimesheetComponent,

    CalendarComponent,

    CopyToClipboardDirective,
    MailtoDirective,

    PdfInvoiceComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    TimesheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

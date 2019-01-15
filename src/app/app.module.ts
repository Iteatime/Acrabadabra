import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { TimesheetEditComponent } from './components/timesheet/timesheet-edit/timesheet-edit.component';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';
import { InvoiceFormComponent } from './components/invoice/invoice-form/invoice-form.component';

import { CalendarComponent } from './calendar/calendar.component';

import { CopyToClipboardDirective } from './shared/copy-to-clipboard.directive';
import { MailtoDirective } from './shared/mailto.directive';

import { PdfInvoiceComponent } from './pdf-invoice/pdf-invoice.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    InvoiceFormComponent,
    ReviewTimesheetComponent,
    TimesheetEditComponent,

    CalendarComponent,

    CopyToClipboardDirective,
    MailtoDirective,

    PdfInvoiceComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarComponent } from './timesheet/edit-cra/calendar/calendar.component';
import { EditCraComponent } from './timesheet/edit-cra/edit-cra.component';
import { InvoiceFormComponent } from './timesheet/edit-cra/invoice-form/invoice-form.component';
import { ReviewComponent } from './timesheet/review/review.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

import { HomeComponent } from './home/home.component';


import { CopyToClipboardDirective } from './shared/copy-to-clipboard.directive';
import { ModalDirective } from './shared/style/modal.directive';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,

    TimesheetComponent,
    EditCraComponent,
    CalendarComponent,

    HomeComponent,

    InvoiceFormComponent,

    ModalDirective,

    CopyToClipboardDirective,

    ReviewComponent,

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

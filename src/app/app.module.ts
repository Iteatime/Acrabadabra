import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BillComponent } from './bill/bill.component';

import { CrasComponent } from './cras/cras.component';
import { EditCraComponent } from './cras/edit-cra/edit-cra.component';
import { CalendarComponent } from './cras/edit-cra/calendar/calendar.component';

import { HomeComponent } from './home/home.component';

import { ModalDirective } from './shared/style/modal.directive';
import { BillingFormComponent } from './cras/edit-cra/billing-form/billing-form.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,

    BillComponent,

    CrasComponent,
    EditCraComponent,
    CalendarComponent,

    HomeComponent,

    ModalDirective,

    BillingFormComponent,

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

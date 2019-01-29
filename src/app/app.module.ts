import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app.routes';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { TimesheetModule } from './modules/timesheet/timesheet.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ContextMenuModule } from 'ngx-contextmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CrasComponent } from './cras/cras.component';
import { EditCraComponent } from './cras/edit-cra/edit-cra.component';
import { CalendarComponent } from './cras/edit-cra/calendar/calendar.component';

import { HomeComponent } from './home/home.component';

import { ModalDirective } from './shared/style/modal.directive';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,

    CrasComponent,
    EditCraComponent,
    CalendarComponent,

    HomeComponent,

    ModalDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

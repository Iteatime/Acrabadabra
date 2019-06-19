import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';

import { CalendarModule as AngularCalendar, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarSelectorComponent } from './components/calendar-selector/calendar-selector.component';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    AngularCalendar.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CommonModule, CalendarSelectorComponent],
  declarations: [CalendarSelectorComponent],
})
export class CalendarModule {}

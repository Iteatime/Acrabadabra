import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as moment from '@sebastien-cleany/moment-ferie-fr';
import 'moment/locale/fr';

import { CalendarSelectorComponent } from './components/calendar-selector/calendar-selector.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    CalendarSelectorComponent,
  ],
  declarations: [
    CalendarSelectorComponent,
  ]
})
export class CalendarModule {}

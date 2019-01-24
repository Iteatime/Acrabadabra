import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import * as moment from '@sebastien-cleany/moment-ferie-fr';

import { CalendarSelectorComponent } from './components/calendar-selector/calendar-selector.component';

registerLocaleData(localeFr);

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
export class CalendarModule {
  constructor() {
    moment.locale('fr', {
      months : 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
      weekdays : 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
      week : { dow : 1, doy : 4 }
    });
  }
}

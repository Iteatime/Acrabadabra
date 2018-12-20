import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/@types/timesheet';

@Injectable({
  providedIn: 'root'
})
export class CalendarManagerService {

  constructor() { }

  getWorkedTime(timesheet: Timesheet): number {
    let time = 0;

    timesheet.workingDays[Object.keys(timesheet.workingDays)[0]].forEach(element => {
      time += element;
    });

    return time;
  }

  getDate(timesheet: Timesheet): Date {
    const dateString = Object.keys(timesheet.workingDays)[0].split('.');

    return new Date(+dateString[1], +dateString[0]);
  }
}

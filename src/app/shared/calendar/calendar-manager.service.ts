import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/@types/timesheet';

@Injectable({
  providedIn: 'root'
})
export class CalendarManagerService {

  constructor() { }

  getWorkedTime(timesheet: Timesheet) {
    let time = 0;

    timesheet.workingDays[Object.keys(timesheet.workingDays)[0]].forEach(element => {
      time += element;
    });

    return time;
  }
}

import { Injectable } from '@angular/core';
import { Cra } from 'src/app/@types/cra';

@Injectable({
  providedIn: 'root'
})
export class CalendarManagerService {

  constructor() { }

  getWorkedTime(timesheet: Cra) {
    let time = 0;

    timesheet.timesheet[Object.keys(timesheet.timesheet)[0]].forEach(element => {
      time += element;
    });

    return time;
  }
}

import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/@types/timesheet';
import { CalendarEvent } from 'calendar-utils';
import { lastDayOfMonth, differenceInMinutes } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CalendarManagerService {

  constructor() { }

  getWorkedTime(timesheet: Timesheet): number {
    let time = 0;

    if (Object.keys(timesheet.workingDays).length > 0) {
      timesheet.workingDays[Object.keys(timesheet.workingDays)[0]].forEach(element => {
        time += element;
      });
    }
    return time;
  }

  getDate(timesheet: Timesheet): Date {

    if (Object.keys(timesheet.workingDays).length > 0) {
      const dateString = Object.keys(timesheet.workingDays)[0].split('.');
      return new Date(+dateString[1], +dateString[0]);
    } else {
      return new Date();
    }
  }

  getworkingDays(events: CalendarEvent[]): any {
    const month = new Date(events[0].start).getMonth(),
          year = new Date(events[0].start).getFullYear(),
          minitimesheet = {};
          minitimesheet[month + '.' + year] = new Array();
    for (let date = 0; date < new Date(lastDayOfMonth(events[0].start)).getDate(); date++) {
      let time = 0;
      events.forEach(aDay => {
        if (date + 1 === new Date(aDay.start).getDate()) {
          time = differenceInMinutes(aDay.end, aDay.start) / 60 / 8;
          return;
        }
      });
      minitimesheet[month + '.' + year][date] = time;
    }
    return minitimesheet;
  }
}

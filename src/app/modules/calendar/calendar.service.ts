import { Injectable } from '@angular/core';

import { CalendarEvent } from 'calendar-utils';

import { lastDayOfMonth, differenceInMinutes, getDaysInMonth } from 'date-fns';

import { Timesheet } from 'src/app/shared/@types/timesheet';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

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

  getWorkingDays(events: CalendarEvent[]): any {
    if (events[0] !== undefined) {
      const month = new Date(events[0].start).getMonth(),
          year = new Date(events[0].start).getFullYear(),
          workingDays = {};
          workingDays[month + '.' + year] = new Array();
    for (let date = 0; date < new Date(lastDayOfMonth(events[0].start)).getDate(); date++) {
      let time = 0;
      events.forEach(aDay => {
        if (date + 1 === new Date(aDay.start).getDate()) {
          time = differenceInMinutes(aDay.end, aDay.start) / 60 / 8;
          return;
        }
      });
      workingDays[month + '.' + year][date] = time;
    }
    return workingDays;
    } else {
      return {};
    }
  }

  public getFirstWorkingDay(timesheet: Timesheet): Date | boolean {
    let date;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      timesheet.workingDays[timesheetDate].some((time, day) => {
        date = new Date(
          +Number.parseInt(timesheetDate.split('.')[1], 10),
          +Number.parseInt(timesheetDate.split('.')[0], 10),
        );
        date.setDate(day + 1);
        return time > 0;
      });
    }

    return !!date ? date : false;
  }

  public getLastWorkingDay(timesheet: Timesheet): Date | boolean {
    let date;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      [...timesheet.workingDays[timesheetDate]].reverse().some((time, day) => {
        date = new Date(
          +Number.parseInt(timesheetDate.split('.')[1], 10),
          +Number.parseInt(timesheetDate.split('.')[0], 10)
        );
        date.setDate(getDaysInMonth(date) - (day));
        return time > 0;
      });
    }

    return !!date ? date : false;
  }
}

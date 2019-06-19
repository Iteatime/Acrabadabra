import { Injectable } from '@angular/core';

import { CalendarEvent } from 'calendar-utils';

import { differenceInMinutes, getDaysInMonth, lastDayOfMonth } from 'date-fns';

import { Timesheet } from 'src/app/shared/models/timesheet.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor() {}

  getWorkedTime(timesheet: Timesheet): number {
    let time = 0;

    if (Object.keys(timesheet.workingDays).length > 0) {
      timesheet.workingDays[Object.keys(timesheet.workingDays)[0]].forEach((element: number) => {
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
    if (events[0]) {
      const month = new Date(events[0].start).getMonth();
      const year = new Date(events[0].start).getFullYear();
      const workingDays: any = {};
      workingDays[month + '.' + year] = new Array();

      for (let date = 0; date < new Date(lastDayOfMonth(events[0].start)).getDate(); date++) {
        let time = 0;
        events.forEach((aDay: any) => {
          if (date + 1 === new Date(aDay.start).getDate()) {
            time = differenceInMinutes(aDay.end, aDay.start) / 60 / 8;
            return;
          }
        });
        workingDays[month + '.' + year][date] = time;
      }
      return workingDays;
    }

    return {};
  }

  getFirstWorkingDay(timesheet: Timesheet): Date | boolean {
    let date;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      timesheet.workingDays[timesheetDate].some((time: number, day: number) => {
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

  getLastWorkingDay(timesheet: Timesheet): Date | boolean {
    let lastWorkingDay: Date | null = null;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      timesheet.workingDays[timesheetDate].reverse().some((time: number, day: number) => {
        lastWorkingDay = new Date(
          +Number.parseInt(timesheetDate.split('.')[1], 10),
          +Number.parseInt(timesheetDate.split('.')[0], 10),
        );
        lastWorkingDay.setDate(getDaysInMonth(lastWorkingDay) - day);
        return time > 0;
      });
    }

    return !!lastWorkingDay ? lastWorkingDay : false;
  }
}

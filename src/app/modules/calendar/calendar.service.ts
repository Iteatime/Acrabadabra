import { Injectable } from '@angular/core';

import { CalendarEvent } from 'calendar-utils';

import { lastDayOfMonth, differenceInMinutes, getDaysInMonth, addMinutes } from 'date-fns';

import { Timesheet } from 'src/app/shared/@types/timesheet';
import { WorkingEvent } from 'src/app/shared/@types/workingEvent';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  // available time units
  timeUnits = {
    days: {
      label: 'journées',
      timeInMinutes: 8 * 60,
    },
    hours: {
      label: 'heures',
      timeInMinutes: 60,
    },
  };
  defaultTimeUnit = 'days';

  constructor() {}

  getSelectedTimeUnit(timesheet: CalendarEvent[]): string {
    return timesheet.length > 0 ? timesheet[0].title : this.defaultTimeUnit;
  }

  getWorkedTime(timesheet: Timesheet): WorkingEvent[] {
    const workedTime: WorkingEvent[] = [];

    if (Object.keys(timesheet.workingDays).length > 0) {
      const workedTimeObj = {};
      timesheet.workingDays[Object.keys(timesheet.workingDays)[0]].forEach((event: WorkingEvent) => {
        if (event.unit) {
          const entry = workedTimeObj[event.unit];
          entry ? (workedTimeObj[event.unit] += event.time) : (workedTimeObj[event.unit] = event.time);
        }
      });
      Object.keys(workedTimeObj).forEach(key =>
        workedTime.push({
          time: key === 'hours' ? Math.round(workedTimeObj[key]) : workedTimeObj[key], // prevent 24 hours issue
          unit: key,
        }),
      );
    }

    return workedTime;
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
      const month = new Date(events[0].start).getMonth();
      const year = new Date(events[0].start).getFullYear();
      const workingDays = {};
      workingDays[month + '.' + year] = [];
      for (let date = 0; date < new Date(lastDayOfMonth(events[0].start)).getDate(); date++) {
        let day: WorkingEvent = { time: 0, unit: '' };
        events.forEach(event => {
          if (date + 1 === new Date(event.start).getDate()) {
            day = this.getDayFromEvent(event);
            return;
          }
        });
        workingDays[month + '.' + year][date] = day;
      }
      return workingDays;
    }

    return {};
  }

  getDayFromEvent(event: CalendarEvent): WorkingEvent {
    return {
      time: differenceInMinutes(event.end, event.start) / this.timeUnits[event.title].timeInMinutes,
      unit: event.title,
    };
  }

  getTimeFromCalendarEvent(event: CalendarEvent): number {
    let time = differenceInMinutes(event.end, event.start) / this.timeUnits[event.title].timeInMinutes;

    if (event.title === 'hours') {
      time = Math.round(time);
    }

    return time;
  }

  getTimeFromWorkingEvent(event: WorkingEvent): number {
    return event.time * this.timeUnits[event.unit].timeInMinutes;
  }

  getNewEndDate(event: CalendarEvent, time: number): Date {
    let date = addMinutes(event.start, time * this.timeUnits[event.title].timeInMinutes);

    if (event.title === 'hours' && time === 24) {
      date = addMinutes(date, -1);
    }

    return date;
  }

  getTimeUnitLabel(key: string): string {
    return this.timeUnits[key].label;
  }

  getFirstWorkingDay(timesheet: Timesheet): Date | boolean {
    let date;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      timesheet.workingDays[timesheetDate].some((event: WorkingEvent, day: number) => {
        date = new Date(
          +Number.parseInt(timesheetDate.split('.')[1], 10),
          +Number.parseInt(timesheetDate.split('.')[0], 10),
        );
        date.setDate(day + 1);
        return event.time > 0;
      });
    }

    return !!date ? date : false;
  }

  getLastWorkingDay(timesheet: Timesheet): Date | boolean {
    let date;

    if (Object.keys(timesheet.workingDays).length > 0) {
      const timesheetDate = Object.keys(timesheet.workingDays)[0];
      [...timesheet.workingDays[timesheetDate]].reverse().some((event: WorkingEvent, day: number) => {
        date = new Date(
          +Number.parseInt(timesheetDate.split('.')[1], 10),
          +Number.parseInt(timesheetDate.split('.')[0], 10),
        );
        date.setDate(getDaysInMonth(date) - day);
        return event.time > 0;
      });
    }

    return !!date ? date : false;
  }
}

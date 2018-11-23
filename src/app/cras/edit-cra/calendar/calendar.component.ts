import { Component, ChangeDetectionStrategy, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';

import {
  addHours,
  addMinutes,
  addMonths,
  differenceInMinutes,
  endOfMonth,
  isSameDay,
  isSameMonth,
  setDate,
  startOfDay,
  startOfMonth,
  getDay,
  setMonth,
  subMonths,
  setYear,
} from 'date-fns';

import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @Input() picking: boolean;

  @Input() miniTimesheet: any;
  timesheet: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();

  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  totalWorkedTime: number;

  constructor() {}

  ngOnInit(): void {
    this.parseMinifiedTimesheet();
  }

  parseMinifiedTimesheet(): void {
    const miniTimesheetKey = Object.keys(this.miniTimesheet)[0];

    if (miniTimesheetKey !== undefined) {
      const monthNumber = miniTimesheetKey.split('.')[0];
      const year = miniTimesheetKey.split('.')[1];
      const month = this.miniTimesheet[miniTimesheetKey];

      this.viewDate = setMonth(setYear(this.viewDate, +year), +monthNumber);

      for (let date = 0; date < month.length; date++) {
        const day = new Date(+year, +monthNumber, date + 1);

        if (month[date] !== undefined && month[date] !== 0) {
          this.addDay(day, addMinutes(day, month[date] * 60 * 8));
        }
      }
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.totalWorkedTime = 0;

    body.forEach(day => {
      if (!this.picking) {
        day.cssClass = 'cal-disabled';
      }

      day.events.forEach((event) => {
        const dayTime = differenceInMinutes(event.end, event.start) / 60 / 8;
        day.badgeTotal = dayTime;
        this.totalWorkedTime += dayTime;
      });
    });
  }

  getADayWorkingTime(date: Date): CalendarEvent {
    let day: CalendarEvent;

    this.timesheet.forEach(
      (aDay) => {
        if (isSameDay(date, aDay.start)) {
          day = aDay;
          return;
        }
      }
    );
    return day;
  }

  isADayWorked = (day: Date): boolean => {
    let dayExist = false;

    this.timesheet.forEach(
      (aDay) => {
        if (isSameDay(aDay.start, day)) {
          dayExist = true;
          return;
        }
      }
    );
    return dayExist;
  }

  dayClicked(date: Date): void {
    if (isSameMonth(date, this.viewDate)) {
      if (!this.isADayWorked(date)) {
        this.addDay(date);
      } else {
        this.deleteDay(date);
      }
    }

    this.refresh.next();
  }

  dayEdited(event: Event, date: Date, time: number): void {
    event.stopPropagation();

    const day = this.getADayWorkingTime(date),
          end = addMinutes(day.start, 8 * 60 * time);

    if (time !== 0 && end) {
      day.end = end;
    } else {
      this.deleteDay(date);
    }

    this.refresh.next();
  }

  selectAllBusinessDays(): void {
    const monthStart = startOfMonth(this.viewDate).getDate(),
          monthEnd = endOfMonth(this.viewDate).getDate();

    for (let date = monthStart; date <= monthEnd; date++) {
      const aDay = setDate(this.viewDate, date);

      if (!this.isADayWorked(aDay) && this.weekendDays.indexOf(getDay(aDay)) === -1) {
        this.addDay(aDay);
      }
    }

    this.refresh.next();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.emptyDays();
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.emptyDays();
  }

  emptyDays(): void {
    this.timesheet = [];
    this.refresh.next();
  }

  addDay(date: Date, end?: Date): void {
    date = startOfDay(date);

    if (end === undefined) {
      end = addHours(date, 8);
    }

    this.timesheet.push({
      title: '',
      start: date,
      end: end,
      draggable: false,
    });
  }

  deleteDay(day: Date): void  {
    this.timesheet = this.timesheet.filter(
      (iEvent) => !isSameDay(day, iEvent.start)
    );
  }
}

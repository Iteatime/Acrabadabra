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
import { FormControl } from '@angular/forms';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

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
  today =  new Date();
  viewDate: Date = new Date(this.today);
  totalTime: number;

  constructor() {}

  ngOnInit(): void {
    const key = Object.keys(this.miniTimesheet)[0];

    if (key !== undefined) {
      const monthNumber = key.split('.')[0];
      const year = key.split('.')[1];
      const month = this.miniTimesheet[key];

      this.viewDate = setMonth(setYear(this.viewDate, +year), +monthNumber);

      for (let date = 1; date < month.length; date++) {
        const day = new Date(+year, +monthNumber, date);

        if (month[date] !== undefined && month[date] !== 0) {
          this.addDay(day, addMinutes(day, month[date] * 60 * 8));
        }

      }
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.totalTime = 0;

    body.forEach(day => {
      if (!this.picking) {
        day.cssClass = 'cal-disabled';
      }
      day.events.forEach((event) => {
        const dayTime = differenceInMinutes(event.end, event.start) / 60 / 8;
        day.badgeTotal = dayTime;
        this.totalTime += dayTime;
      });
    });
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
      color: colors.red,
      draggable: false,
      meta: {

      }
    });

    this.refresh.next();
  }

  deleteDay(day: Date): void  {
    this.timesheet = this.timesheet.filter(
      (iEvent) => !isSameDay(day, iEvent.start)
    );

    this.refresh.next();
  }

  dayClicked(date: Date): void {
    if (isSameMonth(date, this.viewDate)) {
      if (!this.dayExist(date)) {
        this.addDay(date);
      } else {
        this.deleteDay(date);
      }
    }

    this.refresh.next();
  }

  selctAll(): void {
    const monthStart = startOfMonth(this.viewDate).getDate();
    const monthEnd = endOfMonth(this.viewDate).getDate();

    for (
      let date = monthStart;
      date <= monthEnd;
      date++
    ) {
      const aDay = setDate(this.viewDate, date);
      if (!this.dayExist(aDay) && this.weekendDays.indexOf(getDay(aDay)) === -1) {
        this.addDay(aDay);
      }
    }
  }

  getWorkTime(date: Date): CalendarEvent {
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

  dayExist = (day: Date): boolean => {
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

  nextMonth(date: string): void {
    const nextMonth = addMonths(this[date], 1);

    this[date] = nextMonth;
    this.emptyDays();
  }

  previousMonth(date: string): void {
    const lastMonth = subMonths(this[date], 1);

    this[date] = lastMonth;
    this.emptyDays();
  }

  emptyDays(): void {
    this.timesheet = [];
    this.refresh.next();
  }
}

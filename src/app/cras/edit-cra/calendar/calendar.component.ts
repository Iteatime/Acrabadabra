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
  compareAsc,
  getMonth,
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
  months: Date[];

  dayToEdit: Date;

  monthSelector: FormControl;
  controls: FormControl[] = [];

  constructor() {}

  ngOnInit(): void {
    const key = Object.keys(this.miniTimesheet)[0];

    this.monthSelector = new FormControl(
      {
        value: this.viewDate,
        disabled: true,
      }
    );
    this.controls.push(this.monthSelector);

    if (key !== undefined) {
      const monthNumber = key.split('.')[0];
      const year = key.split('.')[1];

      this.viewDate = setMonth(setYear(this.viewDate, +year), +monthNumber);

      const month = this.miniTimesheet[key];

      for (let date = 1; date < month.length; date++) {
        const day = new Date(+year, +monthNumber, date);

        if (month[date] !== undefined && month[date] !== 0) {
          this.addDay(day, addMinutes(day, month[date] * 60 * 8));
        }

      }
    }

    this.months = this.getMonths();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.picking) {
        day.cssClass = 'cal-disabled';
      }
      day.events.forEach((event) => {
        day.badgeTotal = differenceInMinutes(event.end, event.start) / 60 / 8;
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

  editDay(date: Date, inputTime: number) {
    if (inputTime <= 1) {
      const day = this.getDay(date);
      const endDate = addMinutes(day.start, inputTime * 60 * 8);
      day.end = endDate;
    }

    setTimeout(() => this.dayToEdit = null, 50);

  }

  dayClicked(date: Date): void {
    if (isSameMonth(date, this.viewDate)) {
      if (!this.dayExist(date)) {
        this.addDay(date);
      } else if (!isSameDay(date, this.dayToEdit)) {
        this.deleteDay(date);
      }
    }

    setTimeout(() => this.refresh.next(), 50);
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

  getDay(date: Date): CalendarEvent {

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

  testDays(date: Date, date2: Date): boolean {
    return isSameDay(date, date2);
  }

  testMonths(month: Date, month2: Date): boolean {
    return isSameMonth(month, month2);
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

  dayNotExist = (day: Date): boolean => {
    return !this.dayExist(day) && isSameMonth(day, this.viewDate);
  }

  getMonths(): Date[] {
    const months: Date[] = [],
          monthNumber = getMonth(this.viewDate);

    for (let month = 0; month < 12; month++) {
      months.push(
        setMonth(startOfMonth(this.viewDate), month)
      );
    }

    return months;
  }

  nextMonth(date: string): void {
    const nextMonth = addMonths(this[date], 1);

    if (!this.monthExist(nextMonth)) {
      this.months.push(nextMonth);
    }
    this.sortMonth();
    this[date] = nextMonth;
    this.emptyDays();
  }

  previousMonth(date: string): void {
    const lastMonth = subMonths(this[date], 1);

    if (!this.monthExist(lastMonth)) {
      this.months.push(lastMonth);
    }
    this.sortMonth();
    this[date] = lastMonth;
    this.emptyDays();
  }

  sortMonth(): void {
    this.months.sort(
      (a: Date, b: Date): number => {
        return compareAsc(a, b);
      }
    );
  }

  monthExist(month: Date): boolean {
    let result = false;

    this.months.forEach(
      (aMonth: Date) => {
        if (isSameMonth(aMonth, month)) {
          result = true;
          return;
        }
      }
    );

    return result;
  }

  emptyDays(): void {
    this.timesheet = [];

    this.refresh.next();
  }
}

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
} from 'date-fns';

import { CalendarEvent, CalendarMonthViewDay, DAYS_OF_WEEK } from 'angular-calendar';


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

  @Input() events: CalendarEvent[];
  refresh: Subject<any> = new Subject();

  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();

  dayToEdit: Date;

  constructor() {}

  ngOnInit(): void {
    this.events.forEach((aDay) => {
        aDay.start = new Date(aDay.start);
        aDay.end = new Date(aDay.end);
      }
    );
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

    this.events.push({
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
    console.log('deleting');
    console.log(day);

    this.events = this.events.filter(
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
      if (!this.dayExist(aDay)) {
        this.addDay(aDay);
      }
    }
  }

  getDay(date: Date): CalendarEvent {

    let day: CalendarEvent;

    this.events.forEach(
      (aDay) => {
        if (isSameDay(date, aDay.start)) {
          day = aDay;
          return;
        }
      }
    );

    return day;
  }

  testDay(date: Date, date2: Date): boolean {
    return isSameDay(date, date2);
  }

  dayExist = (day: Date): boolean => {
    let dayExist = false;

    this.events.forEach(
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
    return !this.dayExist(day);
  }

  log(any: any) {
    console.log(any);
  }
}

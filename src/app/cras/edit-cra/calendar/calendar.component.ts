import { Component, ChangeDetectionStrategy, Output, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';

import { startOfDay, isSameMonth, isSameDay, endOfDay, startOfMonth, endOfMonth, setDate } from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {
    this.events.forEach((aDay) => {
      aDay.start = new Date(aDay.start);
      aDay.end = new Date(aDay.end);
    }
  );
  }

  addDay(date: Date, end: Date = endOfDay(date)): void {
    this.events.push({
      title: '',
      start: startOfDay(date),
      end: end,
      color: colors.red,
      draggable: false,
    });
    this.refresh.next();
  }

  deleteDay(day: Date): void  {
    this.events = this.events.filter(
      (iEvent) => !isSameDay(day, iEvent.start)
    );
  }

  dayExist(day: Date): boolean {
    let dayExist = false;

    this.events.forEach((aDay) => {
        if (isSameDay(aDay.start, day)) {
          dayExist = true;
          return true;
        }
      }
    );
    return dayExist;
  }

  dayClicked(date): void {
    if (isSameMonth(date, this.viewDate) && !this.dayExist(date)) {
      this.addDay(date);
    } else {
      this.deleteDay(date);
    }
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

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.picking) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
}

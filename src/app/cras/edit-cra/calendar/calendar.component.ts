import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';

import { startOfDay, isSameMonth, addHours } from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';

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
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  locale = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  constructor(private modal: NgbModal) {}

  addEvent(date: Date): void {
    this.events.push({
      title: '',
      start: startOfDay(date),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  deleteEvent(event: CalendarEvent): void {
    this.events = this.events.filter(iEvent => iEvent !== event);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate) && events.length === 0) {
      this.addEvent(date);
    } else {
      this.deleteEvent(events[0]);
    }
  }

}

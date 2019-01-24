import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-calendar-selector',
  templateUrl: './calendar-selector.component.html',
  styleUrls: ['./calendar-selector.component.scss']
})
export class CalendarSelectorComponent {
  @Input() enable: boolean;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  locale = 'fr';

  constructor(public calendarService: CalendarService) {}

  selectAllBusinessDays(): void {
    this.calendarService.workingDays.forEach(week => {
      week.forEach(day => {
        if (this.calendarService.isBusinessDay(day.date)) {
          day.time = 1;
        }
      });
    });
    this.changed.emit(true);
  }

  emptySelection(): void {
    this.calendarService.workingDays.forEach(week => {
      week.forEach(day => {
        day.time = 0;
      });
    });
    this.changed.emit(true);
  }

  editDayTime(event: Event, week: number, day: number, time: number) {
    if (this.enable) {
      event.stopPropagation();
      this.calendarService.workingDays[week][day].time = time;
      this.changed.emit(true);
    }
  }

  toggleDay(event: Event, week: number, day: number) {
    if (this.enable) {
      event.stopPropagation();
      if  (this.calendarService.workingDays[week][day].time !== 0) {
        this.calendarService.workingDays[week][day].time = 0;
      } else {
        this.calendarService.workingDays[week][day].time = 1;
      }
      this.changed.emit(true);
    }
  }

  nextMonth(): void {
    this.calendarService.setPeriod(this.calendarService.period.month.add(1, 'month'));
    this.changed.emit(true);
  }

  previousMonth(): void {
    this.calendarService.setPeriod(this.calendarService.period.month.subtract(1, 'month'));
    this.changed.emit(true);
  }
}

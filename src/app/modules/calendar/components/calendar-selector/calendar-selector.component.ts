import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  addMinutes,
  addMonths,
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
import { CalendarService } from '../../calendar.service';
import { TimeUnit } from 'src/app/shared/@types/timeUnit';

@Component({
  selector: 'app-calendar-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-selector.component.html',
  styleUrls: ['./calendar-selector.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class CalendarSelectorComponent implements OnInit, OnDestroy {
  @Input() minifiedTimesheet: any;
  @Input() picking: boolean;
  @Output() changed = new EventEmitter<boolean>();
  timesheet: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  timeUnits: TimeUnit[] = [];
  selectedTimeUnit: string;
  totalWorkedTime = 0;

  constructor(private readonly changeDetector: ChangeDetectorRef, private readonly calendarService: CalendarService) {}

  ngOnInit(): void {
    this.setTimeUnits();

    this._initTimesheet();

    this.selectedTimeUnit = this.calendarService.getSelectedTimeUnit(this.timesheet);

    this.refresh.subscribe(() => {
      this.changeDetector.detectChanges();
      this.changed.emit();
    });

    setTimeout(() => {
      if (!this.refresh.isStopped) {
        this.changeDetector.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.totalWorkedTime = 0;

    body.forEach(day => {
      if (!this.picking) {
        day.cssClass = 'cal-disabled';
      }

      day.events.forEach(event => {
        const time = this.calendarService.getTimeFromCalendarEvent(event);
        day.badgeTotal = time;
        this.totalWorkedTime += time;
      });
    });
  }

  getDayWorkedTime(day: any): number {
    let time = 0;
    day.events.forEach((event: CalendarEvent) => {
      time = this.calendarService.getTimeFromCalendarEvent(event);
    });

    return time;
  }

  setTimeUnit(unit: string): void {
    this.selectedTimeUnit = unit;
    this.emptyDays();
  }

  dayClicked(date: Date): void {
    if (isSameMonth(date, this.viewDate)) {
      if (!this._isDayWorked(date)) {
        this._addTimesheetDay(date);
      } else {
        this._deleteDay(date);
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

  selectAllBusinessDays(): void {
    const monthStart = startOfMonth(this.viewDate).getDate();
    const monthEnd = endOfMonth(this.viewDate).getDate();

    for (let date = monthStart; date <= monthEnd; date++) {
      const aDay = setDate(this.viewDate, date);

      if (!this._isDayWorked(aDay) && this.weekendDays.indexOf(getDay(aDay)) === -1) {
        this._addTimesheetDay(aDay);
      }
    }
    this.refresh.next();
  }

  emptyDays(): void {
    this.timesheet = [];
    this.refresh.next();
  }

  dayEdited(event: Event, date: Date, time: number): void {
    event.stopPropagation();

    const day = this._getDayWorkingTime(date);
    const end = this.calendarService.getNewEndDate(day, time);

    if (time !== 0 && end) {
      day.end = end;
    } else {
      this._deleteDay(date);
    }

    this.refresh.next();
  }

  private setTimeUnits(): void {
    Object.keys(this.calendarService.timeUnits).forEach(key => {
      const timeUnit: TimeUnit = this.calendarService.timeUnits[key];
      this.timeUnits.push({
        label: timeUnit.label,
        key,
      });
    });
  }

  private _initTimesheet(): void {
    const timesheetDate = Object.keys(this.minifiedTimesheet)[0];

    if (timesheetDate !== undefined) {
      const month = Number.parseInt(timesheetDate.split('.')[0], 10);
      const year = Number.parseInt(timesheetDate.split('.')[1], 10);
      const daysValue = this.minifiedTimesheet[timesheetDate];

      this.viewDate = setMonth(setYear(this.viewDate, year), month);

      for (let date = 0; date < daysValue.length; date++) {
        const day = new Date(+year, +month, date + 1);

        if (daysValue[date].time !== undefined && daysValue[date].time !== 0) {
          const time = this.calendarService.getTimeFromWorkingEvent(daysValue[date]);
          this._addTimesheetDay(day, addMinutes(day, time), daysValue[date].unit);
        }
      }
    }
  }

  private _getDayWorkingTime(day: Date): CalendarEvent {
    return this.timesheet.find(currenDay => {
      return isSameDay(currenDay.start, day);
    });
  }

  private _isDayWorked(day: Date): boolean {
    return this.timesheet.some(currentDay => {
      return isSameDay(currentDay.start, day);
    });
  }

  private _addTimesheetDay(date: Date, end?: Date, timeUnit: string = this.selectedTimeUnit): void {
    date = startOfDay(date);

    if (end === undefined) {
      end = addMinutes(date, this.calendarService.timeUnits[timeUnit].timeInMinutes);
    }

    this.timesheet.push({
      title: timeUnit,
      start: date,
      end: end,
      draggable: false,
    });
  }

  private _deleteDay(day: Date): void {
    this.timesheet = this.timesheet.filter(iEvent => !isSameDay(day, iEvent.start));
  }
}

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
} from "@angular/core";

import { Subject } from "rxjs";

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
} from "date-fns";

import {
  CalendarEvent,
  CalendarMonthViewDay,
  DAYS_OF_WEEK,
} from "angular-calendar";
import { CalendarService } from "../../calendar.service";
import { TimeUnit } from "src/app/shared/@types/timeUnit";

@Component({
  selector: "app-calendar-selector",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./calendar-selector.component.html",
  styleUrls: ["./calendar-selector.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarSelectorComponent implements OnInit, OnDestroy {
  @Input() public minifiedTimesheet: any;
  @Input() public picking: boolean;
  @Input() public selectedTimeUnit: string;
  @Output() public changed = new EventEmitter<boolean>();
  public timesheet: CalendarEvent[] = [];
  public refresh: Subject<any> = new Subject();
  public locale = "fr";
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  public weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  public viewDate: Date = new Date();
  public timeUnits: TimeUnit[] = [];
  public totalWorkedTime = 0;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private calendarService: CalendarService
  ) {}

  public ngOnInit(): void {
    this.setTimeUnits();

    this._initTimesheet();

    if (!this.selectedTimeUnit)
      this.selectedTimeUnit = this.calendarService.getSelectedTimeUnit(
        this.timesheet
      );

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

  public ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  public beforeMonthViewRender({
    body,
  }: {
    body: CalendarMonthViewDay[];
  }): void {
    this.totalWorkedTime = 0;

    body.forEach((day) => {
      if (!this.picking) {
        day.cssClass = "cal-disabled";
      }

      day.events.forEach((event) => {
        const time = this.calendarService.getTimeFromCalendarEvent(event);
        day.badgeTotal = time;
        this.totalWorkedTime += time;
      });
    });
  }

  public getDayWorkedTime(day: any): number {
    let time = 0;
    day.events.forEach((event: CalendarEvent<any>) => {
      time = this.calendarService.getTimeFromCalendarEvent(event);
    });

    return time;
  }

  public setTimeUnit(unit: string): void {
    this.selectedTimeUnit = unit;
    this.emptyDays();
  }

  public dayClicked(date: Date): void {
    if (isSameMonth(date, this.viewDate)) {
      if (!this._isDayWorked(date)) {
        this._addTimesheetDay(date);
      } else {
        this._deleteDay(date);
      }
    }
    this.refresh.next({});
  }

  public nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.emptyDays();
  }

  public previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.emptyDays();
  }

  public selectAllBusinessDays(): void {
    const monthStart = startOfMonth(this.viewDate).getDate(),
      monthEnd = endOfMonth(this.viewDate).getDate();

    for (let date = monthStart; date <= monthEnd; date++) {
      const aDay = setDate(this.viewDate, date);

      if (
        !this._isDayWorked(aDay) &&
        this.weekendDays.indexOf(getDay(aDay)) === -1
      ) {
        this._addTimesheetDay(aDay);
      }
    }
    this.refresh.next({});
  }

  public emptyDays(): void {
    this.timesheet = [];
    this.refresh.next({});
  }

  public dayEdited(event: Event, date: Date, time: number): void {
    event.stopPropagation();

    const day = this._getDayWorkingTime(date);
    const end = this.calendarService.getNewEndDate(day, time);

    if (time !== 0 && end) {
      day.end = end;
    } else {
      this._deleteDay(date);
    }

    this.refresh.next({});
  }

  private setTimeUnits(): void {
    Object.keys(this.calendarService.timeUnits).forEach((key) => {
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
      const month = Number.parseInt(timesheetDate.split(".")[0], 10);
      const year = Number.parseInt(timesheetDate.split(".")[1], 10);
      const daysValue = this.minifiedTimesheet[timesheetDate];

      this.viewDate = setMonth(setYear(this.viewDate, year), month);

      for (let date = 0; date < daysValue.length; date++) {
        const day = new Date(+year, +month, date + 1);

        if (daysValue[date].time !== undefined && daysValue[date].time !== 0) {
          const time = this.calendarService.getTimeFromWorkingEvent(
            daysValue[date]
          );
          this._addTimesheetDay(
            day,
            addMinutes(day, time),
            daysValue[date].unit
          );
        }
      }
    }
  }

  private _getDayWorkingTime(day: Date): CalendarEvent {
    return this.timesheet.find((currenDay) => {
      return isSameDay(currenDay.start, day);
    });
  }

  private _isDayWorked(day: Date): boolean {
    return this.timesheet.some((currentDay) => {
      return isSameDay(currentDay.start, day);
    });
  }

  private _addTimesheetDay(
    date: Date,
    end?: Date,
    timeUnit: string = this.selectedTimeUnit
  ): void {
    date = startOfDay(date);

    if (end === undefined) {
      const unit = this.calendarService.timeUnits[timeUnit];
      end = addMinutes(date, unit.timeInMinutes * unit.defaultUnitAmount);
    }

    this.timesheet.push({
      title: timeUnit,
      start: date,
      end: end,
      draggable: false,
    });
  }

  private _deleteDay(day: Date): void {
    this.timesheet = this.timesheet.filter(
      (iEvent) => !isSameDay(day, iEvent.start)
    );
  }
}

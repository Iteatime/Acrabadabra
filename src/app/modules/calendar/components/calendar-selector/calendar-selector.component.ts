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

import {
	CalendarEvent,
	CalendarMonthViewDay,
	DAYS_OF_WEEK,
} from 'angular-calendar';

@Component({
	selector: 'app-calendar-selector',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './calendar-selector.component.html',
	styleUrls: ['./calendar-selector.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CalendarSelectorComponent implements OnInit, OnDestroy {
	@Input() public minifiedTimesheet: any;
	@Input() public picking: boolean;
	@Output() public changed = new EventEmitter<boolean>();
	public timesheet: CalendarEvent[] = [];
	public refresh: Subject<any> = new Subject();
	public locale = 'fr';
	public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	public weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
	public viewDate: Date = new Date();
	public totalWorkedTime = 0;

	public constructor(private changeDetector: ChangeDetectorRef) {}

	public ngOnInit(): void {
		this._initTimesheet();
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
				day.cssClass = 'cal-disabled';
			}
			day.events.forEach((event) => {
				const dayTime = differenceInMinutes(event.end, event.start) / 60 / 8;
				day.badgeTotal = dayTime;
				this.totalWorkedTime += dayTime;
			});
		});
	}

	public dayClicked(date: Date): void {
		if (isSameMonth(date, this.viewDate)) {
			if (!this._isDayWorked(date)) {
				this._addTimesheetDay(date);
			} else {
				this._deleteDay(date);
			}
		}
		this.refresh.next();
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
		this.refresh.next();
	}

	public emptyDays(): void {
		this.timesheet = [];
		this.refresh.next();
	}

	public dayEdited(event: Event, date: Date, time: number): void {
		event.stopPropagation();

		const day = this._getDayWorkingTime(date),
			end = addMinutes(day.start, 8 * 60 * time);

		if (time !== 0 && end) {
			day.end = end;
		} else {
			this._deleteDay(date);
		}
		this.refresh.next();
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

				if (daysValue[date] !== undefined && daysValue[date] !== 0) {
					this._addTimesheetDay(day, addMinutes(day, daysValue[date] * 60 * 8));
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

	private _addTimesheetDay(date: Date, end?: Date): void {
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

	private _deleteDay(day: Date): void {
		this.timesheet = this.timesheet.filter(
			(iEvent) => !isSameDay(day, iEvent.start)
		);
	}
}

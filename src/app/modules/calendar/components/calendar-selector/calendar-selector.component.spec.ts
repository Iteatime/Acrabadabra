import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { addMonths, isSameMonth, getMonth, subMonths, addHours } from 'date-fns';

import * as _ from 'lodash';

import { CalendarSelectorComponent } from './calendar-selector.component';

registerLocaleData(localeFr);

describe('CalendarComponent - ', () => {
  let component: CalendarSelectorComponent,
      fixture: ComponentFixture<CalendarSelectorComponent>,
      compiled: any;

  const testDate = new Date(1900, 0, 1),
        minifiedTimesheet = {
          // This is a minified timesheet it represent the working time for each days of the month and year in the key.
          '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        // This is the timesheet corresponding to the above minified version.
        timesheet: CalendarEvent[] = [
          { title: '', start: testDate, end: new Date(1900, 0, 1, 4), draggable: false},
          { title: '', start: new Date(1900, 0, 2), end: new Date(1900, 0, 2, 8), draggable: false},
        ],
        checkTimesheet = (timesheetToTest: CalendarEvent[]): boolean => {
          return _.isEqual(timesheetToTest, timesheet);
        };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarSelectorComponent,
      ],
      imports: [
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSelectorComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    component.minifiedTimesheet = minifiedTimesheet;
    component.picking = true;
    fixture.detectChanges();
  });

  it('it should create', () => {
    expect(component).toBeTruthy('Expected edit-cra component to create but it did not worked');
  });

  describe('when called with data', () => {
    it('it should fill timisheet', () => {
      expect(checkTimesheet(component.timesheet)).toBeTruthy('Expected component and test timesheet to have the same data');
    });

    it('it should set view date', () => {
      expect(isSameMonth(testDate, component.viewDate)).toBeTruthy('Expected calendar to set to the month given');
    });

    it('it should set total worked time', () => {
      expect(component.totalWorkedTime).toEqual(1.5);
    });
  });

  describe('when you change the month', () => {
    let previousDate;

    beforeEach(() => {
      previousDate = new Date(component.viewDate);
    });

    describe('to the next', () => {
      beforeEach(() => {
        component.nextMonth();
        fixture.detectChanges();
      });

      it('it should change the view date', () => {
        expect(component.viewDate).toEqual(addMonths(previousDate, 1));
      });

      it('it should empty the timesheet', () => {
        expect(component.timesheet).toEqual([]);
      });
    });

    describe('to the previous', () => {
      beforeEach(() => {
        component.previousMonth();
        fixture.detectChanges();
      });

      it('it should change the view date', () => {
        expect(component.viewDate).toEqual(subMonths(previousDate, 1));
      });

      it('it should empty the timesheet', () => {
        expect(component.timesheet).toEqual([]);
      });
    });
  });

  describe('when changing the timesheet to', () => {
    const newDay = new Date(testDate);

    beforeEach(() => {
      newDay.setDate(3);
      component.dayClicked(newDay);
      fixture.detectChanges();
    });

    it('add a day it should create it with default values', () => {
        expect(component.timesheet[2]).toEqual({ ...timesheet[1], start: newDay, end: addHours(newDay, 8) });
    });

    describe('edit a day', () => {
      it('it should delete the day when the new value is 0', () => {
        const event = new Event('click');
        component.dayEdited(event, newDay, 0);

        expect(component.timesheet.length).toBe(2);
      });

      it('it should set the new value if it\'s not 0' , () => {
        const event = new Event('click');
        component.dayEdited(event, newDay, 0.5);

        expect(component.timesheet[2]).toEqual({ ...timesheet[1], start: newDay, end: addHours(newDay, 4) });
      });
    });

    it('delete a day', () => {
      component.dayClicked(newDay);
      expect(component.timesheet.length).toBe(2);
    });

    it('select all business days', () => {
      component.selectAllBusinessDays();
      expect(component.timesheet.length).toBe(23);
    });
  });
});

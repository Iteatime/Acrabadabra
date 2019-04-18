import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { Timesheet } from 'src/app/shared/models/timesheet.model';
import { CalendarEvent } from 'calendar-utils';

describe('CalendarService', () => {
  let service: CalendarService;
  let testTimesheet: Timesheet;
  let calendarEvents: CalendarEvent[];

  beforeEach(() => {
    service = new CalendarService();

    testTimesheet = new Timesheet();
    testTimesheet.workingDays = {
      '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    calendarEvents = [
      { title: '', start: new Date(1900, 0, 1, 8), end: new Date(1900, 0, 1, 12) },
      { title: '', start: new Date(1900, 0, 2, 8), end: new Date(1900, 0, 2, 16) },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWorkedTime()', () => {
    it('should return the total worked time', () => {
      expect(service.getWorkedTime(testTimesheet)).toBe(1.5);
    });
  });

  describe('getDate()', () => {
    it('should return the date of the given timesheet if it exist', () => {
      expect(service.getDate(testTimesheet)).toEqual(new Date(1900, 0));
    });

    it('should return the current date if there is no data for the timesheet given', () => {
      expect(service.getDate(new Timesheet())).toEqual(new Date());
    });
  });

  describe('getWorkingDays', () => {
    it('should return an array of the working days using the given calendar data', () => {
      expect(service.getWorkingDays(calendarEvents)).toEqual(testTimesheet.workingDays);
    });

    it('should return an empty object if there is no selected day on the given data', () => {
      expect(service.getWorkingDays([])).toEqual({});
    });
  });

  describe('getFirstWorkingDay()', () => {
    it('should return the first day worked for this timesheet', () => {
      expect(service.getFirstWorkingDay(testTimesheet)).toEqual(new Date(1900, 0, 1));
    });

    it('should return false if there is no worked day for this timesheet', () => {
      expect(service.getFirstWorkingDay(new Timesheet())).toBeFalsy();
    });
  });

  describe('getLastWorkingDay()', () => {
    it('should return the last day worked for this timesheet', () => {
      expect(service.getLastWorkingDay(testTimesheet)).toEqual(new Date(1900, 0, 2));
    });

    it('should return false if there is no worked day for this timesheet', () => {
      expect(service.getLastWorkingDay(new Timesheet())).toBeFalsy();
    });
  });
});

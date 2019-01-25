import { TestBed } from '@angular/core/testing';

import * as moment from '@sebastien-cleany/moment-ferie-fr';
import 'moment/locale/fr';

import { Period } from 'src/app/shared/models/period.model';

import { CalendarService } from './calendar.service';

moment.locale('fr');

fdescribe('CalendarService', () => {

  let service;
  const testPeriod = new Period(moment('2019-01-01'));
  const testWorkingDays = [[{'date':'1899-12-31T23:50:39.000Z','time':0.5},{'date':'1900-01-01T23:50:39.000Z','time':1},{'date':'1900-01-02T23:50:39.000Z','time':0},{'date':'1900-01-03T23:50:39.000Z','time':0},{'date':'1900-01-04T23:50:39.000Z','time':0},{'date':'1900-01-05T23:50:39.000Z','time':0}],[{'date':'1900-01-06T23:50:39.000Z','time':0},{'date':'1900-01-07T23:50:39.000Z','time':0},{'date':'1900-01-08T23:50:39.000Z','time':0},{'date':'1900-01-09T23:50:39.000Z','time':0},{'date':'1900-01-10T23:50:39.000Z','time':0},{'date':'1900-01-11T23:50:39.000Z','time':0},{'date':'1900-01-12T23:50:39.000Z','time':0}],[{'date':'1900-01-13T23:50:39.000Z','time':0},{'date':'1900-01-14T23:50:39.000Z','time':0},{'date':'1900-01-15T23:50:39.000Z','time':0},{'date':'1900-01-16T23:50:39.000Z','time':0},{'date':'1900-01-17T23:50:39.000Z','time':0},{'date':'1900-01-18T23:50:39.000Z','time':0},{'date':'1900-01-19T23:50:39.000Z','time':0}],[{'date':'1900-01-20T23:50:39.000Z','time':0},{'date':'1900-01-21T23:50:39.000Z','time':0},{'date':'1900-01-22T23:50:39.000Z','time':0},{'date':'1900-01-23T23:50:39.000Z','time':0},{'date':'1900-01-24T23:50:39.000Z','time':0},{'date':'1900-01-25T23:50:39.000Z','time':0},{'date':'1900-01-26T23:50:39.000Z','time':0}],[{'date':'1900-01-27T23:50:39.000Z','time':0},{'date':'1900-01-28T23:50:39.000Z','time':0},{'date':'1900-01-29T23:50:39.000Z','time':0},{'date':'1900-01-30T23:50:39.000Z','time':0},{'date':'1900-01-31T23:50:39.000Z','time':0},{'date':'1900-02-01T23:50:39.000Z','time':0},{'date':'1900-02-02T23:50:39.000Z','time':0},{'date':'1900-02-03T23:50:39.000Z','time':0}]];

  beforeEach(() => {
    service = new CalendarService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an instance of Timesheet', () => {
    expect(service.period instanceof Period).toBeTruthy();
  });

  describe('openWorkingDays()', () => {
    let previousWorkingDays;

    beforeEach(() => {
      previousWorkingDays = JSON.stringify(service.workingDays);
      service.openWorkingDays(testWorkingDays);
    });

    it('should update the working days array', () => {
      expect(previousWorkingDays).not.toBe(JSON.stringify(service.workingDays));
    });

    it('shouls update period', () => {
      expect(service.period.month.format('MMMM YYYY')).toBe('janvier 1900');
    });
  });

  describe('setPeriod()', () => {
    let previousWorkingDays;

    beforeEach(() => {
      previousWorkingDays = JSON.stringify(service.workingDays);
      service.setPeriod(moment('1900-02-01'));
    });

    it('should update the working days array', () => {
      expect(previousWorkingDays).not.toBe(JSON.stringify(service.workingDays));
    });

    it('shouls update period', () => {
      expect(service.period.month.format('MMMM YYYY')).toBe('février 1900');
    });
  });

  describe('isBusinessDay()', () => {
    beforeEach(() => {
      service.period = testPeriod;
    });

    it('should return false if the date argument is a holiday', () => {
      expect(service.isBusinessDay(moment('2019-01-01'))).toBeFalsy();
    });

    it('should return false if the date argument is a week-end day', () => {
      expect(service.isBusinessDay(moment('2019-01-06'))).toBeFalsy();
    });

    it('should return false if the date argument is not on the same month', () => {
      expect(service.isBusinessDay(moment('2019-02-01'))).toBeFalsy();
    });

    it('should return true otherwise', () => {
      expect(service.isBusinessDay(moment('2019-01-02'))).toBeTruthy();
    });
  });

  describe('getWorkedTime()', () => {
    beforeEach(() => {
      service.workingDays = testWorkingDays;
    });

    it('should return false if the date argument is a holiday', () => {
      expect(service.getWorkedTime()).toBe(1.5);
    });
  });
});

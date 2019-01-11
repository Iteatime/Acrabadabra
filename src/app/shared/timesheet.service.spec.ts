import { TestBed } from '@angular/core/testing';

import * as _ from 'Lodash';

import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.model';

describe('TimesheetService - ', () => {

  let service: TimesheetService;
  const timesheet = {
    consultant: { email: 'tester@test.com', name: 'tester', },
    mission: { client: 'Test.com', title: 'Testin' },
    workingDays: {
      '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    invoice: null
  };
  const token = (mode: string) => btoa(unescape(encodeURIComponent(JSON.stringify({ mode, timesheet }))));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(TimesheetService);
    expect(service).toBeTruthy();
  });

  describe('when opening a timesheet on edit mode', () => {
    let result;

    beforeEach(() => {
      result = service.openTimesheet(token('edit'), 'edit');
    });

    it('shouldn\'t return anything if the second arg is edit', () => {
      expect(result).toBeUndefined();
    });

    it('should return false if the second arg is not edit', () => {
      result = service.openTimesheet(token('edit'), 'review');
      expect(result).toBeFalsy();
    });
  });

  describe('when getting the EditToken', () => {
    it('should be returned', () => {
      expect(service.getEditToken()).toBe(token('edit'));
    });
  });

  describe('when getting the ReviewToken', () => {
    it('should be returned', () => {
      expect(service.getReviewToken()).toBe(token('review'));
    });
  });
});

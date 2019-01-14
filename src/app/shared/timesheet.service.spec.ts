import { TestBed } from '@angular/core/testing';

import * as _ from 'Lodash';

import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.model';

class MockTimesheet {
  consultant: any;
  mission: any;
  workingDays: any;
  invoice: any;

  constructor() {}
}

describe('TimesheetService -', () => {

  let service: TimesheetService;
  const timesheet = new Timesheet('tester@test.com', 'Tester', 'Test.com', 'Testing TimesheetService');
  const editToken = () => btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet }))));
  const reviewToken = () => btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet }))));


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TimesheetService);
    service.openTimesheet(reviewToken(), 'review');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openTimesheet())', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(reviewToken(), 'edit')).toBeFalsy();
    });
  });

  describe('getEditToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getEditToken()).toBe(editToken());
    });
  });

  describe('getReviewToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getReviewToken()).toBe(reviewToken());
    });
  });
});

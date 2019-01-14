import { TestBed } from '@angular/core/testing';

import * as _ from 'Lodash';

import { TimesheetService } from './timesheet.service';

class MockTimesheet {
  consultant: any;
  mission: any;
  workingDays: any;
  invoice: any;

  constructor() {
    this.consultant = { email: 'tester@test.com', name: 'tester', };
    this.mission = { client: 'Test.com', title: 'Testin' };
    this.workingDays = {
      '0.1900': [0.5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    this.invoice = null;
  }
}

describe('TimesheetService -', () => {

  let service: TimesheetService;
  const timesheet = new MockTimesheet();
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

  describe('when opening a timesheet (openTimesheet)', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(reviewToken(), 'edit')).toBeFalsy();
    });
  });

  describe('when getting the EditToken (getEditToken)', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getEditToken()).toBe(editToken());
    });
  });

  describe('when getting the ReviewToken (getReviewToken)', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getReviewToken()).toBe(reviewToken());
    });
  });
});

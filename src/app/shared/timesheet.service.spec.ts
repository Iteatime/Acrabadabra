import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.model';

describe('TimesheetService -', () => {

  let service: TimesheetService;
  const timesheet = new Timesheet();
  const getEditToken = () => btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet }))));
  const getReviewToken = () => btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet }))));

  beforeEach(() => {
    service = new TimesheetService();
    service.openTimesheet(getReviewToken(), 'review');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openTimesheet())', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(getReviewToken(), 'edit')).toBeFalsy();
    });
    describe('if the "mode" argument match the "mode" stored in the token', () => {
      it('should return true', () => {
        service.openTimesheet(getEditToken(), 'edit');
      });
      it('should set the timesheet properties from those stored in the token', () => {
        service.openTimesheet(getEditToken(), 'edit');
        expect(JSON.stringify(timesheet) === JSON.stringify(service.timesheet)).toBeTruthy();
      });
    });
  });

  describe('getEditToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getEditToken()).toBe(getEditToken());
    });
  });

  describe('getReviewToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getReviewToken()).toBe(getReviewToken());
    });
  });
});

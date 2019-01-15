import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.model';

describe('TimesheetService', () => {

  let service = new TimesheetService();
  const testTimesheet = new Timesheet('test');
  service.timesheet = testTimesheet;
  const editToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
  const reviewToken =  btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openTimesheet())', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(reviewToken, 'edit')).toBeFalsy();
    });

    describe('if the "mode" argument matches the "mode" stored in the token', () => {

      let returnValue;

      beforeEach(() => {
        returnValue = service.openTimesheet(editToken, 'edit');
      });

      it('should return true', () => {
        expect(returnValue).toBeTruthy();
      });

      it('should create an instance of Timesheet', () => {
        expect(service.timesheet instanceof Timesheet).toBeTruthy();
      });

      it('should copy the data to the new timesheet', () => {
        expect(service.timesheet.consultant.email).toBe('test');
      });
    });
  });

  describe('getEditToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getEditToken()).toBe(editToken);
    });
  });

  describe('getReviewToken())', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getReviewToken()).toBe(reviewToken);
    });
  });
});

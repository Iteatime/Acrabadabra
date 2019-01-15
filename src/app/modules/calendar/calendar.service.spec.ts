import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.model';

describe('TimesheetService -', () => {

  let service: TimesheetService;
  const testTimesheet = new Timesheet('test');
  const getEditToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
  const getReviewToken =  btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

  beforeEach(() => {
    service = new TimesheetService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openTimesheet())', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(getReviewToken, 'edit')).toBeFalsy();
    });

    describe('if the "mode" argument match the "mode" stored in the token', () => {
      it('should return true', () => {
        expect(service.openTimesheet(getEditToken, 'edit')).toBeTruthy();
      });

      it('should create an instance of Timesheet', () => {
        service.openTimesheet(getEditToken, 'edit');
        expect(service.timesheet instanceof Timesheet).toBeTruthy();
      });

      it('should copy the data to the new timesheet', () => {
        service.openTimesheet(getEditToken, 'edit');
        expect(service.timesheet.consultant.email).toBe('test');
      });
    });
  });

  describe('when oppening a token', () => {
    beforeEach(() => {
      service.timesheet = this.timesheet;
    });

    describe('getEditToken())', () => {
      it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
        expect(service.getEditToken()).toBe(getEditToken);
      });
    });

    describe('getReviewToken())', () => {
      it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
        expect(service.getReviewToken()).toBe(getReviewToken);
      });
    });
  });
});

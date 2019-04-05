import { TimesheetService } from './timesheet.service';

import { Timesheet } from 'src/app/shared/models/timesheet.model';

import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs/internal/observable/of';


describe('TimesheetService', () => {
  let service: TimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesheetService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(TimesheetService);

    service.timesheet = testTimesheet;

  });


  const testTimesheet = new Timesheet('test');
  const editToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
  const reviewToken =  btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an instance of Timesheet', () => {
    expect(service.timesheet instanceof Timesheet).toBeTruthy();
  });

  describe('openTimesheet())', () => {
    it('should return false if the "mode" argument does not match the "mode" stored in the token', () => {
      expect(service.openTimesheet(reviewToken, 'edit')).toBeFalsy();
    });

    it('should return false if the token is undefined', () => {
      expect(service.openTimesheet(undefined, 'edit')).toBeFalsy();
    });

    describe('if the "mode" argument matches the "mode" stored in the token', () => {
      let returnValue;

      beforeEach(() => {
        returnValue = service.openTimesheet(editToken, 'edit');
      });

      it('should return true', () => {
        expect(returnValue).toBeTruthy();
      });

      // it('should copy the data to the new timesheet', () => {
      //   expect(service.timesheet.consultant.email).toBe('test');
      // });

      // it('should copy the `mode` the service property `mode`', () => {
      //   expect(service.mode).toBe('edit');
      // });
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

  describe('getTotalAllowance()', () => {
    beforeEach(() => {
      service.timesheet.commutes = [
        {date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 120 },
        {date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 45 },
        {date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 55 }
      ];
    });

    it('should return "totalAllowance" of mileage allowances in the array of "commutes"', () => {
      expect(service.getTotalAllowance()).toBe(220);
    });
  });

  describe('getTotalMiscellaneous()', () => {
    beforeEach(() => {
      service.timesheet.miscellaneous = [
        {date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 10 },
        {date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 11 },
        {date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 12 }
      ];
    });

    it('should return "totalMiscellaneous" of miscellaneous expenses in the array of "miscellaneous"', () => {
      expect(service.getTotalMiscellaneous()).toBe(33);
    });
  });

  describe('getTotalFlatFee()', () => {
    beforeEach(() => {
      service.timesheet.flatFees = [
        {date: '', amount: 4 },
        {date: '', amount: 5 },
        {date: '', amount: 6 }
      ];
    });

    it('should return "totalFlatFee" of flat fees expenses in the array of "flatFees"', () => {
      expect(service.getTotalFlatFee()).toBe(15);
    });
  });
});

describe('Exertenal URL shortening service:', () => {
  let service: TimesheetService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new TimesheetService(<any> httpClientSpy);
  });

  it ('shortenUrl() should return a shortened URL', () => {
    const shortUrl = 'https://link.acrabadabra.com/8355d'
    const url ='https://vimeo.com/256549521';

    httpClientSpy.post.and.returnValue(of({shortUrl: shortUrl}));

    service.shortenUrl(url).then(
      value => expect(value).toEqual(shortUrl),
      fail
    );
  });
});

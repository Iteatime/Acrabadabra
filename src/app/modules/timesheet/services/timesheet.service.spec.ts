import { Company, Invoice, Timesheet } from 'src/app/shared/models';

import { TimesheetService } from './timesheet.service';
import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';
import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';

describe('TimesheetService', () => {
  let service: TimesheetService;
  let saveService: LocalSaveService;
  const testTimesheet = new Timesheet('test');
  const editToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
  const reviewToken =  btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));

  beforeEach(() => {
    const serializer = new SerializationService();
    saveService = new LocalSaveService(serializer);
    service = new TimesheetService(saveService, serializer);
    service.timesheet = testTimesheet;
  });

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

  describe('getEditToken()', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getEditToken()).toBe(editToken);
    });
  });

  describe('getReviewToken()', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getReviewToken()).toBe(reviewToken);
    });
  });

  describe('getTransferToken())', () => {
    let transferToken;
    let token;
    beforeEach(() => {
      service.timesheet.invoice = Object.assign({}, new Invoice(), {
          number: '458789',
          provider: new Company('Rémy dupont'),
          client: new Company('Iteatime'),
        });
      transferToken = btoa(unescape(encodeURIComponent(JSON.stringify({
          mode: 'edit',
          timesheet: Object.assign({ ...service.timesheet }, {
            invoice: Object.assign(new Invoice(), {
              provider: new Company('Iteatime')
            })
          })
     }))));
     token = service.getTransferToken();
    });

    it('should return a new invoice edit page with the information correctly completed', () => {
      expect(service.timesheet.invoice.number).toBe(null);
      expect(service.timesheet.invoice.provider.name).toBe('Iteatime');
      expect(service.timesheet.invoice.client.name).toBe('');
      expect(token).toEqual(transferToken);
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

  describe('getTimesheetsLocal()', () => {
    beforeEach(() => {
      localStorage.setItem('timesheet.5', 'IFgBhdWwgT2gsqgi');
      localStorage.setItem('test', 'Welcome Home');
      localStorage.setItem('timesheet.1', 'IlBhdWwgdgpdmEi');
      localStorage.setItem('timesheet.4', 'AhgjsfjwgT2xpdmEi');
    });

    it('should return a sorted array of keys in local storage', () => {
      expect(service.getTimesheetsLocal()).toEqual(['timesheet.1', 'timesheet.4', 'timesheet.5']);
    });
  });

  describe('saveTimesheet()', () => {

    let timesheetArray = [];
    let store;

    beforeEach(() => {

      spyOn(service, 'getTimesheetsLocal').and.callFake(() => {
        return timesheetArray;
      });

      spyOn(saveService, 'setLocalItem').and.callFake((key: string, value: any) => {
        store[key] = value || null;
      });

      store = {};
    });

    it('should stock a timehseet named timesheet.1 if there are no timesheet in local storage', () => {
      service.saveTimesheet();
      expect(Object.keys(store)).toEqual(['timesheet.1']);
    });

    it('should stock the timesheet in local storage incrementing his name number', () => {
      timesheetArray = ['timesheet.1', 'timesheet.2'];
      store = {'timesheet.1': 'Oliva', 'timesheet.2': 'Paul'};
      service.saveTimesheet();
      expect(Object.keys(store)).toEqual(['timesheet.1', 'timesheet.2', 'timesheet.3']);
    });
  });

  describe('openLastTimesheetInLocal()', () => {

    let timesheetArray = [];
    let store;

    beforeEach(() => {

      spyOn(service, 'getTimesheetsLocal').and.callFake(() => {
        return timesheetArray;
      });

      spyOn(service, 'setTimesheet').and.callFake((value: any) => {
        service.timesheet = value;
      });

      spyOn(saveService, 'setLocalItem').and.callFake((key: string, value: any) => {
        store[key] = value || null;
      });

      spyOn(saveService, 'getLocalItem').and.callFake((key: string): any => {
        return store[key] || null;
      });

      store = {};
    });

    it('should open the last timesheet in local storage if one is present', () => {
      timesheetArray = ['timesheet.1', 'timesheet.2'];
      expect(service.openLastTimesheetInLocal()).toBeTruthy();
    });

    it('should open nothing if local storage is empty of timesheet', () => {
      timesheetArray = [];
      expect(service.openLastTimesheetInLocal()).toBeFalsy();
    });

    it('should ', () => {
      timesheetArray = ['timesheet.1', 'timesheet.2'];
      store = {'timesheet.1': 'Oliva', 'timesheet.2': new Timesheet('Paul')};
      service.openLastTimesheetInLocal();
      expect(service.timesheet).toEqual(new Timesheet('Paul'));
    });
  });

  describe('setTimesheet()', () => {

    it('should set a new timesheet without unneeded properties', () => {
      service.setTimesheet({ ...testTimesheet, invoice: { number: 'test' }});
      expect(service.timesheet.invoice.number).toEqual(null);
    });
  });
});

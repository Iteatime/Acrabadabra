import { Company, Invoice, Timesheet } from 'src/app/shared/models';

import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';
import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';
import { TimesheetService } from './timesheet.service';

/* tslint:disable:no-big-function */
/* tslint:disable:no-commented-code */
/* tslint:disable:no-duplicate-string */
describe('TimesheetService', () => {
  let service: TimesheetService;
  let saveService: LocalSaveService;
  const testTimesheet = new Timesheet('test', 'Simon');

  const editToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'edit', timesheet: testTimesheet }))));
  const reviewToken = btoa(unescape(encodeURIComponent(JSON.stringify({ mode: 'review', timesheet: testTimesheet }))));
  const unknownToken = btoa(
    unescape(encodeURIComponent(JSON.stringify({ mode: 'unknown', timesheet: testTimesheet }))),
  );

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
      expect(service.openTimesheet(undefined!, 'edit')).toBeFalsy();
    });

    describe('if the "mode" argument matches the "mode" stored in the token', () => {
      let returnValue: any;

      beforeEach(() => {
        returnValue = service.openTimesheet(editToken, 'edit');
      });

      it('should return true', () => {
        expect(returnValue).toBeTruthy();
      });

      it('should copy the data to the new timesheet', () => {
        expect(service.timesheet.consultant.email).toBe('test');
      });

      it('should copy the `mode` the service property `mode`', () => {
        expect(service.mode).toBe('edit');
      });
    });
  });

  describe('getToken()', () => {
    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "edit"', () => {
      expect(service.getToken('edit')).toBe(editToken);
    });

    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getToken('review')).toBe(reviewToken);
    });

    it('should return a base64 encoded json object containing the timesheet property, and a "mode" property set to "review"', () => {
      expect(service.getToken('unknown')).toBe(unknownToken);
    });
  });

  // tslint:disable-next-line:no-commented-code
  // describe('getTransferToken())', () => {
  //   let transferToken: any;
  //   let token: any;
  //   beforeEach(() => {
  //     service.timesheet.invoice = Object.assign({}, new Invoice(), {
  //       number: '458789',
  //       provider: new Company('Rémy dupont'),
  //       client: new Company('Iteatime'),
  //     });
  //     transferToken = btoa(
  //       unescape(
  //         encodeURIComponent(
  //           JSON.stringify({
  //             mode: 'edit',
  //             timesheet: Object.assign(
  //               { ...service.timesheet },
  //               {
  //                 invoice: Object.assign(new Invoice(), {
  //                   provider: new Company('Iteatime'),
  //                 }),
  //               },
  //             ),
  //           }),
  //         ),
  //       ),
  //     );
  //     token = service.getTransferToken();
  //   });

  //   it('should return a new invoice edit page with the information correctly completed', () => {
  //     expect(service.timesheet.invoice!.number).toBe(null);
  //     expect(service.timesheet.invoice!.provider.name).toBe('Iteatime');
  //     expect(service.timesheet.invoice!.client.name).toBe('');
  //     expect(token).toEqual(transferToken);
  //   });
  // });

  describe('getTotalAllowance()', () => {
    beforeEach(() => {
      service.timesheet.commutes = [
        { date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 120 },
        { date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 45 },
        { date: '', journey: '', distance: 1, allowance: '', mileageAllowance: 55 },
      ];
    });

    it('should return "totalAllowance" of mileage allowances in the array of "commutes"', () => {
      expect(service.getTotalAllowance()).toBe(220);
    });
  });

  describe('getTotalMiscellaneous()', () => {
    beforeEach(() => {
      service.timesheet.miscellaneous = [
        { date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 10 },
        { date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 11 },
        { date: '', wording: '', tvaRate: 0, miscellaneousType: '', amount: 12 },
      ];
    });

    it('should return "totalMiscellaneous" of miscellaneous expenses in the array of "miscellaneous"', () => {
      expect(service.getTotalMiscellaneous()).toBe(33);
    });
  });

  describe('getTotalFlatFee()', () => {
    beforeEach(() => {
      service.timesheet.flatFees = [{ date: '', amount: 4 }, { date: '', amount: 5 }, { date: '', amount: 6 }];
    });

    it('should return "totalFlatFee" of flat fees expenses in the array of "flatFees"', () => {
      expect(service.getTotalFlatFee()).toBe(15);
    });
  });

  describe('getLocalStorageTimesheetsList()', () => {
    beforeEach(() => {
      localStorage.setItem('timesheet.5', 'IFgBhdWwgT2gsqgi');
      localStorage.setItem('test', 'Welcome Home');
      localStorage.setItem('timesheet.1', 'IlBhdWwgdgpdmEi');
      localStorage.setItem('timesheet.4', 'AhgjsfjwgT2xpdmEi');
    });

    it('should return a sorted array of keys in local storage', () => {
      expect(service.getLocalStorageTimesheetsList()).toEqual(['timesheet.1', 'timesheet.4', 'timesheet.5']);
    });
  });

  describe('saveTimesheet()', () => {
    let timesheetArray: any[] = [];
    let store: any;

    beforeEach(() => {
      spyOn(service, 'getLocalStorageTimesheetsList').and.callFake(() => {
        return timesheetArray;
      });
      spyOn(saveService, 'setLocalItem').and.callFake((key: string, value: any) => {
        store[key] = value || null;
      });
      store = {};
    });

    it('should stock a timesheet named timesheet.1 if there are no timesheet in local storage', () => {
      service.saveTimesheet();
      expect(Object.keys(store)).toEqual(['timesheet.1']);
    });

    it('should stock the timesheet in local storage incrementing his name number', () => {
      timesheetArray = ['timesheet.1', 'timesheet.2'];
      store = { 'timesheet.1': 'Oliva', 'timesheet.2': 'Paul' };
      service.saveTimesheet();
      expect(Object.keys(store)).toEqual(['timesheet.1', 'timesheet.2', 'timesheet.3']);
    });
  });

  describe('openLastTimesheetInLocal()', () => {
    let timesheetArray: any[] = [];
    let store: any;

    beforeEach(() => {
      spyOn(service, 'getLocalStorageTimesheetsList').and.callFake(() => {
        return timesheetArray;
      });
      spyOn(service, 'setTimesheet').and.callFake((value: any) => {
        service.timesheet = value;
      });
      spyOn(saveService, 'setLocalItem').and.callFake((key: string, value: any) => {
        store[key] = value || null;
      });
      spyOn(saveService, 'getLocalItem').and.callFake(
        (key: string): any => {
          return store[key] || null;
        },
      );
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

    it('should open the last timesheet of the local storage ', () => {
      timesheetArray = ['timesheet.1', 'timesheet.2'];
      store = { 'timesheet.1': 'Oliva', 'timesheet.2': new Timesheet('Paul') };
      service.openLastTimesheetInLocal();
      expect(service.timesheet).toEqual(new Timesheet('Paul'));
    });
  });

  describe('getIfExistAlreadyPresentInvoice()', () => {
    const timesheetsOfLocalStorage: any = {
      'timesheet.1': {
        consultant: { email: 'no', name: 'Pierre' },
        invoice: new Invoice('', '', '', null, new Company('Paul'), new Company('Nathalie')),
      },
      'timesheet.2': {
        consultant: { email: 'no', name: 'Simon' },
        invoice: new Invoice('', '', '', null, new Company('Marie'), new Company('Romain')),
      },
      'timesheet.3': {
        consultant: { email: 'no', name: 'Simon' },
        invoice: new Invoice('', '', '1000', null, new Company('Marie'), new Company('Romain')),
      },
    };

    beforeEach(() => {
      testTimesheet.invoice = new Invoice(undefined, undefined, '4000', undefined, new Company('Marie'));
      spyOn(saveService, 'getLocalItem').and.callFake(
        (key: string): any => {
          return timesheetsOfLocalStorage[key] || null;
        },
      );
      spyOn(service, 'getLocalStorageTimesheetsList').and.callFake(() => {
        return ['timesheet.1', 'timesheet.2', 'timesheet.3'];
      });
    });

    // tslint:disable-next-line:max-line-length
    it('should edit transfered timesheet with client informations if a provider and a consultant are associated to a same client in local storage', () => {
      expect(service.getIfExistAlreadyPresentInvoice(testTimesheet).invoice!.clientRef).toEqual('1000');
    });

    it('shouldn\'t edit transfered timesheet if neither provider and consultant are associated to a same client in local storage', () => {
      const timesheetTest: Timesheet = { ...testTimesheet, consultant: { name: 'Maurice', email: 'maurice@hl.com' } };
      expect(service.getIfExistAlreadyPresentInvoice(timesheetTest).invoice!.clientRef).toEqual('4000');
    });
  });

  describe('setTimesheet()', () => {
    it('should set a new timesheet without unneeded properties', () => {
      service.setTimesheet({ ...testTimesheet, invoice: { number: 'test' } });
      expect(service.timesheet.invoice!.number).toEqual(null);
    });
  });
});

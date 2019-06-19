import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Company, Invoice, Timesheet } from 'src/app/shared/models';

import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';

import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  timesheet: Timesheet;
  mode: string;

  constructor(private _localSaveService: LocalSaveService, private _serializer: SerializationService) {
    this.timesheet = new Timesheet();
  }

  getToken(mode: string): string {
    let formatedMode: string;

    switch (mode) {
      case 'edit':
        formatedMode = 'edit';
        break;
      case 'review':
        formatedMode = 'review';
        break;
      default:
        formatedMode = 'unknown';
        break;
    }

    return this._serializer.serializeObject({
      mode: formatedMode,
      timesheet: this.timesheet,
    });
  }

  getTransferToken(): string {

    let transferedTimesheet = this.timesheet;

    if (this.timesheet.invoice) {
      transferedTimesheet = this.getIfExistAlreadyPresentInvoice({
        ...this.timesheet,
        invoice: Object.assign({}, new Invoice(),  {
        provider: Object.assign(new Company(), this.timesheet.invoice.client),
        client: new Company()
        }),
      });
    }

    return this._serializer.serializeObject({
      mode: 'edit',
      timesheet: transferedTimesheet
    });
  }

  openTimesheet(token: string, mode: string): boolean {
    const a = this._serializer.deserializeObject(token);
    if (!a || a.mode !== mode) {
      return false;
    } else {
      this.mode = mode;
      this.timesheet = Object.assign(this.timesheet, a.timesheet);
      return true;
    }
  }

  getInvoiceLink() {
    return (
      environment.pdf_api_url +
      '?url=' +
      window.location.origin +
      '/invoice/' +
      this.getToken('review') +
      '&format=A4&scale=2&margin.top=15px&margin.left=10px&margin.bottom=10px&margin.right=10px' +
      '&api=' +
      environment.pdf_api_key +
      '&title=' +
      this.timesheet.invoice!.number
    );
  }

  getTotalAllowance() {
    let totalAllowance = 0;
    for (const commute of this.timesheet.commutes) {
      totalAllowance += commute.mileageAllowance;
    }

    return totalAllowance;
  }

  getTotalMiscellaneous() {
    let totalMisc = 0;
    for (const miscellaneous of this.timesheet.miscellaneous) {
      totalMisc += miscellaneous.amount!;
    }

    return totalMisc;
  }

  getTotalFlatFee() {
    let totalFlatFee = 0;
    for (const flatFees of this.timesheet.flatFees) {
      totalFlatFee += flatFees.amount!;
    }

    return totalFlatFee;
  }

  getLocalStorageTimesheetsList() {
    const timesheetArray: any[] = [];

    Object.keys(localStorage).forEach(localKey => {
      if (localKey.split('.')[0] === 'timesheet') {
        timesheetArray.push(localKey);
      }
    });

    // sort timesheets in timesheetArray by their name.
    return timesheetArray.sort((aTimesheet, anotherTimesheet) => {
      return aTimesheet.split('.')[1] - anotherTimesheet.split('.')[1];
    });
  }

  saveTimesheet() {
    let lastTimesheet: number;
    const timesheetArray = this.getLocalStorageTimesheetsList();

    if (timesheetArray.length === 0) {
      lastTimesheet = 0;
    } else {
      lastTimesheet = +timesheetArray[timesheetArray.length - 1].split('.')[1];
    }
    this._localSaveService.setLocalItem(`timesheet.${lastTimesheet + 1}`, this.timesheet);
  }

  openLastTimesheetInLocal(): boolean {
    const timesheetsOfLocalStorage = this.getLocalStorageTimesheetsList();
    if (timesheetsOfLocalStorage.length > 0) {
      this.setTimesheet(
        this._localSaveService.getLocalItem(timesheetsOfLocalStorage[timesheetsOfLocalStorage.length - 1]),
      );
      return true;
    }
    return false;
  }

  getIfExistAlreadyPresentInvoice(timesheetToTransfer: Timesheet): Timesheet {
    const localStorageTimesheetsList = this.getLocalStorageTimesheetsList();
    const localStorageTimesheetsListSize = this.getLocalStorageTimesheetsList().length;
    for (let i = localStorageTimesheetsListSize; i >= 0; i--) {
      const storedTimesheet: Timesheet = Object.assign(
        {},
        new Timesheet(),
        this._localSaveService.getLocalItem(localStorageTimesheetsList[i])
      );

      const storedTimesheetInvoice = storedTimesheet.invoice!;

      if (storedTimesheet.consultant.name === timesheetToTransfer.consultant.name &&
        storedTimesheetInvoice.provider.name === timesheetToTransfer.invoice!.provider.name) {

        return {
          ...timesheetToTransfer,
          invoice: Object.assign({}, timesheetToTransfer.invoice, {
            clientRef: storedTimesheetInvoice.clientRef,
            dailyRate: storedTimesheetInvoice.dailyRate,
            client: Object.assign(new Company(), storedTimesheetInvoice.client),
            paymentLatePenalty: storedTimesheetInvoice.paymentLatePenalty,
            paymentModality: storedTimesheetInvoice.paymentModality,
            bankAccountHolder: storedTimesheetInvoice.bankAccountHolder,
            bankingAgency: storedTimesheetInvoice.bankingAgency,
            bankingDomiciliation: storedTimesheetInvoice.bankingDomiciliation,
            bankIBAN: storedTimesheetInvoice.bankIBAN,
            bankSWIFT: storedTimesheetInvoice.bankSWIFT
          }),
        };
      }
    }
    return timesheetToTransfer;
  }

  setTimesheet(timesheet: any) {
    this.timesheet = Object.assign({}, new Timesheet(), {
      ...timesheet,
      workingDays: 0,
      commutes: [],
      flatFees: [],
      miscellaneous: [],
      invoice: Object.assign({}, new Invoice(), timesheet.invoice, {
        date: '',
        number: null,
        paymentDate: '',
        paymentLatePenalty: false,
      }),
    });
  }
}

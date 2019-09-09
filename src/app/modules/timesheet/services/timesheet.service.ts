import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Company, Invoice, Timesheet } from 'src/app/shared/models';

import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';

import { SerializationService } from 'src/app/shared/services/serialization/serialization.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  public timesheet: Timesheet;
  public mode: string;

  public constructor(
    private _localSaveService: LocalSaveService,
    private _serializer: SerializationService
  ) {
    this.timesheet = new Timesheet();
  }

  public getEditToken(): string {
    return this._serializer.serializeObject({
        mode: 'edit',
        timesheet: this.timesheet
    });
  }

  public getReviewToken(): string {
    return this._serializer.serializeObject({
        mode: 'review',
        timesheet: this.timesheet
    });
  }

  public getTransferToken(): string {

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

  public openTimesheet(token: string, mode: string): boolean {
    const a = this._serializer.deserializeObject(token);
    if (!a || a.mode !== mode) {
      return false;
    } else {
      this.mode = mode;
      this.timesheet = Object.assign(this.timesheet, a.timesheet);
      return true;
    }
  }

  public getInvoiceLink() {
    return  environment.pdf_api_url +
            '?url=' + window.location.origin + '/invoice/' + this.getReviewToken() +
            '&format=A4&scale=2&margin.top=15px&margin.left=10px&margin.bottom=10px&margin.right=10px' +
            '&api=' + environment.pdf_api_key +
            '&title=' + this.timesheet.invoice.number;
  }

  public getTotalAllowance() {
    let totalAllowance = 0;
    for (let i = 0; i < this.timesheet.commutes.length; i++) {
      totalAllowance += this.timesheet.commutes[i].mileageAllowance;
    }
    return totalAllowance;
  }

  public getTotalMiscellaneous() {
    let totalMisc = 0;
    for (let i = 0; i < this.timesheet.miscellaneous.length; i++) {
      totalMisc += +this.timesheet.miscellaneous[i].amount;
    }
    return totalMisc;
  }

  public getTotalFlatFee() {
    let totalFlatFee = 0;
    for (let i = 0; i < this.timesheet.flatFees.length; i++) {
      totalFlatFee += +this.timesheet.flatFees[i].amount;
    }
    return totalFlatFee;
  }

  public getLocalStorageTimesheetsList() {
    let timesheetArray = [];

    Object.keys(localStorage).forEach(function(localKey) {
      if ((localKey.split('.')[0]) === 'timesheet') {
        timesheetArray.push(localKey);
      }
    });

    // sort timesheets in timesheetArray by their name.

    return timesheetArray.sort((aTimesheet, anotherTimesheet) => {
      return aTimesheet.split('.')[1] - anotherTimesheet.split('.')[1];
    });
  }

  public saveTimesheet() {
    let lastTimesheet: number;
    const timesheetArray = this.getLocalStorageTimesheetsList();

    if (timesheetArray.length === 0) {
      lastTimesheet = 0;
    } else {
      lastTimesheet = +(timesheetArray[timesheetArray.length - 1].split('.')[1]);
    }
    this._localSaveService.setLocalItem(`timesheet.${lastTimesheet + 1}`, this.timesheet);
  }

  public openLastTimesheetInLocal(): boolean {
    const timesheetsOfLocalStorage = this.getLocalStorageTimesheetsList();
    if (timesheetsOfLocalStorage.length > 0) {
      this.setTimesheet(this._localSaveService.getLocalItem(timesheetsOfLocalStorage[timesheetsOfLocalStorage.length - 1]));
      return true;
    }
    return false;
  }

  public getIfExistAlreadyPresentInvoice(timesheetToTransfer: Timesheet): Timesheet {
    const localStorageTimesheetsList = this.getLocalStorageTimesheetsList();
    const localStorageTimesheetsListSize = this.getLocalStorageTimesheetsList().length;
    for (let i = localStorageTimesheetsListSize; i >= 0; i--) {
      const storedTimesheet: Timesheet = Object.assign(
        {},
        new Timesheet(),
        this._localSaveService.getLocalItem(localStorageTimesheetsList[i])
      );

      if (!storedTimesheet.invoice) {
        continue;
      }

      if (
        storedTimesheet.invoice.provider.name === timesheetToTransfer.invoice.provider.name) {

        return {
          ...timesheetToTransfer,
          invoice: Object.assign({}, timesheetToTransfer.invoice, {
            clientRef: storedTimesheet.invoice.clientRef,
            workedRate: storedTimesheet.invoice.workedRate,
            client: Object.assign(new Company(), storedTimesheet.invoice.client),
            paymentLatePenalty: storedTimesheet.invoice.paymentLatePenalty,
            paymentModality: storedTimesheet.invoice.paymentModality,
            bankAccountHolder: storedTimesheet.invoice.bankAccountHolder,
            bankingAgency: storedTimesheet.invoice.bankingAgency,
            bankingDomiciliation: storedTimesheet.invoice.bankingDomiciliation,
            bankIBAN: storedTimesheet.invoice.bankIBAN,
            bankSWIFT: storedTimesheet.invoice.bankSWIFT
          }),
        };
      }
    }
    return timesheetToTransfer;
  }

  public setTimesheet(timesheet) {
      this.timesheet = Object.assign(
        {},
        new Timesheet(),
        {
          ...timesheet,
          workingDays: 0,
          commutes: [],
          flatFees: [],
          miscellaneous : [],
          invoice: Object.assign({}, new Invoice(), timesheet.invoice, {
            date: '',
            number: null,
            paymentDate: '',
            paymentLatePenalty: false
          })
        }
      );
    }

  public load
}

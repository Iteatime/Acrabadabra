import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Timesheet } from 'src/app/shared/models/timesheet.model';

import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';
import { Local } from 'protractor/built/driverProviders';
import { Invoice } from 'src/app/shared/models/invoice.model';

function tokenize(a: any): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(a))));
}
 ​
function untokenize(a: string): any {
  if (a) {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(a))));
    } catch {
      alert('Données invalides');
      return false;
    }
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  public timesheet: Timesheet;
  public mode: string;

  public constructor() {
    this.timesheet = new Timesheet();
  }

  public getEditToken(): string {
    return tokenize({
        mode: 'edit',
        timesheet: this.timesheet
    });
  }

  public getReviewToken(): string {
    return tokenize({
        mode: 'review',
        timesheet: this.timesheet
    });
  }

  public openTimesheet(token: string, mode: string): boolean {
    const a = untokenize(token);
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

  public getTimesheetArray() {
    let timesheetArray = [];

    Object.keys(localStorage).forEach(function(name) {
      if ((name.split('.')[0]) === 'timesheet') {
        timesheetArray.push(name);
      }
    });

    return timesheetArray.sort((a, b) => {
      return a.split('.')[1] - b.split('.')[1];
    });
  }

  // public getLocalTimesheets() {
  //   const storedTimesheets = [];
  //   this.getTimesheetArray().forEach(element => {
  //     // storedTimesheets.push(LocalSaveService.getLocalItem(element));
  //     storedTimesheets.push(JSON.stringify(LocalSaveService.getLocalItem(element)));
  //   });
  //   console.log(storedTimesheets);
  //   return storedTimesheets;
  // }

  public saveTimesheet() {
    let lastTimesheet: number;
    const timesheetArray = this.getTimesheetArray();

    if (timesheetArray.length === 0 ) {
      lastTimesheet = 0;
    } else {
      lastTimesheet = +(timesheetArray[timesheetArray.length - 1].split('.')[1]);
    }
    LocalSaveService.setLocalItem(`timesheet.${lastTimesheet + 1}`, this.timesheet);
  }

  public getTimesheetslist() {
    const array = [];
    this.getTimesheetArray().forEach(element => {
      array.push([LocalSaveService.getLocalItem(element).consultant.name, JSON.stringify(LocalSaveService.getLocalItem(element))]);
    });
    return array;
  }

  // public setTimesheet() {
  //   if (LocalSaveService.checkItemExists('timesheet')) {
  //     console.log(this.timesheet);
  //     this.timesheet = Object.assign(this.timesheet, LocalSaveService.getLocalItem('timesheet'));
  //     this.timesheet.workingDays = 0;
  //     this.timesheet.commutes = [];
  //     this.timesheet.flatFees = [];
  //     this.timesheet.miscellaneous = [];
  //     this.timesheet.invoice.date = '';
  //     this.timesheet.invoice.number = '';
  //     this.timesheet.invoice.paymentDate = '';
  //     this.timesheet.invoice.paymentLatePenalty = false;
  //   }
  // }

  public setTimesheet(timesheet) {
      this.timesheet = Object.assign(
        {},
        new Timesheet(),
        {
          ...timesheet,
          workingDays : 0,
          commutes : [],
          flatFees : [],
          miscellaneous : [],
          invoice : Object.assign({}, new Invoice(), timesheet.invoice, {
            date : '',
            number : '',
            paymentDate : '',
            paymentLatePenalty : false
          })
        }
      );
        console.log(this.timesheet);
    }
}

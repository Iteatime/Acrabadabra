import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/shared/models/timesheet.model';

function tokenize(a: any): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(a))));
}
 ​
function untokenize(a: string): any {
  if (a) {
    return JSON.parse(decodeURIComponent(escape(atob(a))));
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
    return  'https://url-to-pdf.acrabadabra.com/' +
            '?url=http://cpont-invoice-pdf--acrabadabra.netlify.com/invoice/' + this.getReviewToken() +
            '&format=A4&scale=2&marginTop=15px&marginLeft=10px&marginBottom=10px&marginRight=10px' +
            '&title=' + this.timesheet.invoice.number;
  }
}

import { Injectable } from '@angular/core';
import { Timesheet } from './timesheet.model';

function tokenize(a: any): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(a))));
}
 ​
function untokenize(a: string): any {
  return JSON.parse(decodeURIComponent(escape(atob(a))));
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  timesheet: Timesheet;

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

  public openTimesheet(token: string, mode: string): boolean|void {
    const a = untokenize(token);
    if (a.mode !== mode) {
       return false;
    } else {
      this.timesheet = Object.assign(new Timesheet(), a.timesheet);
    }
  }
}

import { Injectable } from '@angular/core';
import { Timesheet } from './timesheet.model';

function tokenize(a: any): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(a))));
}
 ​
function untokenize(a: string): any {
  if (a) {
    return JSON.parse(decodeURIComponent(escape(atob(a))));
  }
  return { mode: '' };
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  timesheet: Timesheet;
  mode: string;

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
    if (a.mode !== mode) {
      this.timesheet = new Timesheet();
      return false;
    } else {
      this.mode = a.mode;
      this.timesheet = Object.assign(new Timesheet(), a.timesheet);
      return true;
    }
  }
}

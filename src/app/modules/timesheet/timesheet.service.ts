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

  timesheet: Timesheet;
  mode: string;

  constructor() {
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
}

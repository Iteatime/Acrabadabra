import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';

import { Invoice } from 'src/app/shared/models/invoice.model';
import { Company } from 'src/app/shared/models/company.model';
import { Timesheet } from 'src/app/shared/models/timesheet.model';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InvoicePDFComponent {
  public timesheet: Timesheet;
  public local = 'fr';
  public totalHT: number;
  public totalTTC: number;
  public vatRate: number;
  public currencyCode: string;
  public workedTime: number;

  constructor(
    public calendarService: CalendarService,
    private _monetaryService: MonetaryService,
    private _route: ActivatedRoute,
    private _timesheetService: TimesheetService,
    private _titleService: Title
  ) {
    this._timesheetService.openTimesheet(this._route.snapshot.paramMap.get('data'), 'review');
    this.timesheet = this._timesheetService.timesheet;
    this.timesheet.invoice = Object.assign(new Invoice(), this.timesheet.invoice);
    this.timesheet.invoice.provider = Object.assign(new Company(), this.timesheet.invoice.provider);
    this.timesheet.invoice.client = Object.assign(new Company(), this.timesheet.invoice.client);
    this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
    this.vatRate = this._monetaryService.vatRate;
    this.totalHT = this.workedTime * this.timesheet.invoice.dailyRate;
    this.totalTTC = this.totalHT + (this.vatRate * this.totalHT / 100);
    this.currencyCode = this._monetaryService.currencyCode;

    this._titleService.setTitle(this.timesheet.invoice.number);
  }

  public formatDate(date: string): string {
    return new Date(date).toLocaleString(this.local, { day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  public formatDuration(): string {
    const start = this.formatDate(this.calendarService.getFirstWorkingDay(this.timesheet).toString());
    const end = this.formatDate(this.calendarService.getLastWorkingDay(this.timesheet).toString());

    if (start !== end) {
      return  'du ' +
            start +
            ' au ' +
            end;
    } else {
      return `le ${start}`;
    }
  }

}

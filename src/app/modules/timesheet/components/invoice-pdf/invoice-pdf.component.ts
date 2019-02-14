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
  public expenseMileageTitle = 'Indémnités kilométriques';
  public expenseMileageQuantity = '1';
  public expenseMileageTotal: number;
  public expenseMiscellaneousTitle = 'Frais sur justificatifs';
  public expenseMiscellaneousQuantity = '1';
  public expenseMiscellaneousTotal: number;
  public totalVat: number;
  public performanceTotal: number;

  constructor(
    public calendarService: CalendarService,
    public timesheetService: TimesheetService,
    private _monetaryService: MonetaryService,
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {
    this.timesheetService.openTimesheet(this._route.snapshot.paramMap.get('data'), 'review');
    this.timesheet = this.timesheetService.timesheet;
    this.timesheet.invoice = Object.assign(new Invoice(), this.timesheet.invoice);
    this.timesheet.invoice.provider = Object.assign(new Company(), this.timesheet.invoice.provider);
    this.timesheet.invoice.client = Object.assign(new Company(), this.timesheet.invoice.client);
    this.workedTime = this.calendarService.getWorkedTime(this.timesheet);
    this.expenseMileageTotal = timesheetService.getTotalAllowance();
    this.expenseMileageTotal = timesheetService.getTotalMiscellaneous();
    this.vatRate = this._monetaryService.vatRate;
    this.currencyCode = this._monetaryService.currencyCode;
    this._titleService.setTitle(this.timesheet.invoice.number);
    this._sumCalcul();
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

  private _sumCalcul(): void {
    this.performanceTotal = this.workedTime * this.timesheet.invoice.dailyRate;
    this.totalVat = (this.vatRate * this.performanceTotal) / 100;
    this.totalHT = this.performanceTotal + this.expenseMileageTotal;
    this.totalTTC = this.totalHT + this.totalVat;
  }

}

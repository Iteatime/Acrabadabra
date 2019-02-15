import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';

import { Invoice } from 'src/app/shared/models/invoice.model';
import { Company } from 'src/app/shared/models/company.model';
import { Timesheet } from 'src/app/shared/models/timesheet.model';

import * as moment from 'moment';



@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InvoicePDFComponent {
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
    this.timesheetService.timesheet.invoice = Object.assign(new Invoice(), this.timesheetService.timesheet.invoice);
    this.timesheetService.timesheet.invoice.provider = Object.assign(new Company(), this.timesheetService.timesheet.invoice.provider);
    this.timesheetService.timesheet.invoice.client = Object.assign(new Company(), this.timesheetService.timesheet.invoice.client);
    this.workedTime = this.calendarService.getWorkedTime(this.timesheetService.timesheet);
    this.expenseMileageTotal = timesheetService.getTotalAllowance();
    this.vatRate = this._monetaryService.vatRate;
    this.currencyCode = this._monetaryService.currencyCode;
    this._titleService.setTitle(this.timesheetService.timesheet.invoice.number);
    this._sumCalcul();
  }

  public formatDate(date: string): string {
    let momentDate = moment(date);

    if (!momentDate.isValid()) {
      momentDate = moment(date, 'DD/MM/YYYY');
    }

    return momentDate.format('DD/MM/YYYY');
  }

  public formatDuration(): string {
    let start;
    let end;

    if (this.workedTime > 0) {
      start = this.formatDate(this.calendarService.getFirstWorkingDay(this.timesheetService.timesheet).toString());
      end = this.formatDate(this.calendarService.getLastWorkingDay(this.timesheetService.timesheet).toString());
    } else if (this.timesheetService.timesheet.commutes.length > 0) {
      const orderedCummutes = [ ...this.timesheetService.timesheet.commutes ].sort((a, b) => {
        return +moment(a.date).isBefore(b.date);
        // return compareAsc(a.date, b.date);
      });
      start = orderedCummutes[0].date;
      end = orderedCummutes[ orderedCummutes.length - 1 ].date;
    }

    if (start !== end) {
      return  `du ${this.formatDate(start)} au  ${this.formatDate(end)}`;
    } else {
      return `le ${start.toString()}`;
    }
  }

  private _sumCalcul(): void {
    this.performanceTotal = this.workedTime * this.timesheetService.timesheet.invoice.dailyRate;
    this.totalVat = (this.vatRate * this.performanceTotal) / 100;
    this.totalHT = this.performanceTotal + this.expenseMileageTotal;
    this.totalTTC = this.totalHT + this.totalVat;
  }
}

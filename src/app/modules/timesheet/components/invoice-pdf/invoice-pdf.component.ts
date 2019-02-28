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
  public expenseMiscellaneousTotal: any;
  public expenseFlatFeeTitle = 'Déplacements forfaitaires';
  public expenseFlatFeeQuantity: number;
  public expenseFlatFeeTotal: any;
  public totalVat: number;
  public performanceTotal: number;
  public format;
  public miscsTotal;

  constructor(
    public calendarService: CalendarService,
    public timesheetService: TimesheetService,
    public monetaryService: MonetaryService,
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {
    this.timesheetService.openTimesheet(this._route.snapshot.paramMap.get('data'), 'review');
    this.timesheetService.timesheet.invoice = Object.assign(new Invoice(), this.timesheetService.timesheet.invoice);
    this.timesheetService.timesheet.invoice.provider = Object.assign(new Company(), this.timesheetService.timesheet.invoice.provider);
    this.timesheetService.timesheet.invoice.client = Object.assign(new Company(), this.timesheetService.timesheet.invoice.client);
    this.workedTime = this.calendarService.getWorkedTime(this.timesheetService.timesheet);
    this.expenseMileageTotal = timesheetService.getTotalAllowance();
    this.expenseMiscellaneousTotal = timesheetService.getTotalMiscellaneous();
    this.expenseFlatFeeTotal = timesheetService.getTotalFlatFee();
    this.expenseFlatFeeQuantity = this.getNumberOfFlatFees();
    this.vatRate = this.monetaryService.vatRate;
    this.currencyCode = this.monetaryService.currencyCode;
    this._titleService.setTitle(this.timesheetService.timesheet.invoice.number);
    this.miscsTotal = this._sortMiscellaneousTotalByVat();
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
      start = this.calendarService.getFirstWorkingDay(this.timesheetService.timesheet);
      end = this.calendarService.getLastWorkingDay(this.timesheetService.timesheet);
    } else {
      start = this.timesheetService.timesheet.invoice.date;
    }

    if (end && <Date>start.getDate() !== <Date>end.getDate()) {
      return  `du ${this.formatDate(start)} au  ${this.formatDate(end)}`;
    } else {
      return `le ${this.formatDate(start)}`;
    }
  }

  public getNumberOfFlatFees() {
    return this.timesheetService.timesheet.flatFees.length;
  }

  private _sortMiscellaneousTotalByVat() {
    let amounts = [];
    let vat = [];

    this.timesheetService.timesheet.miscellaneous.forEach(misc => {
      const index = vat.indexOf(misc.tvaRate);
      if (index === -1) {
        vat.push(misc.tvaRate);
        amounts.push(+misc.amount);
      } else {
        amounts[index] += +misc.amount;
      }
    });
    return { amounts, vat };
  }

  private _sumCalcul(): void {
    this.performanceTotal = this.workedTime * this.timesheetService.timesheet.invoice.dailyRate;
    this.totalVat = ((this.vatRate * this.performanceTotal) / 100) +
                    ((this.vatRate * this.expenseMileageTotal) / 100) +
                    ((this.vatRate * this.expenseFlatFeeTotal) / 100);
    this.totalHT = this.performanceTotal + this.expenseMileageTotal + this.expenseFlatFeeTotal;

    this.miscsTotal.amounts.forEach((misc, index) => {
      let amountHT = misc / (1 + this.miscsTotal.vat[index] / 100 );
      if (this.timesheetService.timesheet.invoice.provider.vatExemption) {
        this.totalHT += +misc;
      } else {
        this.miscsTotal.amounts[index] = amountHT;
        this.totalVat += misc - amountHT;
        this.totalHT += amountHT;
      }
    });
    if (this.timesheetService.timesheet.invoice.provider.vatExemption ) {
      this.totalTTC = this.totalHT;
    } else {
      this.totalTTC = this.totalHT + this.totalVat;
    }
  }
}

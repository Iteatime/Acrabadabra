import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { TimesheetService } from '../../services/timesheet.service';

import { Company } from 'src/app/shared/models/company.model';
import { Invoice } from 'src/app/shared/models/invoice.model';

import { FlatFee } from '@shared/models';
import * as moment from 'moment';
import { MiscellaneousExpensesService } from '../../../expense/services/miscellaneous-expenses.service';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InvoicePDFComponent {
  local = 'fr';
  totalHT: number;
  totalTTC: number;
  currencyCode: string;
  workedTime: number;
  expenseMileageTitle = 'Indémnités kilométriques';
  expenseMileageQuantity = '1';
  expenseMileageTotal: number;
  expenseMiscellaneousTitle = 'Frais sur justificatifs';
  expenseMiscellaneousQuantity = '1';
  expenseMiscellaneousTotal: any;
  expenseFlatFeeTitle = 'Déplacements forfaitaires';
  expenseFlatFeeQuantity: number;
  expenseFlatFeeTotal: any;
  totalVat: any;
  performanceTotal: number;
  flatFeesTotal: any;

  constructor(
    public calendarService: CalendarService,
    public timesheetService: TimesheetService,
    public monetaryService: MonetaryService,
    public miscellaneousService: MiscellaneousExpensesService,
    private _route: ActivatedRoute,
    private _titleService: Title,
  ) {
    if (this._route.snapshot.paramMap.get('data')) {
      this.timesheetService.openTimesheet(this._route.snapshot.paramMap.get('data'), 'review');
    } else {
      // TODO throw an error
    }
    this.timesheetService.timesheet.invoice = Object.assign(new Invoice(), this.timesheetService.timesheet.invoice);
    this.timesheetService.timesheet.invoice.provider = Object.assign(
      new Company(),
      this.timesheetService.timesheet.invoice.provider,
    );
    this.timesheetService.timesheet.invoice.client = Object.assign(
      new Company(),
      this.timesheetService.timesheet.invoice.client,
    );
    this.workedTime = this.calendarService.getWorkedTime(this.timesheetService.timesheet);
    this.expenseMileageTotal = timesheetService.getTotalAllowance();
    this.expenseMiscellaneousTotal = timesheetService.getTotalMiscellaneous();
    this.expenseFlatFeeTotal = timesheetService.getTotalFlatFee();
    this.expenseFlatFeeQuantity = this.getNumberOfFlatFees();
    this.currencyCode = this.monetaryService.currencyCode;
    this._titleService.setTitle(this.timesheetService.timesheet.invoice.number);
    this.flatFeesTotal = this._sortFlatFeesAmounts();
    this._sumCalcul();
  }

  formatDate(date: string): string {
    let momentDate = moment(date);

    if (!momentDate.isValid()) {
      momentDate = moment(date, 'DD/MM/YYYY');
    }

    return momentDate.format('DD/MM/YYYY');
  }

  formatDuration(): string {
    let start: any;
    let end: any;

    if (this.workedTime > 0) {
      start = this.calendarService.getFirstWorkingDay(this.timesheetService.timesheet);
      end = this.calendarService.getLastWorkingDay(this.timesheetService.timesheet);
    } else {
      start = this.timesheetService.timesheet.invoice.date;
    }

    if (end && (start.getDate() as Date) !== (end.getDate() as Date)) {
      return `du ${this.formatDate(start)} au  ${this.formatDate(end)}`;
    } else {
      return `le ${this.formatDate(start)}`;
    }
  }

  getNumberOfFlatFees() {
    return this.timesheetService.timesheet.flatFees.length;
  }

  private _sortFlatFeesAmounts() {
    const amounts: FlatFee[] = [];
    const quantity: number[] = [];

    this.timesheetService.timesheet.flatFees.forEach((flatFee: any) => {
      const index = amounts.indexOf(flatFee.amount);
      if (index === -1) {
        amounts.push(flatFee.amount);
        quantity.push(1);
      } else {
        quantity[index]++;
      }
    });
    return { amounts, quantity };
  }

  sortByMiscsVatState() {
    const deductible: any = [];
    const nondeductible = {
      quantity: 0,
      amount: 0,
    };
    this.timesheetService.timesheet.miscellaneous.forEach((misc: any) => {
      if (this.miscellaneousService.vatDeductible(misc)) {
        const index = deductible.indexOf(this._searchMiscVatIndex(misc.tvaRate, deductible));
        if (index > -1) {
          deductible[index].amount += +misc.amount;
          deductible[index].quantity++;
        } else {
          deductible.push({
            amount: +misc.amount,
            quantity: 1,
            vatRate: misc.tvaRate,
          });
        }
      } else {
        nondeductible.amount += +misc.amount;
        nondeductible.quantity++;
      }
    });
    return { deductible, nondeductible };
  }

  private _searchMiscVatIndex(vat: number, miscTable: any) {
    return miscTable.find((element: any) => {
      return element['vatRate'] === vat;
    });
  }

  private _totalDeductible() {
    let total = 0;

    this.sortByMiscsVatState().deductible.forEach((miscVat: any) => {
      if (this.timesheetService.timesheet.invoice.provider.vatExemption) {
        total += miscVat.amount;
      } else {
        total += miscVat.amount / (1 + miscVat.vatRate / 100);
      }
      if (miscVat.vatRate !== 0) {
        if (miscVat.vatRate !== this.monetaryService.vatRates.normal) {
          this.totalVat.push({
            rate: miscVat.vatRate,
            amount: miscVat.amount - miscVat.amount / (1 + miscVat.vatRate / 100),
          });
        } else {
          this.totalVat[0].amount += miscVat.amount - miscVat.amount / (1 + miscVat.vatRate / 100);
        }
      }
    });
    return total;
  }
  private _sortVatTable() {
    this.totalVat.sort((a: any, b: any) => {
      return +(a.rate - b.rate);
    });
  }
  private _sumCalcul(): void {
    this.performanceTotal = this.workedTime * this.timesheetService.timesheet.invoice.dailyRate;
    this.totalVat = [
      {
        rate: this.monetaryService.vatRates.normal,
        amount:
          (this.performanceTotal +
            this.expenseFlatFeeTotal +
            this.expenseMileageTotal +
            this.sortByMiscsVatState().nondeductible.amount) *
          (this.monetaryService.vatRates.normal / 100),
      },
    ];
    this.totalHT =
      this.performanceTotal +
      this._totalDeductible() +
      this.sortByMiscsVatState().nondeductible.amount +
      this.expenseMileageTotal +
      this.expenseFlatFeeTotal;
    this._sortVatTable();
    if (this.timesheetService.timesheet.invoice.provider.vatExemption) {
      this.totalTTC = this.totalHT;
      this.totalVat = [];
    } else {
      let sumVat = 0;
      this.totalVat.forEach((vat: any) => {
        sumVat += vat.amount;
      });
      this.totalTTC = this.totalHT + sumVat;
    }
  }
}

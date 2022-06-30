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
import { MiscellaneousExpensesService } from '../../../expense/services/miscellaneous-expenses.service';

@Component({
	selector: 'app-invoice-pdf',
	templateUrl: './invoice-pdf.component.html',
	styleUrls: ['./invoice-pdf.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class InvoicePDFComponent {
	public local = 'fr';
	public totalHT: number;
	public totalTTC: number;
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
	public totalVat: any;
	public performanceTotal: number;
	public format;
	public miscsTotal;
	public flatFeesTotal;

	constructor(
		public calendarService: CalendarService,
		public timesheetService: TimesheetService,
		public monetaryService: MonetaryService,
		public miscellaneousService: MiscellaneousExpensesService,
		private _route: ActivatedRoute,
		private _titleService: Title
	) {
		this.timesheetService.openTimesheet(
			this._route.snapshot.paramMap.get('data'),
			'review'
		);
		this.timesheetService.timesheet.invoice = Object.assign(
			new Invoice(),
			this.timesheetService.timesheet.invoice
		);
		this.timesheetService.timesheet.invoice.provider = Object.assign(
			new Company(),
			this.timesheetService.timesheet.invoice.provider
		);
		this.timesheetService.timesheet.invoice.client = Object.assign(
			new Company(),
			this.timesheetService.timesheet.invoice.client
		);
		this.workedTime = this.calendarService.getWorkedTime(
			this.timesheetService.timesheet
		);
		this.expenseMileageTotal = timesheetService.getTotalAllowance();
		this.expenseMiscellaneousTotal = timesheetService.getTotalMiscellaneous();
		this.expenseFlatFeeTotal = timesheetService.getTotalFlatFee();
		this.expenseFlatFeeQuantity = this.getNumberOfFlatFees();
		this.currencyCode = this.monetaryService.currencyCode;
		this._titleService.setTitle(this.timesheetService.timesheet.invoice.number);
		this.flatFeesTotal = this._sortFlatFeesAmounts();
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
			start = this.calendarService.getFirstWorkingDay(
				this.timesheetService.timesheet
			);
			end = this.calendarService.getLastWorkingDay(
				this.timesheetService.timesheet
			);
		} else {
			start = this.timesheetService.timesheet.invoice.date;
		}

		if (end && <Date>start.getDate() !== <Date>end.getDate()) {
			return `du ${this.formatDate(start)} au  ${this.formatDate(end)}`;
		} else {
			return `le ${this.formatDate(start)}`;
		}
	}

	public getNumberOfFlatFees() {
		return this.timesheetService.timesheet.flatFees.length;
	}

	private _sortFlatFeesAmounts() {
		let amounts = [];
		let quantity: number[] = [];

		this.timesheetService.timesheet.flatFees.forEach((flatFee) => {
			let index = amounts.indexOf(flatFee.amount);
			if (index === -1) {
				amounts.push(flatFee.amount);
				quantity.push(1);
			} else {
				quantity[index]++;
			}
		});
		return { amounts, quantity };
	}

	public sortByMiscsVatState() {
		let deductible = [];
		let nondeductible = {
			quantity: 0,
			amount: 0,
		};
		this.timesheetService.timesheet.miscellaneous.forEach((misc) => {
			if (this.miscellaneousService.vatDeductible(misc)) {
				const index = deductible.indexOf(
					this._searchMiscVatIndex(misc.tvaRate, deductible)
				);
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
		return miscTable.find((element) => {
			return element['vatRate'] === vat;
		});
	}

	private _totalDeductible() {
		let total = 0;

		this.sortByMiscsVatState().deductible.forEach((miscVat) => {
			if (this.timesheetService.timesheet.invoice.provider.vatExemption) {
				total += miscVat.amount;
			} else {
				total += miscVat.amount / (1 + miscVat.vatRate / 100);
			}
			if (miscVat.vatRate !== 0) {
				if (miscVat.vatRate !== this.monetaryService.vatRates.normal) {
					this.totalVat.push({
						rate: miscVat.vatRate,
						amount:
							miscVat.amount - miscVat.amount / (1 + miscVat.vatRate / 100),
					});
				} else {
					this.totalVat[0].amount +=
						miscVat.amount - miscVat.amount / (1 + miscVat.vatRate / 100);
				}
			}
		});
		return total;
	}
	private _sortVatTable() {
		this.totalVat.sort((a, b) => {
			return +(a.rate - b.rate);
		});
	}
	private _sumCalcul(): void {
		this.performanceTotal =
			this.workedTime * this.timesheetService.timesheet.invoice.dailyRate;
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
			this.totalVat.forEach((vat) => {
				sumVat += vat.amount;
			});
			this.totalTTC = this.totalHT + sumVat;
		}
	}
}

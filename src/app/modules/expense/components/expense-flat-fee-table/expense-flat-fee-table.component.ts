import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { FlatFee } from 'src/app/shared/models/flat-fee.model';

@Component({
	selector: 'app-expense-flat-fee-table',
	templateUrl: './expense-flat-fee-table.component.html',
	styleUrls: ['./expense-flat-fee-table.component.scss'],
})
export class ExpenseFlatFeeTableComponent implements OnInit {
	@Output() changed: EventEmitter<boolean> = new EventEmitter();
	@Input() hideDeleteButton = false;

	flatFees: FlatFee[];

	public local = 'fr';
	public currencyCode: string;

	constructor(
		public timesheetService: TimesheetService,
		private _monetaryService: MonetaryService
	) {
		this.currencyCode = this._monetaryService.currencyCode;
	}

	ngOnInit() {
		this.flatFees = this.timesheetService.timesheet.flatFees;
	}

	delete(flatFee) {
		this.flatFees.splice(this.flatFees.indexOf(flatFee), 1);
		this.changed.emit(true);
	}
}

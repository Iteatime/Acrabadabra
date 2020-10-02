import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { AbstractExpenseTable } from '../abstract-expense-table';
import { FlatFee } from '@model/flat-fee.model';

@Component({
  selector: 'app-expense-flat-fee-table',
  templateUrl: './expense-flat-fee-table.component.html',
  styleUrls: ['./expense-flat-fee-table.component.scss'],
})
export class ExpenseFlatFeeTableComponent extends AbstractExpenseTable implements OnInit {
  flatFees: FlatFee[];
  local = 'fr';
  currencyCode: string;

  constructor(public timesheetService: TimesheetService, readonly _monetaryService: MonetaryService) {
    super(_monetaryService);
  }

  ngOnInit(): void {
    this.flatFees = this.timesheetService.timesheet.flatFees;
  }

  delete(flatFee): void {
    this.flatFees.splice(this.flatFees.indexOf(flatFee), 1);
    this.changed.emit(true);
  }
}

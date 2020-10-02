import { Component, OnInit } from '@angular/core';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { AbstractExpenseTable } from '../abstract-expense-table';
import { Commute } from '@model/commute';

@Component({
  selector: 'app-expense-mileage-table',
  templateUrl: './expense-mileage-table.component.html',
  styleUrls: ['./expense-mileage-table.component.scss'],
})
export class ExpenseMileageTableComponent extends AbstractExpenseTable implements OnInit {
  commutes: Commute[];

  constructor(public timesheetService: TimesheetService, readonly _monetaryService: MonetaryService) {
    super(_monetaryService);
  }

  ngOnInit() {
    this.commutes = this.timesheetService.timesheet.commutes;
  }

  delete(commute) {
    this.commutes.splice(this.commutes.indexOf(commute), 1);
    this.changed.emit(true);
  }
}

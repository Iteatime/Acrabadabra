import { Component, OnInit, Input } from '@angular/core';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { AbstractExpenseTable } from '../abstract-expense-table';
import { MonetaryService } from '@services/monetary/monetary.service';
import { Miscellaneous } from '@model/miscellaneous.model';

@Component({
  selector: 'app-expense-miscellaneous-table',
  templateUrl: './expense-miscellaneous-table.component.html',
  styleUrls: ['./expense-miscellaneous-table.component.scss'],
})
export class ExpenseMiscellaneousTableComponent extends AbstractExpenseTable implements OnInit {
  @Input() vatExemption = false;

  miscellaneous: Miscellaneous[];

  constructor(
    public timesheetService: TimesheetService,
    public miscellaneousService: MiscellaneousExpensesService,
    readonly _monetaryService: MonetaryService,
  ) {
    super(_monetaryService);
  }

  ngOnInit() {
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;
  }

  delete(miscellaneous) {
    this.miscellaneous.splice(this.miscellaneous.indexOf(miscellaneous), 1);
    this.changed.emit(true);
  }
}

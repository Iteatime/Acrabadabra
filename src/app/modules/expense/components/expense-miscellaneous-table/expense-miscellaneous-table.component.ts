import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';

@Component({
  selector: 'app-expense-miscellaneous-table',
  templateUrl: './expense-miscellaneous-table.component.html',
  styleUrls: ['./expense-miscellaneous-table.component.scss'],
})
export class ExpenseMiscellaneousTableComponent implements OnInit {
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;
  @Input() vatExemption = false;

  local = 'fr';
  currencyCode: string;
  miscellaneous: Miscellaneous[];

  constructor(
    public timesheetService: TimesheetService,
    public miscellaneousService: MiscellaneousExpensesService,
    private _monetaryService: MonetaryService,
  ) {
    this.currencyCode = this._monetaryService.currencyCode;
  }

  ngOnInit() {
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;
  }

  delete(miscellaneous: Miscellaneous) {
    this.miscellaneous.splice(this.miscellaneous.indexOf(miscellaneous), 1);
    this.changed.emit(true);
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';

@Component({
  selector: 'app-expense-miscellaneous-table',
  templateUrl: './expense-miscellaneous-table.component.html',
  styleUrls: ['./expense-miscellaneous-table.component.scss']
})
export class ExpenseMiscellaneousTableComponent implements OnInit {

  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  public local = 'fr';
  public currencyCode: string;
  miscellaneous: Miscellaneous[];

  constructor(public timesheetService: TimesheetService,
              public miscellaneousService: MiscellaneousExpensesService,
              private _monetaryService: MonetaryService
  ) {
    this.currencyCode = this._monetaryService.currencyCode;
    }

  ngOnInit() {
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;
  }

  delete(miscellaneous) {
    this.miscellaneous.splice(this.miscellaneous.indexOf(miscellaneous), 1);
    this.changed.emit(true);
  }

}

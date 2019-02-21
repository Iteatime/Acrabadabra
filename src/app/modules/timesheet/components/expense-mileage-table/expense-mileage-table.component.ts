import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';

import { TimesheetService } from '../../services/timesheet.service';
import { Commute } from 'src/app/shared/models/commute';

@Component({
  selector: 'app-expense-mileage-table',
  templateUrl: './expense-mileage-table.component.html',
  styleUrls: ['./expense-mileage-table.component.scss']
})
export class ExpenseMileageTableComponent implements OnInit {

  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  commutes: Commute[];

  public local = 'fr';
  public currencyCode: string;

  constructor(public timesheetService: TimesheetService,
              private _monetaryService: MonetaryService
    ) {
      this.currencyCode = this._monetaryService.currencyCode;

    }

  ngOnInit() {
    this.commutes = this.timesheetService.timesheet.commutes;
  }

  delete(commute) {
    this.commutes.splice(this.commutes.indexOf(commute), 1);
    this.changed.emit(true);
  }
}

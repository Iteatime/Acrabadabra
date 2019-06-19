import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { Commute } from 'src/app/shared/models/commute';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';

@Component({
  selector: 'app-expense-mileage-table',
  templateUrl: './expense-mileage-table.component.html',
  styleUrls: ['./expense-mileage-table.component.scss'],
})
export class ExpenseMileageTableComponent implements OnInit {
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  commutes: Commute[];

  local = 'fr';
  currencyCode: string;

  constructor(public timesheetService: TimesheetService, private _monetaryService: MonetaryService) {
    this.currencyCode = this._monetaryService.currencyCode;
  }

  ngOnInit() {
    this.commutes = this.timesheetService.timesheet.commutes;
  }

  delete(commute: Commute) {
    this.commutes.splice(this.commutes.indexOf(commute), 1);
    this.changed.emit(true);
  }
}

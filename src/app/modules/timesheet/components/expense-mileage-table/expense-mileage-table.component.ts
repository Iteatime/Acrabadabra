import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-expense-mileage-table',
  templateUrl: './expense-mileage-table.component.html',
  styleUrls: ['./expense-mileage-table.component.scss']
})
export class ExpenseMileageTableComponent implements OnInit {

  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  constructor(public timesheetService: TimesheetService) { }
  commutes;

  ngOnInit() {
    this.commutes = this.timesheetService.timesheet.commutes;

  }

  delete(commute) {
    this.commutes.splice(this.commutes.indexOf(commute), 1);
    this.changed.emit(true);
  }
}

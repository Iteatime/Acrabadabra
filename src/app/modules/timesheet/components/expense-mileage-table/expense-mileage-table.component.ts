import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-expense-mileage-table',
  templateUrl: './expense-mileage-table.component.html',
  styleUrls: ['./expense-mileage-table.component.scss']
})
export class ExpenseMileageTableComponent implements OnInit {

  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() showDeleteButton = false;

  constructor(public timesheetService: TimesheetService) { }
  expenses;

  ngOnInit() {
    this.expenses = this.timesheetService.timesheet.expenses;

  }

  delete(expense) {
    this.expenses.splice(this.expenses.indexOf(expense), 1);
    this.changed.emit(true);
  }
}

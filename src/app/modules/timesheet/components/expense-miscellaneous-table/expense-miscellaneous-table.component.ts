import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-expense-miscellaneous-table',
  templateUrl: './expense-miscellaneous-table.component.html',
  styleUrls: ['./expense-miscellaneous-table.component.scss']
})
export class ExpenseMiscellaneousTableComponent implements OnInit {

  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Input() hideDeleteButton = false;

  constructor(public timesheetService: TimesheetService) { }
  miscellaneous;

  ngOnInit() {
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;

  }

  delete(miscellaneous) {
    this.miscellaneous.splice(this.miscellaneous.indexOf(miscellaneous), 1);
    this.changed.emit(true);
  }

}

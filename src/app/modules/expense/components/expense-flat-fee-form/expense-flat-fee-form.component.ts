import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlatFee } from 'src/app/shared/models/flat-fee.model';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';

@Component({
  selector: 'app-expense-flat-fee-form',
  templateUrl: './expense-flat-fee-form.component.html',
  styleUrls: ['./expense-flat-fee-form.component.scss']
})
export class ExpenseFlatFeeFormComponent implements OnInit {

  @ViewChild('expenseForm') form: NgForm;
  @Input() flatFees: FlatFee[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  flatFee = new FlatFee('', null);
  submitted = false;

  constructor ( public timesheetService: TimesheetService) {
   }

  ngOnInit () {
    this.flatFees = this.timesheetService.timesheet.flatFees;
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  onSubmit () {
    if (this.form.valid) {
      this.submitted = true;
      this.flatFees.push(Object.assign(new FlatFee(), this.flatFee));
      this.changed.emit(true);
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        this.form.controls[field].markAsTouched();
      });
    }
  }

}

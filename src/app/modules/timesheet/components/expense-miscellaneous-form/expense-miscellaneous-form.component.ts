import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';
import { NgForm } from '@angular/forms';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-expense-miscellaneous-form',
  templateUrl: './expense-miscellaneous-form.component.html',
  styleUrls: ['./expense-miscellaneous-form.component.scss']
})
export class ExpenseMiscellaneousFormComponent implements OnInit {

  @ViewChild('expenseForm') form: NgForm;
  @Input() miscellaneous: Miscellaneous[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  misc: Miscellaneous;
  submitted = false;
  miscellaneousTypes = [];

  constructor(private miscellaneousExpenses: MiscellaneousExpensesService,
              public timesheetService: TimesheetService) { }

  ngOnInit() {
    this.misc = new Miscellaneous();
    this.miscellaneousTypes = this.miscellaneousExpenses.miscellaneousTypes;
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.miscellaneous.push(Object.assign(new Miscellaneous(), this.misc));
      this.changed.emit(true);
      console.log(this.misc);
      console.log(this.miscellaneous);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsTouched();
      });
    }
  }

}
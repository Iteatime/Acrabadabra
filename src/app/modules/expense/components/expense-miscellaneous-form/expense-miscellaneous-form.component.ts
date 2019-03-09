import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';

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
  vatRates = [];

  constructor(public miscellaneousExpensesService: MiscellaneousExpensesService,
              public timesheetService: TimesheetService,
              private _monetaryService: MonetaryService) { }

  ngOnInit() {
    this.misc = new Miscellaneous();
    this.miscellaneousTypes = this.miscellaneousExpensesService.miscellaneousTypes;
    this.vatRates = [];
    Object.values(this._monetaryService.vatRates).forEach(rate => {
      this.vatRates.push(rate);
    });
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.miscellaneousExpensesService.vatDeductible(this.misc) && this.misc.selectedType !== 5) {
        this.misc.tvaRate = this.miscellaneousExpensesService.miscellaneousTypes[this.misc.selectedType].vat;
      }
      this.misc.miscellaneousType = this.miscellaneousExpensesService.miscellaneousTypes[this.misc.selectedType].type;
      this.submitted = true;
      this.miscellaneous.push(Object.assign(new Miscellaneous(), this.misc));
      this.changed.emit(true);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsTouched();
      });
    }
  }
}

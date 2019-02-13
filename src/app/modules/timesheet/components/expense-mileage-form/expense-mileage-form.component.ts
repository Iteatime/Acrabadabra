import { VehiclesService } from '../../services/vehicles.service';
import { TimesheetService } from '../../services/timesheet.service';

import { Commute } from '../../../../shared/models/commute';

import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-expense-mileage-form',
  templateUrl: './expense-mileage-form.component.html',
  styleUrls: ['./expense-mileage-form.component.scss']
})
export class ExpenseMileageFormComponent implements OnInit {

  @ViewChild('expenseForm') form: NgForm;
  @Input() commutes: Commute[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  commute = new Commute('', '', null, '', null);
  submitted = false;
  vehicles: any[];

  constructor(private vehiclesService: VehiclesService,
              public timesheetService: TimesheetService) { }

  ngOnInit() {
    this.vehicles = this.vehiclesService.vehicles;
    this.commutes = this.timesheetService.timesheet.commutes;

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.commute.mileageAllowance = this.commute.distance * this.commute.allowance;
      this.commutes.push({...this.commute});
      this.changed.emit(true);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsTouched();
      });
    }
  }
}

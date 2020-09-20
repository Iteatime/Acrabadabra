import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Commute } from '../../../../shared/models/commute';

import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-expense-mileage-form',
  templateUrl: './expense-mileage-form.component.html',
  styleUrls: ['./expense-mileage-form.component.scss'],
})
export class ExpenseMileageFormComponent implements OnInit {
  @ViewChild('expenseForm', { static: true }) form: NgForm;
  @Input() commutes: Commute[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  commute = new Commute('', '', null, '', null);
  submitted = false;
  vehicles: any[];

  constructor(public vehiclesService: VehiclesService, public timesheetService: TimesheetService) {}

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
      if (!this.vehiclesService.isCustomizable(this.commute)) {
        this.commute.allowance = this.vehiclesService.vehicles[this.commute.vehicleSelected].allowance;
      }
      this.submitted = true;
      this.commute.mileageAllowance = this.commute.distance * this.commute.allowance;
      this.commutes.push({ ...this.commute });
      this.changed.emit(true);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsTouched();
      });
    }
  }
}

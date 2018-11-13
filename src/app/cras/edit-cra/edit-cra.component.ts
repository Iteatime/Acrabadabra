import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { Cra } from 'src/app/shared/cra.model';
import { formData } from 'src/app/@types/formData';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEvent } from 'calendar-utils';

import { getMonth, getDate, differenceInMinutes, getYear } from 'date-fns';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss']
})
export class EditCraComponent implements OnInit {
  @ViewChild (CalendarComponent) timesheetPicker;

  cra = new Cra();
  editToken: string;
  reviewToken: string;

  saved = false;
  showModal = false;
  showErrorMessage = false;

  title = {
    add: 'Créer',
    edit: 'Editer',
    review: 'Consulter',
  };

  mode: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serializer: SerializerService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        'consultantNameInput' : new FormControl(
          this.cra.consultant.name,
          [
            Validators.required,
            Validators.minLength(4),
          ]
        ),
        'consultantEmailInput' : new FormControl(
          this.cra.consultant.email,
          [
            Validators.required,
            Validators.email,
          ]
        ),
        'missionTitle' : new FormControl(
          this.cra.mission.title,
          [
            Validators.required,
            Validators.minLength(4),
          ]
        ),
        'missionFinalClient' : new FormControl(
          this.cra.mission.client,
          [
            Validators.required,
            Validators.minLength(4),
          ]
        ),
      }
    );

    this.timesheetPicker.controls.forEach(
      (control: FormControl) => {
        control.setParent(this.form);
      }
    );

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('data')) {
          const datas: formData = this.serializer.deserialize(params['data']);
          this.mode = datas.mode;
          this.cra = datas.cra;
          this.consultantNameInput.setValue(this.cra.consultant.name);
          this.consultantEmailInput.setValue(this.cra.consultant.email);
          this.missionTitle.setValue(this.cra.mission.title);
          this.missionFinalClient.setValue(this.cra.mission.client);
        } else {
          this.mode = 'add';
        }
      }
    );
  }

  get consultantNameInput() { return this.form.get('consultantNameInput'); }
  get consultantEmailInput() { return this.form.get('consultantEmailInput'); }
  get missionTitle() { return this.form.get('missionTitle'); }
  get missionFinalClient() { return this.form.get('missionFinalClient'); }

  /**
   * @description Generate the links token to edit and review this cra
   *
   */
  onSubmitCRA() {

    if (this.form.invalid) {
      this.showErrorMessage = true;
    } else {
      this.cra = new Cra(
        this.consultantEmailInput.value,
        this.consultantNameInput.value,
        this.missionFinalClient.value,
        this.missionTitle.value,
      );

      const timesheet = this.timesheetPicker.timesheet;

      if (timesheet[0] !== undefined) {
        this.cra.timesheet = this.minifyTimesheet(timesheet);
      } else {
        this.cra.timesheet = [];
      }

      const data: formData = {
        mode: 'edit',
        cra: this.cra,
      };

      this.saved = true;

      this.editToken = this.serializer.serialize(data);

      data.mode = 'review',

      this.reviewToken = this.serializer.serialize(data);

      this.showModal = true;
    }
  }

  minifyTimesheet(timesheet: CalendarEvent[]): any {
    const month = getMonth(timesheet[0].start);
    const year = getYear(timesheet[0].start);
    const minitimesheet = {};
          minitimesheet[month + '.' + year] = new Array();

    timesheet.forEach(
      (day) => {
        const date = getDate(day.start);
        const time = differenceInMinutes(day.end, day.start) / 60 / 8;

        minitimesheet[month + '.' + year][date] = time;
      }
    );

    return minitimesheet;
  }

  /**
   * @description Called when the modal close
   *
   */
  onModalClose() {

    this.showModal = false;
    setTimeout(
      () => {
        this.saved = false;
      },
      2000
    );
  }
}

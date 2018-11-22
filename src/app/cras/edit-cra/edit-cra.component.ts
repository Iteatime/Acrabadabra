import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { SerializerService } from 'src/app/shared/serialization/serializer.service';
import { Cra } from 'src/app/shared/cra.model';
import { formData } from 'src/app/@types/formData';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEvent } from 'calendar-utils';

import { getMonth, getDate, differenceInMinutes, getYear, lastDayOfMonth } from 'date-fns';

@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCraComponent implements OnInit {
  @ViewChild (CalendarComponent) timesheetPicker;

  cra = new Cra();
  editToken: string;
  reviewToken: string;

  showModal = false;
  showErrorModal = false;

  title = {
    add: 'Saisir',
    edit: 'Editer',
    review: 'Consulter',
  };

  mode: string;
  form: FormGroup;
  formControls = {
    'consultantNameInput' : new FormControl(
      this.cra.consultant.name,
      [
        Validators.required,
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
      ]
    ),
    'missionFinalClient' : new FormControl(
      this.cra.mission.client,
      [
        Validators.required,
      ]
    ),
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serializer: SerializerService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formControls);
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.getDataFromUrlParams(params);
      }
    );

    this.setTitle(this.title[this.mode] + ' un compte rendu d\'activité');
  }

  get consultantNameInput(): AbstractControl  {
    return this.form.get('consultantNameInput');
  }

  get consultantEmailInput(): AbstractControl  {
    return this.form.get('consultantEmailInput');
  }

  get missionTitle(): AbstractControl  {
    return this.form.get('missionTitle');
  }

  get missionFinalClient(): AbstractControl {
    return this.form.get('missionFinalClient');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(this.titleService.getTitle() + ' - ' + newTitle);
  }

  getDataFromUrlParams(params: Params): void {
    if (params.hasOwnProperty('data')) {
      const datas: formData = this.serializer.deserialize(params['data']);
      this.mode = datas.mode;
      this.cra = datas.cra;
      this.setInputsValue(this.cra);

      if (this.mode === 'review') {
        this.disableInputs();
      }
    } else {
      this.mode = 'add';
    }
  }

  disableInputs(): void {
    this.consultantNameInput.disable();
    this.consultantEmailInput.disable();
    this.missionTitle.disable();
    this.missionFinalClient.disable();
  }

  setInputsValue(cra: Cra): void {
    this.consultantNameInput.setValue(cra.consultant.name);
    this.consultantEmailInput.setValue(cra.consultant.email);
    this.missionTitle.setValue(cra.mission.title);
    this.missionFinalClient.setValue(cra.mission.client);
  }

  onModalClose(toggle: string) {
    this[toggle] = false;
  }

  onSubmitCRA(): void {
    if (this.form.invalid) {
      this.showValidationMessages();
      this.showErrorModal = true;
    } else {
      this.createCRA();
      this.creatTokens();
      this.showModal = true;
    }
  }

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  createCRA(): void {
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
  }

  creatTokens(): void {
    const data: formData = {
      mode: 'edit',
      cra: this.cra,
    };
    this.editToken = this.serializer.serialize(data);
    data.mode = 'review',
    this.reviewToken = this.serializer.serialize(data);
  }

  minifyTimesheet(timesheet: CalendarEvent[]): any {
    const month = getMonth(timesheet[0].start),
          year = getYear(timesheet[0].start),
          monthLength = getDate(lastDayOfMonth(timesheet[0].start)),
          minitimesheet = {};
          minitimesheet[month + '.' + year] = new Array();

    for (let date = 0; date < monthLength; date++) {
      let time = 0;

      timesheet.forEach(aDay => {
        if (date + 1 === getDate(aDay.start)) {
          time = differenceInMinutes(aDay.end, aDay.start) / 60 / 8;
          return;
        }
      });
      minitimesheet[month + '.' + year][date] = time;
    }

    return minitimesheet;
  }
}

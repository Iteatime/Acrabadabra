import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Cra } from 'src/app/shared/cra.model';
import { formData } from 'src/app/@types/formData';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEvent } from 'calendar-utils';

import { getMonth, getDate, differenceInMinutes, getYear, lastDayOfMonth } from 'date-fns';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';


@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCraComponent implements OnInit {
  @ViewChild (CalendarComponent) timesheetPicker;
  @ViewChild (InvoiceFormComponent) invoiceForm;

  cra = new Cra();
  editToken: string;
  reviewToken: string;
  invoiceToken: string;

  showModal = false;
  showErrorModal = false;
  generateInvoice = false;

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
    'missionTitleInput' : new FormControl(
      this.cra.mission.title,
      [
        Validators.required,
      ]
    ),
    'missionFinalClientInput' : new FormControl(
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
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formControls);
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('data')) {
          this.initDataFromUrlParams(params);

          if (this.mode === 'review') {
            this.disableInputs();
            this.generateInvoice = false;
          }
        } else {
          this.mode = 'add';
        }
      }
    );

    this.setPageTitle(this.title[this.mode] + ' un compte rendu d\'activité');
  }

  get consultantNameInput(): AbstractControl  {
    return this.form.get('consultantNameInput');
  }

  get consultantEmailInput(): AbstractControl  {
    return this.form.get('consultantEmailInput');
  }

  get missionTitleInput(): AbstractControl  {
    return this.form.get('missionTitleInput');
  }

  get missionFinalClientInput(): AbstractControl {
    return this.form.get('missionFinalClientInput');
  }

  setPageTitle(newTitle: string) {
    this.titleService.setTitle('Acrabadabra - ' + newTitle);
  }

  initDataFromUrlParams(params: Params): void {
    const datas: formData = this.serializer.deserialize(params['data']);
    this.mode = datas.mode;
    this.cra = datas.cra;
    this.setInputsValue(this.cra);
    if (datas.hasOwnProperty('invoice')) {
      this.generateInvoice = true;
      setTimeout(() => { this.invoiceForm.invoice = datas.invoice; }, 0);

    }
  }

  disableInputs(): void {
    this.consultantNameInput.disable();
    this.consultantEmailInput.disable();
    this.missionTitleInput.disable();
    this.missionFinalClientInput.disable();
  }

  setInputsValue(cra: Cra): void {
    this.consultantNameInput.setValue(cra.consultant.name);
    this.consultantEmailInput.setValue(cra.consultant.email);
    this.missionTitleInput.setValue(cra.mission.title);
    this.missionFinalClientInput.setValue(cra.mission.client);
  }

  onSubmitCRA(): void {
    if (this.checkFormsValidity()) {
      this.createCRA();
      this.createTokens();
      if (this.generateInvoice) { this.invoiceToken = this.createInvoiceToken(); }
      this.showModal = true;
    } else {
      this.showValidationMessages();
      this.showErrorModal = true;
    }
  }

  checkFormsValidity(): boolean {
    if (this.generateInvoice) {
      return this.invoiceForm.form.valid && this.form.valid;
    }
    return this.form.valid;
  }

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.generateInvoice) {
      Object.keys(this.invoiceForm.form.controls).forEach(field => {
        this.invoiceForm.form.controls[field].markAsTouched();
      });
    }
  }

  createCRA(): void {
    this.cra = new Cra(
      this.consultantEmailInput.value,
      this.consultantNameInput.value,
      this.missionFinalClientInput.value,
      this.missionTitleInput.value,
    );

    const timesheet = this.timesheetPicker.timesheet;
    if (timesheet[0] !== undefined) {
      this.cra.timesheet = this.minifyTimesheet(timesheet);
    } else {
      this.cra.timesheet = [];
    }
  }

  createTokens(): void {
    let invoice;
    // if (this.generateInvoice) { invoice = this.invoiceDataService.getInvoice(); }
    if (this.generateInvoice) { invoice = this.invoiceForm.invoice; }
    const data: formData = {
      cra: this.cra,
      invoice: invoice,
      mode: '',
    };
    this.editToken = this.serializer.serialize({ ...data, mode: 'edit' });
    this.reviewToken = this.serializer.serialize({ ...data, mode: 'review' });
  }

  createInvoiceToken(): string {
    const data = {
      consultant: this.cra.consultant,
      mission: this.cra.mission,
      time: this.timesheetPicker.totalWorkedTime,
      invoice: this.invoiceForm.invoice,
    };
    return this.serializer.serialize(data);
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

  onModalClose(toggle: string) {
    this[toggle] = false;
  }
}


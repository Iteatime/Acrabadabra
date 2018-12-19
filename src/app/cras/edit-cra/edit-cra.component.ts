import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Cra } from 'src/app/shared/cra.model';
import { formData } from 'src/app/@types/formData';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEvent } from 'calendar-utils';

import { getMonth, getDate, differenceInMinutes, getYear, lastDayOfMonth } from 'date-fns';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { Invoice } from 'src/app/@types/invoice';


@Component({
  selector: 'app-edit-cra',
  templateUrl: './edit-cra.component.html',
  styleUrls: ['./edit-cra.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCraComponent implements OnInit {
  @ViewChild (CalendarComponent) timesheetPicker: CalendarComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild ('form') form: NgForm;

  cra = new Cra();
  editToken: string;
  reviewToken: string;
  invoiceToken: string;

  showModal = false;
  showErrorModal = false;
  showLinks = false;
  generateInvoice = false;
  isCalendarValid = true;

  title = {
    add: 'Saisir',
    edit: 'Editer',
    review: 'Consulter',
  };

  mode: string;

  mailSubject = (): string => {
    return   'Acrabadabra  - Compte rendu d\'activité de ' + this.cra.consultant.name;
  }
  mailBody = (): string => {
    return  'Bonjour,%0d%0a' +
            '%0d%0a' +
            'Un compte rendu d\'activité est consultable sur http://Acrabadabra.com.%0d%0a' +
            '%0d%0a' +
            'Consultant : ' + this.cra.consultant.name + '%0d%0a' +
            'Mission : ' + this.cra.mission.title + '%0d%0a' +
            'Journées de prestation : ' + this.timesheetPicker.totalWorkedTime.toLocaleString('fr') + '%0d%0a' +
            '%0d%0a' +
            'Vous pouvez le consulter et télécharger la facture ici : ' +
            window.location.origin + '/cra/edit?data=' + this.reviewToken;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private serializer: SerializerService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('data')) {
          this.initDataFromUrlParams(params);

          if (this.mode === 'review') {
            this.disableInputs();
          }
        } else {
          this.mode = 'add';
        }
      }
    );

    this.setPageTitle(this.title[this.mode] + ' un compte rendu d\'activité');
  }

  setPageTitle(newTitle: string) {
    this.titleService.setTitle('Acrabadabra - ' + newTitle);
  }

  initDataFromUrlParams(params: Params): void {
    const datas: formData = this.serializer.deserialize(params['data']);
    this.mode = datas.mode;
    this.cra = datas.cra;

    if (datas.hasOwnProperty('invoice')) {
      if (this.mode !== 'review') {
        this.generateInvoice = true;
        setTimeout(() => {
          this.invoiceForm.invoice = datas.invoice;
          this.initChangesDetection(true);
        });
      }

      this.createTimesheetTokens(datas.invoice);
      this.invoiceToken = this.createInvoiceToken(datas.invoice);
    } else {
      this.createTimesheetTokens();
      setTimeout(() => { this.initChangesDetection(); });
    }

    setTimeout(() => {
      this.showLinks = true;
      this.changeDetector.detectChanges();
    });
  }

  initChangesDetection(invoice?: boolean): void {
    if (invoice) {
      setTimeout(() => {
        this.invoiceForm.form.valueChanges.subscribe(() => {
          this.showLinks = false;
        });
      });
    }

    if (invoice === undefined || invoice) {
      this.form.valueChanges.subscribe(() => {
        this.showLinks = false;
      });

      this.timesheetPicker.refresh.subscribe(() => {
        this.showLinks = false;
      });
    }
  }

  disableInputs(): void {
    Object.keys(this.form.controls).forEach(control => {
      this.form.controls['control'].disable();
    });
  }

  onSubmitCRA(): void {
    if (this.checkFormsValidity()) {
      this.createCRA();
      if (this.generateInvoice) {
        this.createTimesheetTokens(this.invoiceForm.invoice);
        this.invoiceToken = this.createInvoiceToken();
      } else {
        this.createTimesheetTokens();
      }
      this.showModal = true;
      this.showLinks = true;
      this.changeDetector.detectChanges();
      this.initChangesDetection(this.generateInvoice);
      document.querySelector('#bottom').scrollIntoView();
    } else {
      this.showValidationMessages();
      this.showErrorModal = true;
      document.querySelector('#top').scrollIntoView();
    }
  }

  checkFormsValidity(): boolean {

    let valid = this.form.valid;

    if (this.timesheetPicker.totalWorkedTime > 0) {
      this.isCalendarValid = true;
    } else {
      valid = false;
    }

    if (this.generateInvoice) {
      valid = valid && this.invoiceForm.form.valid;
    }

    return valid;
  }

  showValidationMessages(): void {
    Object.keys(this.form.controls).forEach(field => {
      this.form.controls[field].markAsTouched();
    });
    if (this.generateInvoice) {
      Object.keys(this.invoiceForm.form.controls).forEach(field => {
        this.invoiceForm.form.controls[field].markAsTouched();
      });
    }
    this.isCalendarValid = this.timesheetPicker.totalWorkedTime > 0;
  }

  createCRA(): void {
    const timesheet = this.timesheetPicker.timesheet;
    if (timesheet[0] !== undefined) {
      this.cra.timesheet = this.minifyTimesheet(timesheet);
    } else {
      this.cra.timesheet = [];
    }
  }

  createTimesheetTokens(invoice?: Invoice): void {
    const data: formData = {
      cra: this.cra,
      invoice: invoice,
      mode: '',
    };
    this.editToken = this.serializer.serialize({ ...data, mode: 'edit' });
    this.reviewToken = this.serializer.serialize({ ...data, mode: 'review' });
  }

  createInvoiceToken(invoice?: Invoice): string {
    const data = {
      consultant: this.cra.consultant,
      mission: this.cra.mission,
      time: this.timesheetPicker.totalWorkedTime,
      invoice: invoice || this.invoiceForm.invoice,
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


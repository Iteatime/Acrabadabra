import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Timesheet } from 'src/app/shared/timesheet.model';
import { TimesheetTokenData } from 'src/app/@types/timesheet-token-data';
import { SerializerService } from 'src/app/shared/serialization/serializer.service';

import { CalendarComponent } from 'src/app/calendar/calendar.component';
import { CalendarEvent } from 'calendar-utils';

import { getMonth, getDate, differenceInMinutes, getYear, lastDayOfMonth } from 'date-fns';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { Invoice } from 'src/app/@types/invoice';


@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTimesheetComponent implements OnInit {
  @ViewChild (CalendarComponent) timesheetPicker: CalendarComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild ('form') form: NgForm;

  timesheet = new Timesheet();
  editToken: string;
  reviewToken: string;
  invoiceToken: string;

  showModal = false;
  showErrorModal = false;
  showLinks = false;
  generateInvoice = false;

  title = {
    add: 'Saisir',
    edit: 'Modifier',
  };

  mode: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private serializer: SerializerService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('token')) {
        this.initDataFromUrlParams(params);
      } else {
        this.mode = 'add';
      }
    });

    this.setPageTitle(this.title[this.mode] + ' un compte rendu d\'activité');
  }

  setPageTitle(newTitle: string) {
    this.titleService.setTitle('Acrabadabra - ' + newTitle);
  }

  initDataFromUrlParams(params: Params): void {
    const data: TimesheetTokenData = this.serializer.deserialize(params['token']);
    this.mode = data.mode;
    this.timesheet = data.timesheet;
    this.showLinks = true;

    if (data.invoice !== null) {
      this.generateInvoice = true;
      setTimeout(() => {
        this.invoiceForm.invoice = data.invoice;
        this.initChangesDetection(true);
      });
      this.createTimesheetTokens(data.invoice);
      this.invoiceToken = this.createInvoiceToken(data.invoice);
    } else {
      this.createTimesheetTokens();
      setTimeout(() => { this.initChangesDetection(); });
    }
    this.changeDetector.detectChanges();
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

  onSubmitTimesheet(): void {
    if (this.checkFormsValidity()) {
      this.createTimesheet();
      this.createTimesheetTokens();
      if (this.generateInvoice) {
        this.invoiceToken = this.createInvoiceToken();
        this.createTimesheetTokens(this.invoiceForm.invoice);
      }
      this.showModal = true;
      this.showLinks = true;
    } else {
      this.showValidationMessages();
      this.showErrorModal = true;
      document.querySelector('#top').scrollIntoView();
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
      this.form.controls[field].markAsTouched();
    });
    if (this.generateInvoice) {
      Object.keys(this.invoiceForm.form.controls).forEach(field => {
        this.invoiceForm.form.controls[field].markAsTouched();
      });
    }
  }

  createTimesheet(): void {
    const timesheet = this.timesheetPicker.timesheet;
    if (timesheet[0] !== undefined) {
      this.timesheet.workingDays = this.minifyTimesheet(timesheet);
    } else {
      this.timesheet.workingDays = [];
    }
  }

  createTimesheetTokens(invoice: Invoice = null): void {
    const data: TimesheetTokenData = {
      timesheet: this.timesheet,
      invoice: invoice,
      mode: '',
    };
    this.editToken = this.serializer.serialize({ ...data, mode: 'edit' });
    this.reviewToken = this.serializer.serialize({ ...data, mode: 'review' });
  }

  createInvoiceToken(invoice?: Invoice): string {
    const data = {
      consultant: this.timesheet.consultant,
      mission: this.timesheet.mission,
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
    if (toggle === 'showModal') {
      document.querySelector('#bottom').scrollIntoView();
    }
    this[toggle] = false;
    this.initChangesDetection(this.generateInvoice);
  }
}


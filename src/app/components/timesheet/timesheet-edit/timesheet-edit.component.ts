import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarComponent } from 'src/app/calendar/calendar.component';
import { CalendarManagerService } from 'src/app/calendar/calendar-manager.service';

import { ReviewMail } from 'src/app/shared/review-mail.model';
import { Timesheet } from 'src/app/shared/timesheet.model';
import { TimesheetService } from 'src/app/shared/timesheet.service';

import { InvoiceFormComponent } from 'src/app/components/invoice/invoice-form/invoice-form.component';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetEditComponent implements OnInit, AfterViewInit {
  @ViewChild (CalendarComponent) timesheetPicker: CalendarComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild ('form') form: NgForm;

  timesheet = new Timesheet();
  generateInvoice = false;

  showLinks = false;
  showSubmitMessage = false;
  submitMessage: string;
  submitMessageType: string;

  originUrl = window.location.origin;

  reviewMail: ReviewMail;

  editMode = false;

  constructor(
    private calendarManager: CalendarManagerService,
    private route: ActivatedRoute,
    private router: Router,
    protected timesheetService: TimesheetService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.hasOwnProperty('data')) {
      this.editMode = this.timesheetService.openTimesheet(this.route.snapshot.paramMap.get('data'), 'edit');
      if (!this.editMode) {
        this.router.navigate(['timesheet', 'create']);
        return;
      }
      this.fillForm(this.timesheetService.timesheet);
    }
    this.setPageTitle(this.getTitlePrefix() + ' un compte rendu d\'activité');
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.onUserInput();
      }
    });
  }

  fillForm(timesheet: Timesheet): void {
    this.timesheet = timesheet;
    this.showLinks = true;
    this.generateInvoice = timesheet.invoice !== undefined;
    this.updateMailtoLink();
  }

  getTitlePrefix() {
    return this.editMode ? 'Modifier' : 'Saisir';
  }

  setPageTitle(newTitle: string) {
    this.titleService.setTitle('Acrabadabra - ' + newTitle);
  }

  onUserInput() {
    this.showLinks = false;
    this.showSubmitMessage = false;
  }

  onSubmit() {
    if (this.checkFormsValidity()) {
      this.getWorkingDays();
      if (this.generateInvoice) {
        this.timesheet.invoice = this.invoiceForm.invoice;
      }
      this.updateMailtoLink();
      this.timesheetService.timesheet = this.timesheet;
      this.showLinks = true;
      this.setSubmitMessage(false);
    } else {
      this.showValidationMessages();
      this.setSubmitMessage(true);
    }
  }

  setSubmitMessage(error: boolean): void {
    if (error) {
      this.submitMessage = 'Veuillez vérifier votre saisie';
      this.submitMessageType = 'error';
    } else {
      this.submitMessage = 'Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.';
      this.submitMessageType = 'success';
    }
    this.showSubmitMessage = true;
  }

  updateMailtoLink(): void {
    this.reviewMail = new ReviewMail(
      this.timesheet,
      this.calendarManager.getWorkedTime(this.timesheet),
      this.timesheetService.getReviewToken(),
      this.originUrl + '/timesheet/edit/'
    );
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

  getWorkingDays(): void {
    const events = this.timesheetPicker.timesheet;
    if (events[0] !== undefined) {
      this.timesheet.workingDays = this.calendarManager.getworkingDays(events);
    } else {
      this.timesheet.workingDays = [];
    }
  }
}

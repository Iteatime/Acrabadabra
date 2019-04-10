import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewMail } from 'src/app/shared/models/review-mail.model';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';

import { TimesheetService } from '../../services/timesheet.service';
import { UrlShorteningService } from '../../services/url-shortening.service';

import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ExpenseMileageFormComponent } from 'src/app/modules/expense/components/expense-mileage-form/expense-mileage-form.component';
import { ExpenseMiscellaneousFormComponent } from 'src/app/modules/expense/components/expense-miscellaneous-form/expense-miscellaneous-form.component';
import { ExpenseFlatFeeFormComponent } from 'src/app/modules/expense/components/expense-flat-fee-form/expense-flat-fee-form.component';
import { CalendarSelectorComponent } from 'src/app/modules/calendar/components/calendar-selector/calendar-selector.component';

import { NotificationService } from 'src/app/modules/notification/services/notification.service';

import { LocalSaveService } from 'src/app/shared/services/localSave/local-save.service';
import { Timesheet } from 'src/app/shared/models/timesheet.model';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetEditComponent implements OnInit {
  @ViewChild (CalendarSelectorComponent) calendar: CalendarSelectorComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild (ExpenseMileageFormComponent) commutesForm: ExpenseMileageFormComponent;
  @ViewChild (ExpenseMiscellaneousFormComponent) miscellaneousForm: ExpenseMiscellaneousFormComponent;
  @ViewChild (ExpenseFlatFeeFormComponent) flatFeesForm: ExpenseFlatFeeFormComponent;
  @ViewChild ('form') form: NgForm;
  originUrl = window.location.origin;
  editShortUrl: string = '';
  reviewShortUrl: string = '';
  submitMessage: any = null;
  reviewMail: ReviewMail;
  generateInvoice = false;
  generateExpenses = false;
  showLinks = false;

  constructor(
    public timesheetService: TimesheetService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private _urlShortener: UrlShorteningService
  ) {}

  ngOnInit(): void {
    if (!this.timesheetService.openTimesheet(this.route.snapshot.params['data'], 'edit')) {
      this.router.navigate(['timesheet', 'create']);
      if (this.timesheetService.openLastTimesheetInLocal()) {
        this.loadTimesheet(this.timesheetService.timesheet);
        this.setShortUrl();
      }
    } else {
      this.loadTimesheet(this.timesheetService.timesheet);
    }
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.onUserInput();
      }
    });
    this.titleService.setTitle(`Acrabadabra - ${this.getModeTitle()} un compte rendu d'activité`);
  }

  set timesheet(timesheet: string) {
    const localTimesheet = JSON.parse(timesheet);
    this.timesheetService.setTimesheet(localTimesheet);
    localTimesheet.commutes = [];
    localTimesheet.flatFees = [];
    localTimesheet.miscellaneous = [];
    this.loadTimesheet(localTimesheet);
  }

  private loadTimesheet(timesheet: Timesheet): void {
    this.showLinks = true;
    this.generateInvoice = !!timesheet.invoice;
    this.generateExpenses = timesheet.commutes.length > 0
                          || timesheet.flatFees.length > 0
                          || timesheet.miscellaneous.length > 0;
  }

  getModeTitle() {
    return this.timesheetService.mode === 'edit' ? 'Modifier' : 'Saisir';
  }

  onUserInput() {
    this.showLinks = false;
    this.submitMessage = null;
  }

  setShortUrl(action?: string): void {
    if (!!action) {
      const getToken = (action === 'edit') ? this.timesheetService.getEditToken() : this.timesheetService.getReviewToken();
      this._urlShortener.shortenUrl(this.originUrl + `/timesheet/${action}/` + getToken)
        .then ((res) => {
          action === 'edit' ? this.editShortUrl = res : this.reviewShortUrl = res;
          this.updateMailtoLink();
        });
      return;
    }

    ['edit', 'review'].forEach(mode => {
      this.setShortUrl(mode);
    });
  }

  onSubmit() {
    this.notificationService.dismissAll();
    if (this.checkFormsValidity()) {
      this.timesheetService.timesheet.workingDays = this.calendarService.getWorkingDays(this.calendar.timesheet);
      this.timesheetService.timesheet.invoice = this.generateInvoice ? this.invoiceForm.invoice : null;
      this.timesheetService.timesheet.miscellaneous = this.generateExpenses ? this.miscellaneousForm.miscellaneous : [];
      this.timesheetService.timesheet.commutes = this.generateExpenses ? this.commutesForm.commutes : [];
      this.timesheetService.timesheet.flatFees = this.generateExpenses ? this.flatFeesForm.flatFees : [];
      this.timesheetService.saveTimesheet();
      this.setShortUrl();
      this.updateMailtoLink();
      this.reactToSubmition(false);
    } else {
      this.reactToSubmition(true);
      this.showValidationMessages();
    }
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this.notificationService.push('Veuillez vérifier votre saisie', 'warning', { isSelfClosing: false });
    } else {
      this.notificationService.push(
        'Votre CRA est validé<br/>Si vous le modifiez, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.',
        'success',
        { duration: 10 }
      );
    }
    this.showLinks = !error;
  }

  updateMailtoLink(): void {
    this.reviewMail = new ReviewMail(
      this.timesheetService.timesheet,
      this.calendarService.getWorkedTime(this.timesheetService.timesheet),
      this.reviewShortUrl
    );
  }

  checkFormsValidity(): boolean {
    let valid = this.form.valid;
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
    if (this.timesheetService.timesheet.commutes.length === 0
        && this.timesheetService.timesheet.miscellaneous.length === 0
        && this.timesheetService.timesheet.flatFees.length === 0
        && this.generateExpenses) {
      this.notificationService.push('Vous n\'avez ajouté aucun frais', 'warning', { isSelfClosing: false });
    }
  }
}

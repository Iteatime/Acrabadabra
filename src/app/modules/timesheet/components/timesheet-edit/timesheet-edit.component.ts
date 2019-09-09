import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { ReviewMail, Timesheet, Invoice, Mission } from 'src/app/shared/models';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';
import { UrlShorteningService } from '../../services/url-shortening.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MissionService } from 'src/app/modules/mission/services/mission.service';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ExpenseMileageFormComponent } from 'src/app/modules/expense/components/expense-mileage-form/expense-mileage-form.component';
import { ExpenseMiscellaneousFormComponent } from 'src/app/modules/expense/components/expense-miscellaneous-form/expense-miscellaneous-form.component';
import { ExpenseFlatFeeFormComponent } from 'src/app/modules/expense/components/expense-flat-fee-form/expense-flat-fee-form.component';
import { CalendarSelectorComponent } from 'src/app/modules/calendar/components/calendar-selector/calendar-selector.component';


@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetEditComponent implements OnInit {
  @ViewChild(CalendarSelectorComponent) calendar: CalendarSelectorComponent;
  @ViewChild(InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild(ExpenseMileageFormComponent) commutesForm: ExpenseMileageFormComponent;
  @ViewChild(ExpenseMiscellaneousFormComponent) miscellaneousForm: ExpenseMiscellaneousFormComponent;
  @ViewChild(ExpenseFlatFeeFormComponent) flatFeesForm: ExpenseFlatFeeFormComponent;
  @ViewChild('form') form: NgForm;
  originUrl = window.location.origin;
  editShortUrl: string = '';
  reviewShortUrl: string = '';
  submitMessage: any = null;
  reviewMail: ReviewMail;
  generateInvoice = false;
  generateExpenses = false;
  showLinks = false;
  currentUrl = '';
  currentMission: Mission = new Mission();

  constructor(
    public timesheetService: TimesheetService,
    public auth: AuthenticationService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private titleService: Title,
    private notificationService: NotificationService,
    private _urlShortener: UrlShorteningService,
    private _missionService: MissionService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    if (this.route.snapshot.params.data !== undefined) {
      if (!this.timesheetService.openTimesheet(this.route.snapshot.params['data'], 'edit')) {
        if (this.timesheetService.openLastTimesheetInLocal()) {
          this.loadTimesheet(this.timesheetService.timesheet);
        }
      } else {
        this.loadTimesheet(this.timesheetService.timesheet);
      }
    } else if (this.route.snapshot.params.missionId !== undefined) {

      this._missionService.readMission(this.route.snapshot.params.missionId).then( response => {

        this.generateInvoice = true;
        this.currentMission = response;
        this.timesheetService.timesheet.missionId = response.id;

        // this.timesheetService.timesheet.consultant.name = response.consultant;
        // this.timesheetService.timesheet.consultant.email = response.consultantEmail;

        // this.timesheetService.timesheet.mission = response;

      });
    }

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.onUserInput();
      }
    });
    this.titleService.setTitle(`Acrabadabra - ${ this.getModeTitle() } un compte rendu d'activité`);
  }

  openAuth() {
    this.auth.widget.open();
  }

  getModeTitle() {
    return this.timesheetService.mode === 'edit' ? 'Modifier' : 'Saisir';
  }

  onUserInput() {
    this.showLinks = false;
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
      this.timesheetService.timesheet.id = this.route.snapshot.params.missionId;
      this.setShortUrl('edit');
      this.setShortUrl('review');
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
    if (this.showLinks) {
      setTimeout(() => {
        document.getElementById('action-links').scrollIntoView({behavior:"smooth"});
      });
    }
  }

  updateMailtoLink(): void {
    this.reviewMail = new ReviewMail(
      this.timesheetService.timesheet,
      this.currentMission,
      this.calendarService,
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

  private loadTimesheet(timesheet: Timesheet): void {
    this._missionService.readMission(timesheet.missionId).then( response => {
      this.currentMission = response;

      this.showLinks = false;
      this.generateInvoice = !!timesheet.invoice && !_.isEqual(timesheet.invoice, Object.assign({}, new Invoice()));
      this.generateExpenses = timesheet.commutes.length > 0 || timesheet.flatFees.length > 0 || timesheet.miscellaneous.length > 0;
      this.setShortUrl();

    });
  }
}

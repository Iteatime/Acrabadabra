import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewMail } from 'src/app/shared/models/review-mail.model';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

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
  @ViewChild (CalendarSelectorComponent) calendar: CalendarSelectorComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild (ExpenseMileageFormComponent) commutesForm: ExpenseMileageFormComponent;
  @ViewChild (ExpenseMiscellaneousFormComponent) miscellaneousForm: ExpenseMiscellaneousFormComponent;
  @ViewChild (ExpenseFlatFeeFormComponent) flatFeesForm: ExpenseFlatFeeFormComponent;
  @ViewChild ('form') form: NgForm;
  originUrl = window.location.origin;
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
  ) {}

  ngOnInit(): void {
    if (!this.timesheetService.openTimesheet(this.route.snapshot.params['data'], 'edit')) {
      this.router.navigate(['timesheet', 'create']);
    } else {
      this.showLinks = true;
      this.generateInvoice = !!this.timesheetService.timesheet.invoice;
      this.generateExpenses = this.timesheetService.timesheet.commutes.length > 0;
      this.updateMailtoLink();
    }
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.onUserInput();
      }
    });
    this.titleService.setTitle(`Acrabadabra - ${this.getModeTitle()} un compte rendu d'activité`);
  }

  getModeTitle() {
    return this.timesheetService.mode === 'edit' ? 'Modifier' : 'Saisir';
  }

  onUserInput() {
    this.showLinks = false;
    this.submitMessage = null;
  }

  onSubmit() {
    if (this.checkFormsValidity()) {
      this.timesheetService.timesheet.workingDays = this.calendarService.getWorkingDays(this.calendar.timesheet);
      this.timesheetService.timesheet.invoice = this.generateInvoice ? this.invoiceForm.invoice : null;
      this.timesheetService.timesheet.miscellaneous = this.generateExpenses ? this.miscellaneousForm.miscellaneous : [];
      this.timesheetService.timesheet.commutes = this.generateExpenses ? this.commutesForm.commutes : [];
      this.timesheetService.timesheet.flatFees = this.generateExpenses ? this.flatFeesForm.flatFees : [];
      this.updateMailtoLink();
      this.reactToSubmition(false);
    } else {
      this.reactToSubmition(true);
      this.showValidationMessages();
    }
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this.submitMessage = { text: 'Veuillez vérifier votre saisie', type: 'error' };
    } else {
      this.submitMessage = {
        text: 'Si vous modifiez le CRA, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.',
        type: 'success'
      };
    }
    this.showLinks = !error;
  }

  updateMailtoLink(): void {
    this.reviewMail = new ReviewMail(
      this.timesheetService.timesheet,
      this.calendarService.getWorkedTime(this.timesheetService.timesheet),
      this.timesheetService.getReviewToken(),
      this.originUrl + '/timesheet/review/'
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
      this.submitMessage.text += ', vous n\'avez ajouté aucun frais';
    }
  }
}

import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewMail } from 'src/app/shared/models/review-mail.model';

import { TimesheetService } from '../../timesheet.service';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

import { CalendarSelectorComponent } from 'src/app/modules/calendar/components/calendar-selector/calendar-selector.component';
import { CalendarService } from 'src/app/modules/calendar/calendar.service';


@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetEditComponent implements OnInit {
  @ViewChild (CalendarSelectorComponent) calendar: CalendarSelectorComponent;
  @ViewChild (InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild ('form') form: NgForm;
  originUrl = window.location.origin;
  submitMessage: any = null;
  reviewMail: ReviewMail;
  generateInvoice = false;
  showLinks = false;

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router,
    protected timesheetService: TimesheetService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    if (!this.timesheetService.openTimesheet(this.route.snapshot.params['data'], 'edit')) {
      this.router.navigate(['timesheet', 'create']);
    } else {
      this.showLinks = true;
      this.generateInvoice = this.timesheetService.timesheet.invoice ? true : false;
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
      this.updateMailtoLink();
      this.reactToSubmition(false);
    } else {
      this.showValidationMessages();
      this.reactToSubmition(true);
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
      this.originUrl + '/timesheet/edit/'
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
  }
}

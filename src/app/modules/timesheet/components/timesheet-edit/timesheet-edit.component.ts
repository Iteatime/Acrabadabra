import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import * as _ from "lodash";

import { ReviewMail, Timesheet, Invoice } from "src/app/shared/models";

import { CalendarService } from "src/app/modules/calendar/calendar.service";
import { TimesheetService } from "../../services/timesheet.service";
import { UrlShorteningService } from "../../services/url-shortening.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { NotificationService } from "src/app/modules/notification/services/notification.service";

import { InvoiceFormComponent } from "../invoice-form/invoice-form.component";
import { ExpenseMileageFormComponent } from "src/app/modules/expense/components/expense-mileage-form/expense-mileage-form.component";
import { ExpenseMiscellaneousFormComponent } from "src/app/modules/expense/components/expense-miscellaneous-form/expense-miscellaneous-form.component";
import { ExpenseFlatFeeFormComponent } from "src/app/modules/expense/components/expense-flat-fee-form/expense-flat-fee-form.component";
import { CalendarSelectorComponent } from "src/app/modules/calendar/components/calendar-selector/calendar-selector.component";
import { MissionService } from "../../../../shared/services/missions/missions.service";

@Component({
  selector: "app-timesheet-edit",
  templateUrl: "./timesheet-edit.component.html",
  styleUrls: ["./timesheet-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TimesheetEditComponent implements OnInit, AfterViewInit {
  @ViewChild(CalendarSelectorComponent) calendar: CalendarSelectorComponent;
  @ViewChild(InvoiceFormComponent) invoiceForm: InvoiceFormComponent;
  @ViewChild(ExpenseMileageFormComponent)
  commutesForm: ExpenseMileageFormComponent;
  @ViewChild(ExpenseMiscellaneousFormComponent)
  miscellaneousForm: ExpenseMiscellaneousFormComponent;
  @ViewChild(ExpenseFlatFeeFormComponent)
  flatFeesForm: ExpenseFlatFeeFormComponent;
  @ViewChild("form") form: NgForm;
  originUrl = window.location.origin;
  editShortUrl: string = "";
  reviewShortUrl: string = "";
  submitMessage: any = null;
  reviewMail: ReviewMail;
  generateInvoice = false;
  generateExpenses = false;
  showLinks = false;
  currentUrl = "";
  ready: boolean;
  canGenerateInvoice: boolean;

  constructor(
    public timesheetService: TimesheetService,
    public auth: AuthenticationService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private titleService: Title,
    private notificationService: NotificationService,
    private _urlShortener: UrlShorteningService,
    private _missionService: MissionService
  ) { }

  async ngOnInit() {
    const snapshot = this.route.snapshot;

    this.currentUrl = window.location.href;
    if (snapshot.params.data !== undefined) {
      if (
        !(await this.timesheetService.openTimesheet(
          snapshot.params.data,
          "edit"
        ))
      ) {
        if (this.timesheetService.openLastTimesheetInLocal()) {
          this.loadTimesheet(this.timesheetService.timesheet);
        }
      } else {
        this.loadTimesheet(this.timesheetService.timesheet);
      }
    } else if (snapshot.queryParams.mission !== undefined) {
      const response = await this._missionService.readMission(
        snapshot.queryParams.mission
      );
      this.generateInvoice = response.consultant?.isFreelance || false;
      this.timesheetService.timesheet.consultant.name =
        response.consultant.name;
      this.timesheetService.timesheet.consultant.email =
        response.consultant.email;

      this.timesheetService.timesheet.mission = response;
    } else {
      this.loadTimesheet(new Timesheet());
    }

    this.titleService.setTitle(
      `Acrabadabra - ${this.getModeTitle()} un compte rendu d'activité`
    );
    this.updateMailtoLink();
    this.ready = true;

    // When in a mission, only a freelance consultant can generate an invoice
    // This check also allows to generate invoices in review mode
    this.canGenerateInvoice = snapshot.queryParams.mission
      ? this.timesheetService.timesheet?.mission?.consultant?.isFreelance
      : true;

    if (snapshot.queryParams.bill) {
      this.timesheetService.timesheet.invoice.number = "";
    }
    this.generateInvoice = snapshot.queryParams.bill || false;
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.onUserInput();
      }
    });
  }

  openAuth() {
    this.auth.widget.open();
  }

  getModeTitle() {
    return this.timesheetService.mode === "edit" ? "Modifier" : "Saisir";
  }

  onUserInput() {
    this.showLinks = false;
  }

  setShortUrl(action?: string): void {
    if (!!action) {
      const getToken =
        action === "edit"
          ? this.timesheetService.getEditToken()
          : this.timesheetService.getReviewToken();
      this._urlShortener
        .shortenUrl(this.originUrl + `/timesheet/${action}/` + getToken)
        .then((res) => {
          action === "edit"
            ? (this.editShortUrl = res)
            : (this.reviewShortUrl = res);
          this.updateMailtoLink();
        });
      return;
    }

    ["edit", "review"].forEach((mode) => {
      this.setShortUrl(mode);
    });
  }

  async onSubmit() {
    this.notificationService.dismissAll();

    if (!this.checkFormsValidity()) {
      this.reactToSubmition(true);
      this.showValidationMessages();
      return;
    }

    this.timesheetService.timesheet.workingDays =
      this.calendarService.getWorkingDays(this.calendar.timesheet);
    this.timesheetService.timesheet.invoice = this.generateInvoice
      ? this.invoiceForm.invoice
      : null;
    if (this.invoiceForm?.invoice) {
      this.timesheetService.timesheet.invoice.client.address = this.invoiceForm.invoice.client.address;
      this.timesheetService.timesheet.invoice.provider.address =
        this.invoiceForm.invoice.provider.address;
    }
    this.timesheetService.timesheet.miscellaneous = this.generateExpenses
      ? this.miscellaneousForm.miscellaneous
      : [];
    this.timesheetService.timesheet.commutes = this.generateExpenses
      ? this.commutesForm.commutes
      : [];
    this.timesheetService.timesheet.flatFees = this.generateExpenses
      ? this.flatFeesForm.flatFees
      : [];

    const timesheetId = await this.timesheetService.createTimesheet();
    this.timesheetService.timesheet.id = timesheetId;

    this.timesheetService.saveTimesheet();

    this.editShortUrl = `${this.originUrl}/timesheet/edit/${timesheetId}`;
    this.reviewShortUrl = `${this.originUrl}/timesheet/review/${timesheetId}`;
    this.updateMailtoLink();
    this.reactToSubmition(false);
  }

  reactToSubmition(error: boolean): void {
    if (error) {
      this.notificationService.push(
        "Veuillez vérifier votre saisie",
        "warning",
        { isSelfClosing: false }
      );
    } else {
      this.notificationService.push(
        "Votre CRA est validé<br/>Si vous le modifiez, vous devrez le valider à nouveau et utiliser le nouveau lien de partage.",
        "success",
        { duration: 10 }
      );
    }
    this.showLinks = !error;
    if (this.showLinks) {
      setTimeout(() => {
        document
          .getElementById("action-links")
          .scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  updateMailtoLink(): void {
    this.reviewMail = new ReviewMail(
      this.timesheetService.timesheet,
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
    Object.keys(this.form.controls).forEach((field) => {
      this.form.controls[field].markAsTouched();
    });
    if (this.generateInvoice) {
      Object.keys(this.invoiceForm.form.controls).forEach((field) => {
        this.invoiceForm.form.controls[field].markAsTouched();
      });
    }
    if (
      this.timesheetService.timesheet.commutes.length === 0 &&
      this.timesheetService.timesheet.miscellaneous.length === 0 &&
      this.timesheetService.timesheet.flatFees.length === 0 &&
      this.generateExpenses
    ) {
      this.notificationService.push(
        "Vous n'avez ajouté aucun frais",
        "warning",
        { isSelfClosing: false }
      );
    }
  }

  private loadTimesheet(timesheet: Timesheet): void {
    this.showLinks = false;
    this.generateInvoice =
      !!timesheet.invoice &&
      !_.isEqual(timesheet.invoice, Object.assign({}, new Invoice()));
    this.generateExpenses =
      timesheet.commutes.length > 0 ||
      timesheet.flatFees.length > 0 ||
      timesheet.miscellaneous.length > 0;
    this.setShortUrl();
  }
}

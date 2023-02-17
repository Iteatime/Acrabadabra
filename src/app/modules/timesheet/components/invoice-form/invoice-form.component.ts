import {
  Component,
  ViewChild,
  Input,
  Output,
  OnInit,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Invoice, Mission } from "src/app/shared/models";
import { MissionService } from "../../../../shared/services/missions/missions.service";

import { TimesheetService } from "../../services/timesheet.service";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.scss"],
})
export class InvoiceFormComponent implements OnInit, AfterViewInit {
  @ViewChild("form") form: NgForm;
  @Input() invoice: Invoice;
  @Input() mission: Mission;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    const snapshot = this._route.snapshot;
    const context = snapshot.queryParams.mission
      ? "mission"
      : snapshot.url[0].path;
    if (this.mission.id) {
      let bankAccount = this.mission.consultant.isFreelance
        ? this.mission.consultant.company.bankAccount
        : this.mission.provider.bankAccount;
      if (snapshot.queryParams.bill) {
        bankAccount = this.mission.provider.bankAccount;
      }

      const invoiceData = {
        bankAccountHolder: bankAccount.holder,
        bankingAgency: bankAccount.agency,
        bankingDomiciliation: bankAccount.domiciliation,
        bankIBAN: bankAccount.iban,
        bankSWIFT: bankAccount.swift,
        clientRef: this.mission.client.ref,
        workedRate: this.mission.unitOfworkPrice,
        date: new Date().toISOString().slice(0, 10),
        paymentLatePenalty: this.mission.paymentDetails.penalties,
        paymentModality: this.mission.paymentDetails.mode,
      };

      if (this.mission.consultant.isFreelance && context === "mission") {
        if (!snapshot.queryParams.bill) {
          invoiceData.paymentModality = "";
          invoiceData.paymentLatePenalty = false;
          invoiceData.workedRate = this.mission.consultant.unitOfWorkPrice;
          delete invoiceData.clientRef;
        }
        this.fillInvoice(
          this.mission.consultant.company,
          this.mission.provider,
          invoiceData
        );
        const checkbox = document.querySelector(
          "div.timesheet-edit__wrapper__form__component:nth-child(5) > label:nth-child(1) > input:nth-child(1)"
        ) as HTMLInputElement;
        checkbox.checked = true;
      } else {
        this.fillInvoice(
          this.mission.provider,
          this.mission.client.company,
          invoiceData
        );
      }
    } else if (snapshot.queryParams.bill) {
      this.fillInvoice(this.invoice.client, {}, {});
    }

    if (!this.invoice) {
      this.invoice = new Invoice();
    }
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  fillInvoice(provider, client, invoiceData) {
    this.invoice = {
      ...this.invoice,
      ...invoiceData,
    };
    this.invoice.provider = provider;
    this.invoice.client = client;
    if (this.mission.id) {
      this.invoice.client.address = `${client.address.split(",")[0]}, ${
        client.zipCode
      } ${client.city}`;
      this.invoice.provider.address = `${provider.address.split(",")[0]}, ${
        provider.zipCode
      } ${provider.city}`;
    }
  }
}

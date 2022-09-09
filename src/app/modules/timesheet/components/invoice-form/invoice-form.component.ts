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

  constructor(
    private _route: ActivatedRoute,
    private _missionService: MissionService,
    private _timesheetService: TimesheetService
  ) {}

  ngOnInit() {
    const context = this._route.snapshot.url[0].path;

    if (this.mission) {
      const invoiceData = {
        bankAccountHolder: this.mission.consultant.company.bankAccount.holder,
        bankingAgency: this.mission.consultant.company.bankAccount.agency,
        bankingDomiciliation:
          this.mission.consultant.company.bankAccount.domiciliation,
        bankIBAN: this.mission.consultant.company.bankAccount.iban,
        bankSWIFT: this.mission.consultant.company.bankAccount.swift,
        clientRef: this.mission.client.ref,
      };

      if (this.mission.consultant.isFreelance && context === "mission") {
        this.fillInvoice(
          this.mission.consultant.company,
          this.mission.provider,
          invoiceData
        );
      } else {
        this.fillInvoice(
          this.mission.provider,
          this.mission.client.company,
          invoiceData
        );
      }
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
  }
}

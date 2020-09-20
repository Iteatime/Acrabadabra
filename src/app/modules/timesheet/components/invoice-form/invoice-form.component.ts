import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Invoice, Mission } from 'src/app/shared/models';

import { MissionService } from 'src/app/modules/mission/services/mission.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  @Input() invoice: Invoice;
  @Input() mission: Mission;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _missionService: MissionService,
    private readonly _timesheetService: TimesheetService,
  ) {}

  ngOnInit() {
    const context = this._route.snapshot.url[0].path;

    if (this.mission) {
      const invoiceData = {
        bankAccountHolder: this.mission.consultantBankAccountHolder,
        bankingAgency: this.mission.consultantBankingAgency,
        bankingDomiciliation: this.mission.consultantBankingDomiciliation,
        bankIBAN: this.mission.consultantBankIBAN,
        bankSWIFT: this.mission.consultantBankSWIFT,
        clientRef: this.mission.clientRef,
      };

      if (this.mission.consultantFreelance && context === 'mission') {
        this.fillInvoice(this.mission.consultantCompany, this.mission.providerCompany, invoiceData);
      } else {
        this.fillInvoice(this.mission.providerCompany, this.mission.clientCompany, invoiceData);
      }
    }

    if (!this.invoice) {
      this.invoice = new Invoice();
    }

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

import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from 'src/app/shared/models/invoice.model';

import { MissionService } from 'src/app/modules/mission/services/mission.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input() invoice: Invoice;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  constructor ( private _route: ActivatedRoute,
                private _missionService: MissionService,
                private _timesheetService: TimesheetService) {}

  ngOnInit() {

    this._missionService.readMission(this._route.snapshot.params.missionId).then( response => {

      const invoiceData =           {
        bankAccountHolder: response.consultantBankAccountHolder,
        bankingAgency: response.consultantBankingAgency,
        bankingDomiciliation: response.consultantBankingDomiciliation,
        bankIBAN: response.consultantBankIBAN,
        bankSWIFT: response.consultantBankSWIFT,
        clientRef: response.clientRef,
      };

      if (response.consultantFreelance) {

        this.fillInvoice(
          response.consultantCompany,
          response.providerCompany,
          invoiceData,
        );

      } else {

        this.fillInvoice(
          response.providerCompany,
          response.clientCompany,
          invoiceData,
        );

      }
    });


    if (this._route.snapshot.params.data) {
      this._missionService.readMission(this._timesheetService.timesheet.id).then( response => {

        const invoiceData =           {
          bankAccountHolder: response.consultantBankAccountHolder,
          bankingAgency: response.consultantBankingAgency,
          bankingDomiciliation: response.consultantBankingDomiciliation,
          bankIBAN: response.consultantBankIBAN,
          bankSWIFT: response.consultantBankSWIFT,
          clientRef: response.clientRef,
        };

        this.fillInvoice(
          response.clientCompany,
          null,
          invoiceData,
        );
      });
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
    }
    this.invoice.provider = provider;
    this.invoice.client = client;
  }
}

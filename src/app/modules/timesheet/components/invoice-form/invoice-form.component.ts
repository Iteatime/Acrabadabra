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

    this._missionService.readById(this._route.snapshot.params.missionId).then( response => {

      const invoiceData =           {
        bankAccountHolder: response.data.consultantBankAccountHolder,
        bankingAgency: response.data.consultantBankingAgency,
        bankingDomiciliation: response.data.consultantBankingDomiciliation,
        bankIBAN: response.data.consultantBankIBAN,
        bankSWIFT: response.data.consultantBankSWIFT,
        clientRef: response.data.clientRef,
      };

      if (response.data.consultantFreelance) {

        this.fillInvoice(
          response.data.consultantCompany,
          response.data.providerCompany,
          invoiceData,
        );

      } else {

        this.fillInvoice(
          response.data.providerCompany,
          response.data.clientCompany,
          invoiceData,
        );

      }
    });


    if (this._route.snapshot.params.data) {
      this._missionService.readById(this._timesheetService.timesheet.id).then( response => {

        const invoiceData =           {
          bankAccountHolder: response.data.consultantBankAccountHolder,
          bankingAgency: response.data.consultantBankingAgency,
          bankingDomiciliation: response.data.consultantBankingDomiciliation,
          bankIBAN: response.data.consultantBankIBAN,
          bankSWIFT: response.data.consultantBankSWIFT,
          clientRef: response.data.clientRef,
        };

        this.fillInvoice(
          response.data.clientCompany,
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

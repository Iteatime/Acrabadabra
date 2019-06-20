import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Invoice } from 'src/app/shared/models/invoice.model';

import { MissionService } from 'src/app/modules/mission/services/mission.service';

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
                private _missionService: MissionService) {}

  ngOnInit() {

    if (!this.invoice) {
        this.invoice = new Invoice();
    }

    if (this._route.snapshot.params.missionId !== undefined) {
      this._missionService.readById(this._route.snapshot.params.missionId).then( response => {

        if(response.data.consultantCompany.name) {
          this.invoice.provider.name = response.data.consultantCompany.name;
          this.invoice.provider.address = response.data.consultantCompany.address;
          this.invoice.provider.telephone = response.data.consultantCompany.telephone;
          this.invoice.provider.siren = response.data.consultantCompany.siren;
          this.invoice.provider.tradeAndCompaniesRegisterCity = response.data.consultantCompany.tradeAndCompaniesRegisterCity;
          this.invoice.provider.tradeAndCompaniesRegisterExemption = response.data.consultantCompany.tradeAndCompaniesRegisterExemption;
          this.invoice.provider.vatNumber = response.data.consultantCompany.vatNumber;
          this.invoice.provider.vatExemption = response.data.consultantCompany.vatExemption;
        } else {
          this.invoice.provider.name = response.data.providerCompany.name;
          this.invoice.provider.address = response.data.providerCompany.address;
          this.invoice.provider.telephone = response.data.providerCompany.telephone;
          this.invoice.provider.siren = response.data.providerCompany.siren;
          this.invoice.provider.tradeAndCompaniesRegisterCity = response.data.providerCompany.tradeAndCompaniesRegisterCity;
          this.invoice.provider.tradeAndCompaniesRegisterExemption = response.data.providerCompany.tradeAndCompaniesRegisterExemption;
          this.invoice.provider.vatNumber = response.data.providerCompany.vatNumber;
          this.invoice.provider.vatExemption = response.data.providerCompany.vatExemption;
        }

        this.invoice.client.name = response.data.clientCompany.name;
        this.invoice.client.address = response.data.clientCompany.address;
        this.invoice.client.telephone = response.data.clientCompany.telephone;
        this.invoice.client.siren = response.data.clientCompany.siren;
        this.invoice.client.tradeAndCompaniesRegisterCity = response.data.clientCompany.tradeAndCompaniesRegisterCity;
        this.invoice.client.tradeAndCompaniesRegisterExemption = response.data.clientCompany.tradeAndCompaniesRegisterExemption;
        this.invoice.client.vatNumber = response.data.clientCompany.vatNumber;
        this.invoice.client.vatExemption = response.data.clientCompany.vatExemption;

        this.invoice.bankAccountHolder = response.data.bankAccountHolder;
        this.invoice.bankingAgency = response.data.bankingAgency;
        this.invoice.bankingDomiciliation = response.data.bankingDomiciliation;
        this.invoice.bankIBAN = response.data.bankIBAN;
        this.invoice.bankSWIFT = response.data.bankSWIFT;
      });
    }

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }
}




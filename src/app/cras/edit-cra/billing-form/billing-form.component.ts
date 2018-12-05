import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Bill } from 'src/app/shared/bill.model';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent implements OnInit {

  bill: Bill = new Bill();
  billingForm: FormGroup;
  controlsBindings = {
    'billNumberInput' : { parent: this.bill, value: 'number'},
    'billDateInput' : { parent: this, value: 'billdate'},
    'billClientRefInput' : { parent: this.bill, value: 'clientRef'},
    'billDailyRateInput' : { parent: this.bill, value: 'dailyRate'},

    'billConsultantNameInput' : { parent: this.bill.consultant, value: 'name'},
    'billConsultantAddressInput' : { parent: this.bill.consultant, value: 'address'},
    'billConsultantTelephoneInput' : { parent: this.bill.consultant, value: 'telephone'},
    'billConsultantSIRENInput' : { parent: this.bill.consultant, value: 'siren'},
    'billConsultantTradeAndCompaniesRegisterCityInput' : { parent: this.bill.consultant, value: 'tradeAndCompaniesRegisterCity'},
    'billConsultantTradeAndCompaniesRegisterToggle' : { parent: this.bill.consultant, value: 'tradeAndCompaniesRegisterExemption'},
    'billConsultantVATNumberInput' : { parent: this.bill.consultant, value: 'vatNumber'},
    'billConsultantVATToggle' : { parent: this.bill.consultant, value: 'vatExemption'},

    'billClientNameInput' : { parent: this.bill.client, value: 'name'},
    'billClientAddressInput' : { parent: this.bill.client, value: 'address'},
    'billClientTelephoneInput' : { parent: this.bill.client, value: 'telephone'},
    'billClientSIRENInput' : { parent: this.bill.client, value: 'siren'},
    'billClientTradeAndCompaniesRegisterCityInput' : { parent: this.bill.client, value: 'tradeAndCompaniesRegisterCity'},
    'billClientTradeAndCompaniesRegisterToggle' : { parent: this.bill.client, value: 'tradeAndCompaniesRegisterExemption'},
    'billClientVATNumberInput' : { parent: this.bill.client, value: 'vatNumber'},
    'billClientVATToggle' : { parent: this.bill.client, value: 'vatExemption'},

    'billPaymentDateInput' : { parent: this.bill, value: 'paymentDate'},
    'billPaymentModalityInput' : { parent: this.bill, value: 'paymentModality'},
    'billPaymentLatePenaltyToggle' : { parent: this.bill, value: 'billPaymentLatePenalty'},
    'billBankDetailsIBANInput' : { parent: this.bill, value: 'bankIBAN'},
    'billBankDetailsSWIFTInput' : { parent: this.bill, value: 'bankSWIFT'},
    'billBankDetailsDomiciliationInput' : { parent: this.bill, value: 'bankingDomiciliation'},
  };

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.registerFormControls();
  }

  registerFormControls() {
    const controls = {};

    Object.keys(this.controlsBindings).forEach(control => {

      const controlBinding = this.controlsBindings[control];

      controls[control] = new FormControl(controlBinding.parent[controlBinding.value]);

      Object.defineProperty(this, control, {
        get: () => this.billingForm.get(control),
      });

      controls[control].valueChanges.subscribe((value: string) => {
        controlBinding.parent[controlBinding.value] = value;
      });
    });

    return this.billingForm = this.formBuilder.group(controls);
  }

  toggleControl(control: AbstractControl): void {
    if (!control.disabled) {
      control.reset();
      control.disable();
    } else {
      control.enable();
    }
  }
}

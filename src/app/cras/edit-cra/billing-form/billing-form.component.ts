import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent implements OnInit {

  billingForm: FormGroup;
  billingControls = {
    'billNumberInput' : new FormControl(),
    'billDateInput' : new FormControl(),
    'billClientRefInput' : new FormControl(),
    'billDailyRate' : new FormControl(),

    'billConsultantNameInput' : new FormControl(),
    'billConsultantAddressInput' : new FormControl(),
    'billConsultantTelephoneInput' : new FormControl(),
    'billConsultantSIRENInput' : new FormControl(),
    'billConsultantCityRCSInput' : new FormControl(),
    'billConsultantCityRCSToggle' : new FormControl(),
    'billConsultantVilleTVANumberInput' : new FormControl(),
    'billConsultantVilleTVANumberToggle' : new FormControl(),

    'billClientNameInput' : new FormControl(),
    'billClientAddressInput' : new FormControl(),
    'billClientTelephoneInput' : new FormControl(),
    'billClientSIRENInput' : new FormControl(),
    'billClientCityRCSInput' : new FormControl(),
    'billClientCityRCSToggle' : new FormControl(),
    'billClientVilleTVANumberInput' : new FormControl(),
    'billClientVilleTVANumberToggle' : new FormControl(),

    'billPaymentDateInput' : new FormControl(),
    'billPaymentModalityInput' : new FormControl(),
    'billBankDetailsIBANInput' : new FormControl(),
    'billBankDetailsSWIFTInput' : new FormControl(),
    'billBankDetailsDomiciliationInput' : new FormControl(),
  };

  constructor(private formBuilder: FormBuilder) { }

  get billConsultantCityRCSInput(): AbstractControl {
    return this.billingForm.get('billConsultantCityRCSInput');
  }

  get billConsultantVilleTVANumberInput(): AbstractControl {
    return this.billingForm.get('billConsultantVilleTVANumberInput');
  }

  get billClientCityRCSInput(): AbstractControl {
    return this.billingForm.get('billClientCityRCSInput');
  }

  get billClientVilleTVANumberInput(): AbstractControl {
    return this.billingForm.get('billClientVilleTVANumberInput');
  }

  ngOnInit() {
    this.registerFormControls();
  }

  registerFormControls() {
    this.billingForm = this.formBuilder.group(this.billingControls);
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

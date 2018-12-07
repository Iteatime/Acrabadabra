import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Invoice } from 'src/app/shared/invoice.model';
import { InvoiceDataService } from 'src/app/shared/invoice/invoice-data.service';
import { InputConfig } from 'src/app/shared/inputConfig.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoice: Invoice = new Invoice();
  invoiceForm: FormGroup;
  controlsBindings: InputConfig[] = [
    new InputConfig('invoiceNumberInput', { binding: 'number'}),
    new InputConfig('invoiceDateInput', { binding: 'date'}),
    new InputConfig('invoiceClientRefInput', { binding: 'clientRef'}),
    new InputConfig('invoiceDailyRateInput', { binding: 'dailyRate'}),


    new InputConfig('invoiceConsultantNameInput', { parent: 'consultant', binding: 'name'}),
    new InputConfig('invoiceConsultantAddressInput', { parent: 'consultant', binding: 'address'}),
    new InputConfig('invoiceConsultantTelephoneInput', { parent: 'consultant', binding: 'telephone'}),
    new InputConfig('invoiceConsultantSIRENInput', { parent: 'consultant', binding: 'siren'}),
    new InputConfig(
      'invoiceConsultantTradeAndCompaniesRegisterCityInput',
      {
        parent: 'consultant',
        binding: 'tradeAndCompaniesRegisterCity'
      }
    ),
    new InputConfig(
      'invoiceConsultantTradeAndCompaniesRegisterToggle',
      {
        parent: 'consultant',
        binding: 'tradeAndCompaniesRegisterExemption',
        toggle: 'invoiceConsultantTradeAndCompaniesRegisterCityInput'
      }
    ),
    new InputConfig('invoiceConsultantVATNumberInput', { parent: 'consultant', binding: 'vatNumber'}),
    new InputConfig(
      'invoiceConsultantVATToggle',
      {
        parent: 'consultant',
        binding: 'vatExemption',
        toggle: 'invoiceConsultantVATNumberInput'
      }
    ),


    new InputConfig('invoiceClientNameInput', { parent: 'client', binding: 'name'}),
    new InputConfig('invoiceClientAddressInput', { parent: 'client', binding: 'address'}),
    new InputConfig('invoiceClientTelephoneInput', { parent: 'client', binding: 'telephone'}),
    new InputConfig('invoiceClientSIRENInput', { parent: 'client', binding: 'siren'}),
    new InputConfig(
      'invoiceClientTradeAndCompaniesRegisterCityInput',
      {
        parent: 'client',
        binding: 'tradeAndCompaniesRegisterCity'
      }
    ),
    new InputConfig(
      'invoiceClientTradeAndCompaniesRegisterToggle',
      {
        parent: 'client',
        binding: 'tradeAndCompaniesRegisterExemption',
        toggle: 'invoiceClientTradeAndCompaniesRegisterCityInput'
      }
    ),
    new InputConfig('invoiceClientVATNumberInput', { parent: 'client', binding: 'vatNumber' }),
    new InputConfig(
      'invoiceClientVATToggle',
      {
        parent: 'client',
        binding: 'vatExemption',
        toggle: 'invoiceClientVATNumberInput'
      }
    ),


    new InputConfig('invoicePaymentDateInput', { binding: 'paymentDate'}),
    new InputConfig('invoicePaymentModalityInput', { binding: 'paymentModality'}),
    new InputConfig('invoicePaymentLatePenaltyToggle', { binding: 'invoicePaymentLatePenalty'}),
    new InputConfig('invoiceBankDetailsIBANInput', { binding: 'bankIBAN'}),
    new InputConfig('invoiceBankDetailsSWIFTInput', { binding: 'bankSWIFT'}),
    new InputConfig('invoiceBankDetailsDomiciliationInput', { binding: 'bankingDomiciliation'}),
  ];

  constructor(
    private formBuilder: FormBuilder,
    private invoiceDataService: InvoiceDataService
  ) {}


  ngOnInit() {
    this.invoice =  this.invoiceDataService.getInvoice();
    this.invoiceForm = this.registerFormControls();
    this.intAutoFormUpdater();
  }

  registerFormControls(): FormGroup {
    const controls: FormControl[] = [];

    this.controlsBindings.forEach(inputConfiguration => {
      controls[inputConfiguration.inputName] = new FormControl(inputConfiguration.resolveBinding(this.invoice));


      Object.defineProperty(this, inputConfiguration.inputName, {
        get: () => this.invoiceForm.get(inputConfiguration.inputName),
      });

      controls[inputConfiguration.inputName].valueChanges.subscribe((value: any) => {
        inputConfiguration.updateBinded(this.invoice, value);

        if (inputConfiguration.config.hasOwnProperty('toggle')) {
          this.toggleControl(this[inputConfiguration.config.toggle], value);
        }

        this.invoiceDataService.setInvoice(this.invoice);
      });
    });

    return this.formBuilder.group(controls);
  }

  intAutoFormUpdater(): void {
    this.invoiceDataService.onDataChanged.subscribe((invoice) => {
        this.invoice = invoice;
        this.controlsBindings.forEach(inputConfiguration => {
          this[inputConfiguration.inputName].setValue(inputConfiguration.resolveBinding(this.invoice));
        });
    });
  }

  toggleControl(control: AbstractControl, value: boolean): void {
    if (value) {
      control.reset();
      control.disable();
    } else {
      control.enable();
    }
  }
}

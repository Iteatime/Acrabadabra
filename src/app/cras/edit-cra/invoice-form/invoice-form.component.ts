import { Component, ViewChild } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent {

  @ViewChild('invoiceForm') form: NgForm;
  invoice: Invoice = new Invoice();

  constructor() {}
}

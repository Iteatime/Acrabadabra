import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoice: Invoice = new Invoice();

  constructor() {}

  ngOnInit() {}
}

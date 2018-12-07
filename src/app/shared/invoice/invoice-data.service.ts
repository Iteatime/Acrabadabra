import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Invoice } from '../invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  private invoice: Invoice;
  private dataChanged = new Subject<Invoice>();
  public onDataChanged = this.dataChanged.asObservable();

  constructor() {
    this.invoice = new Invoice();
  }

  public getInvoice(): Invoice {
    return this.invoice;
  }

  public setInvoice(invoice: Invoice, update = false): void {
    this.invoice = invoice;
    if (update) {
      this.dataChanged.next(this.getInvoice());
    }
  }
}

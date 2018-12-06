import { Injectable } from '@angular/core';
import { Bill } from 'src/app/@types/bill';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingDataService {
  private bill: Bill;
  private dataChanged = new Subject<Bill>();
  public onDataChanged = this.dataChanged.asObservable();

  constructor() {}

  getBillingData(): Bill {
    return this.bill;
  }

  setBillingData(bill: Bill): void {
    this.bill = bill;
    this.dataChanged.next(this.getBillingData());
  }
}

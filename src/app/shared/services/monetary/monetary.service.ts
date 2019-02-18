import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {

  constructor() { }

  public vatRateList = [2.1, 5.5, 10.0, 20.0];

  get  currencyCode(): string {
    return 'EUR';
  }

  get vatRate(): number {
    return this.vatRateList[this.vatRateList.length - 1];
  }

}

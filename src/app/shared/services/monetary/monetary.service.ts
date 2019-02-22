import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {

  constructor() { }


  public vatRates = { exempt: 0.0,
                      greatlyReduced: 5.5,
                      reduced: 10.0,
                      normal: 20.0
  };

  get currencyCode(): string {
    return 'EUR';
  }

  get vatRate(): number {
    return this.vatRates.normal;
  }

}

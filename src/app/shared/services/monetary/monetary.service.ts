import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonetaryService {
  constructor() {}

  vatRates = { exempt: 0, greatlyReduced: 5.5, reduced: 10, normal: 20 };

  get currencyCode(): string {
    return 'EUR';
  }

  get vatRate(): number {
    return this.vatRates.normal;
  }
}

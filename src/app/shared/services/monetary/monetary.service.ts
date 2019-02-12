import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonetaryService {

  constructor() { }

  get  currencyCode(): string {
    return 'EUR';
  }

  get vatRate(): number {
    return 20;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  getCurrency(): string {
    return '€';
  }

  getVat(): number {
    return 20;
  }
}

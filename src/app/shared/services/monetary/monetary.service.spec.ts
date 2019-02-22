import { TestBed } from '@angular/core/testing';

import { MonetaryService } from './monetary.service';

fdescribe('CurrencyService', () => {

  let service = new MonetaryService();

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currencyCode()', () => {
    it('should return "currencyCode" of local country', () => {
      expect(service.currencyCode).toBe('EUR');
    });
  });

  describe('vatRate', () => {
    it('should return "normal" value of "vatRates" object', () => {
      expect(service.vatRate).toBe(20.0);
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { MonetaryService } from './monetary.service';

describe('CurrencyService', () => {

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
    beforeEach(() => {
      service.vatRateList = [
      2.0, 4.5, 10.8, 40, 75.4, 99.0
      ];
    });
    it('should return last value of "vatRateList" array', () => {
      expect(service.vatRate).toBe(99.0);
    });
  });
});

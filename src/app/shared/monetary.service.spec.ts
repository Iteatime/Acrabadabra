import { TestBed } from '@angular/core/testing';

import { MonetaryService } from './monetary.service';

describe('CurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonetaryService = TestBed.get(MonetaryService);
    expect(service).toBeTruthy();
  });
});

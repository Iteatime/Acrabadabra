import { TestBed } from '@angular/core/testing';

import { InvoiceDataService } from './invoice-data.service';

describe('InvoiceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceDataService = TestBed.get(InvoiceDataService);
    expect(service).toBeTruthy();
  });
});

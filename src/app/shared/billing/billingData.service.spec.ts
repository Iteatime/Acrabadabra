import { TestBed } from '@angular/core/testing';

import { BillingService } from './billingData.service';

describe('BillingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingService = TestBed.get(BillingService);
    expect(service).toBeTruthy();
  });
});

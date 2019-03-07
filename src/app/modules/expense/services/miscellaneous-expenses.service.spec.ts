import { TestBed } from '@angular/core/testing';

import { MiscellaneousExpensesService } from './miscellaneous-expenses.service';

describe('MiscellaneousExpensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiscellaneousExpensesService = TestBed.get(MiscellaneousExpensesService);
    expect(service).toBeTruthy();
  });
});

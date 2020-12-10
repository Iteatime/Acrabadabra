import { TestBed } from '@angular/core/testing';

import { MiscellaneousExpensesService } from './miscellaneous-expenses.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';

let service: MiscellaneousExpensesService;
let misc: Miscellaneous;

describe('MiscellaneousExpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonetaryService],
    }).compileComponents();
    service = TestBed.get(MiscellaneousExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('vatDeductible(misc: Miscellaneous)', () => {
    beforeEach(() => {
      service.miscellaneousTypes = [
        {
          type: 'Lavage',
          vatDeductible: false,
        },
        {
          type: 'Fournitures',
          vatDeductible: true,
        },
      ];
      misc = { miscellaneousType: '', tvaRate: 10, wording: '', date: '', amount: 10, selectedType: 1 };
    });

    it('should return "true" if the vat is deductible on this type of miscellaneous expense', () => {
      expect(service.vatDeductible(misc)).toBe(true);
    });

    it('should return "false" if the vat is non deductible on this type of miscellaneous expense', () => {
      misc.selectedType = 0;
      expect(service.vatDeductible(misc)).toBe(false);
    });

    it('should return "false" if the selectedtype property is undefined', () => {
      misc.selectedType = undefined;
      expect(service.vatDeductible(misc)).toBe(false);
    });
  });
});

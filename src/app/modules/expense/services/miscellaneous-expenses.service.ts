import { Injectable } from '@angular/core';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousExpensesService {

  miscellaneousTypes = [
    {
      type: 'Repas',
      vatDeductible: true
    },
    {
      type: 'Péage',
      vat: this.monetaryService.vatRates.normal,
      vatDeductible: true
    },
    {
      type: 'Transports',
      vat: this.monetaryService.vatRates.reduced,
      vatDeductible: false
    },
    {
      type: 'Hébergement',
      vat: this.monetaryService.vatRates.reduced,
      vatDeductible: false
    },
    {
      type: 'Autres',
      vatDeductible: true
    },
    {
      type: 'Autres',
      vatDeductible: false
    }
];

  constructor(public monetaryService: MonetaryService) { }

  vatDeductible(misc: Miscellaneous): boolean {
    return misc.selectedType !== undefined && this.miscellaneousTypes[misc.selectedType].vatDeductible;
  }
}

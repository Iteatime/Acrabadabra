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
      vatDeductible: true,
    },
    {
      type: 'Transports',
      vat: this.monetaryService.vatRates.reduced,
      vatDeductible: false,
    },
    {
      type: 'Hébergement',
      vat: this.monetaryService.vatRates.reduced,
      vatDeductible: false,
    },
    {
      type: 'Location matériel numérique',
      vatDeductible: true,
    },
    {
      type: 'Autres',
      vatDeductible: true
    }
];

  constructor(public monetaryService: MonetaryService) { }

  vatDeductible(misc: Miscellaneous) {
    return misc.selectedType !== undefined && this.miscellaneousTypes[misc.selectedType].vatDeductible;
  }
}

import { Injectable } from '@angular/core';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousExpensesService {

  constructor(public monetaryService: MonetaryService) { }

  miscellaneousTypes = [
    {
      type: 'Repas',
      vat: this.monetaryService.vatRates.reduced
    },
    {
      type: 'Déplacement',
      vat: this.monetaryService.vatRates.normal
    },
    {
      type: 'Hébergement',
      vat: this.monetaryService.vatRates.reduced
    },
    {
      type: 'Location matériel numérique',
      vat: this.monetaryService.vatRates.normal
    },
    {
      type: 'Autres'
    }
];
}

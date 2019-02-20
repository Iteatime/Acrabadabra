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
      vat: this.monetaryService.vatRateList[2]
    },
    {
      type: 'Déplacement',
      vat: this.monetaryService.vatRateList[3]
    },
    {
      type: 'Hébergement',
      vat: this.monetaryService.vatRateList[2]
    },
    {
      type: 'Location matériel numérique',
      vat: this.monetaryService.vatRateList[3]
    },
    {
      type: 'Autres'
    }
  ];
}

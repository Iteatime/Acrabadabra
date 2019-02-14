import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousExpensesService {

  constructor() { }

  miscellaneousTypes = [
    'Repas',
    'Déplacement',
    'Hébergement',
    'Télétravail',
    'Location matériel numérique',
    'Autres'
  ];
}

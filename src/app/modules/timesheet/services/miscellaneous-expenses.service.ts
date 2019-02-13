import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousExpensesService {

  constructor() { }

  miscellaneousTypes = [
    'Péage',
    'Stationnement',
    'Repas',
    'Hébergement',
  ];
}

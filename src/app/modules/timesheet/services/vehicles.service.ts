import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor() { }

  vehicles = [
    {
      horsepower: '4',
      allowance: '0.450'
    },
    {
      horsepower: '5',
      allowance: '0.493'
    },
    {
      horsepower: '6',
      allowance: '0.526'
    },
    {
      horsepower: '7',
      allowance: '0.546'
    },
    {
      horsepower: '8',
      allowance: '0.563'
    },
  ];
}

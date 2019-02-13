import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor() { }

  vehicles = [
    {
      horsepower: '3',
      allowance: '0.41'
    },
    {
      horsepower: '4',
      allowance: '0.493'
    },
    {
      horsepower: '5',
      allowance: '0.543'
    },
    {
      horsepower: '6',
      allowance: '0.568'
    },
    {
      horsepower: '7',
      allowance: '0.595'
    },
  ];
}

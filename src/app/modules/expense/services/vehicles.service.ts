import { Injectable } from '@angular/core';
import { Commute } from 'src/app/shared/models';

@Injectable({
	providedIn: 'root',
})
export class VehiclesService {
	constructor() {}

	vehicles = [
		{
			typeOfRate: 'Taux légal:',
			horsePower: '3 CV et moins',
			allowance: '0.451',
			customizable: false,
		},
		{
			typeOfRate: 'Taux légal:',
			horsePower: '4 CV',
			allowance: '0.518',
			customizable: false,
		},
		{
			typeOfRate: 'Taux légal:',
			horsePower: '5 CV',
			allowance: '0.543',
			customizable: false,
		},
		{
			typeOfRate: 'Taux légal:',
			horsePower: '6 CV',
			allowance: '0.568',
			customizable: false,
		},
		{
			typeOfRate: 'Taux légal:',
			horsePower: '7 CV et plus',
			allowance: '0.595',
			customizable: false,
		},
		{
			typeOfRate: 'Taux personnalisé',
			allowance: '',
			customizable: true,
		},
	];

	isCustomizable(commute: Commute): boolean {
		return (
			commute.vehicleSelected !== undefined &&
			this.vehicles[commute.vehicleSelected].customizable
		);
	}
}

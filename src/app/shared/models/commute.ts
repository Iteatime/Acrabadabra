export class Commute {
  constructor(
    public date: string,
    public journey: string,
    public distance: number,
    public allowance: any,
    public mileageAllowance: number,
    public vehicleSelected?: number,
  ) {}
}

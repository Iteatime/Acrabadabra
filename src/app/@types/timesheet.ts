import { Consultant } from './consultant';
import { Mission } from './mission';
import { Invoice } from './invoice';

// tslint:disable-next-line:interface-over-type-literal
export type Timesheet = {
  consultant: Consultant;
  mission: Mission;
  workingDays: any;
  invoice: Invoice;
};

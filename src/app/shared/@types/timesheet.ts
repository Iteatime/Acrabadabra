import { Consultant } from './consultant';
import { Invoice } from './invoice';
import { Mission } from './mission';

export interface Timesheet {
  consultant: Consultant;
  mission: Mission;
  workingDays: any;
  invoice: Invoice | null;
}

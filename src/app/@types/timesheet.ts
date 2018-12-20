import { Consultant } from './consultant';
import { Mission } from './mission';

export type Timesheet = {
  consultant: Consultant,
  mission: Mission,
  workingDays: any;
};

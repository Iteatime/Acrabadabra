import { Consultant } from '../shared/consultant.model';
import { Mission } from './mission';

export type Cra = {
  consultant: Consultant,
  mission: Mission,
  timesheet: any;
};

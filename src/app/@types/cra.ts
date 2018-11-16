import { Consultant } from '../shared/consultant.model';
import { Mission } from './mission';
import { CalendarEvent } from 'calendar-utils';

export type Cra = {
  consultant: Consultant,
  mission: Mission,
  timesheet: CalendarEvent[];
};

import { Mission } from './mission.model';
import { Consultant } from './consultant.model';
import { CalendarEvent } from 'calendar-utils';

export class Cra {
  consultant: Consultant;
  mission: Mission;
  timesheet: CalendarEvent[];

  constructor(
    consultantEmail: string = '',
    consultantName: string = '',
    consultant?: Consultant,
    missionClient: string = '',
    missionTitle: string = '',
    mission?: Mission,
  ) {
    this.consultant = new Consultant(consultantEmail, consultantName) || consultant;
    this.mission = new Mission(missionClient, missionTitle) || mission;
    this.timesheet = [];
  }
}

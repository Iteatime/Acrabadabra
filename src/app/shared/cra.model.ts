import { Mission } from './mission.model';
import { Consultant } from './consultant.model';

export class Cra {
  consultant: Consultant;
  mission: Mission;
  timesheet: any;

  constructor(
    consultantEmail: string = '',
    consultantName: string = '',
    missionClient: string = '',
    missionTitle: string = '',
    consultant?: Consultant,
    mission?: Mission,
  ) {
    this.consultant = new Consultant(consultantEmail, consultantName) || consultant;
    this.mission = new Mission(missionClient, missionTitle) || mission;
    this.timesheet = [];
  }
}

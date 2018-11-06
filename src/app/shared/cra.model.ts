import { Mission } from './mission.model';
import { Consultant } from './consultant.model';

export class Cra {

  consultant: Consultant;
  mission: Mission;
  hours: number;

  constructor(
    consultantEmail: string = '',
    consultantName: string = '',
    consultant?: Consultant,
    missionClient: string = '',
    missionTitle: string = '',
    mission?: Mission,
    hour: number = 1,
  ) {
    this.consultant = new Consultant(consultantEmail, consultantName) || consultant;
    this.mission = new Mission(missionClient, missionTitle) || mission;
    this.hours = hour;
  }

}

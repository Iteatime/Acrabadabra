import { Mission } from './mission.model';
import { Consultant } from './consultant.model';

export class Cra {

  consultant: Consultant;
  mission: Mission;

  mounth: number;
  days: {};


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
  }


}

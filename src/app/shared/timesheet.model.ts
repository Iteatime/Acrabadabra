import { Mission } from './mission.model';
import { Consultant } from './consultant.model';
import { Invoice } from './invoice.model';

export class Timesheet {
  consultant: Consultant;
  mission: Mission;
  workingDays: Number[];
  invoice: Invoice;

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
    this.workingDays = [];
  }
}

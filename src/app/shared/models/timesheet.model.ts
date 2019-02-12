import { Mission } from './mission.model';
import { Consultant } from './consultant.model';
import { Invoice } from './invoice.model';
import { Commute } from './commute';

export class Timesheet {
  consultant: Consultant;
  mission: Mission;
  workingDays: {};
  invoice: Invoice;
  expenses: Commute[];

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
    this.workingDays = {};
    this.expenses = [];
  }
}

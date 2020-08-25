import { Mission } from './mission.model';
import { Consultant } from './consultant.model';
import { Invoice } from './invoice.model';
import { Commute } from './commute';
import { Miscellaneous } from './miscellaneous.model';
import { FlatFee } from './flat-fee.model';

export class Timesheet {
  consultant: Consultant;
  mission: Mission;
  workingDays: {};
  invoice: Invoice;
  commutes: Commute[];
  miscellaneous: Miscellaneous[];
  flatFees: FlatFee[];

  constructor (
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
    this.commutes = [];
    this.miscellaneous = [];
    this.flatFees = [];
  }
}

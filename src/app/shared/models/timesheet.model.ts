import { Mission } from './mission.model';
import { Consultant } from './consultant.model';
import { Invoice } from './invoice.model';
import { Commute } from './commute';
import { Miscellaneous } from './miscellaneous.model';
import { FlatFee } from './flat-fee.model';

export class Timesheet {
  // consultant: Consultant;
  // mission: Mission;
  missionId: string;
  workingDays: {};
  invoice: Invoice;
  commutes: Commute[];
  miscellaneous: Miscellaneous[];
  flatFees: FlatFee[];
  id: string;

  constructor(
    // consultantEmail: string = '',
    // consultantName: string = '',
    missionId?: null,
    // missionClient: string = '',
    // missionTitle: string = '',
    // consultant?: Consultant,
    // mission?: Mission,
    id?: string
  ) {
    // this.consultant = new Consultant(consultantEmail, consultantName) || consultant;
    // this.mission = new Mission(missionClient, missionTitle) || mission;
    this.missionId = missionId;
    this.workingDays = {};
    this.commutes = [];
    this.miscellaneous = [];
    this.flatFees = [];
    this.id = id;
  }
}

export class Mission {
  missionCreator: string;
  consultant: string;
  consultantEmail: string;
  client: string;
  title: string;

  constructor(
    missionCreator?: string,
    missionClient?: string,
    missionTitle?: string,
    missionConsultant?: string,
    missionConsultantEmail?: string,
    missionClientEmail?: string,
    missionclientRef?: string,
    missionStartDate?: string,
    missionEndDate?: string,
    missionUnitOfWorkType?: string,
    missionUnitOfWorkPrice?: string) {

    this.missionCreator = missionCreator;
    this.consultant = missionConsultant;
    this.consultantEmail = missionConsultantEmail;
    this.client = missionClient;
    this.title = missionTitle;
  }
}

export class Mission {
  consultant: string;
  consultantEmail: string;
  client: string;
  clientEmail: string;
  title: string;
  clientRef: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfworkPrice: string;

  constructor(
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

    this.consultant = missionConsultant;
    this.consultantEmail = missionConsultantEmail;
    this.client = missionClient;
    this.clientEmail = missionClientEmail;
    this.title = missionTitle;
    this.clientRef = missionclientRef;
    this.startDate = missionStartDate;
    this.endDate = missionEndDate;
    this.unitOfWorkType = missionUnitOfWorkType;
    this.unitOfworkPrice = missionUnitOfWorkPrice;
  }
}

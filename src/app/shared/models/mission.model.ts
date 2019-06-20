import { Company } from './company.model';

export class Mission {
  missionCreator: string;
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
  consultantCompany: Company;
  providerCompany: Company;
  clientCompany: Company;
  bankAccountHolder: string;
  bankingAgency: string;
  bankingDomiciliation: string;
  bankIBAN: string;
  bankSWIFT: string;

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
    missionUnitOfWorkPrice?: string,
    consultantCompany?: Company,
    providerCompany?: Company,
    clientCompany?: Company,
    bankAccountHolder?: string,
    bankingAgency?: string,
    bankingDomiciliation?: string,
    bankIBAN?: string,
    bankSWIFT?: string
    ) {

    this.missionCreator = missionCreator;
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
    this.consultantCompany = consultantCompany || new Company();
    this.providerCompany = providerCompany || new Company();
    this.clientCompany = clientCompany || new Company();
    this.bankAccountHolder = bankAccountHolder || '';
    this.bankingAgency = bankingAgency || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
  }

  static fromFaunaDB(data: ApiFaunaDB) {
    return new Mission(
      data.missionCreator,
      data.consultant,
      data.consultantEmail,
      data.clientEmail,
      data.title,
      data.clientRef,
      data.startDate,
      data.endDate,
      data.unitOfWorkType,
      data.unitOfWorkPrice
    );
  }
}
export interface ApiFaunaDB {
  missionCreator: string;
  consultant: string;
  consultantEmail: string;
  client: string;
  clientEmail: string;
  title: string;
  clientRef: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfWorkPrice: string;
}



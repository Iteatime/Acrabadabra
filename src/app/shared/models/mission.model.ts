import { Company } from './company.model';

export class Mission {
  id: string;
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
  providerBankAccountHolder: string;
  providerBankingAgency: string;
  providerBankingDomiciliation: string;
  providerBankIBAN: string;
  providerBankSWIFT: string;
  consultantBankAccountHolder: string;
  consultantBankingAgency: string;
  consultantBankingDomiciliation: string;
  consultantBankIBAN: string;
  consultantBankSWIFT: string;
  consultantFreelance: boolean;

  constructor(
    id?: string,
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
    providerBankAccountHolder?: string,
    providerBankingAgency?: string,
    providerBankingDomiciliation?: string,
    providerBankIBAN?: string,
    providerBankSWIFT?: string,
    consultantBankAccountHolder?: string,
    consultantBankingAgency?: string,
    consultantBankingDomiciliation?: string,
    consultantBankIBAN?: string,
    consultantBankSWIFT?: string,
    consultantFreelance?: boolean,

    ) {
    this.id = id;
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
    this.providerBankAccountHolder = providerBankAccountHolder || '';
    this.providerBankingAgency = providerBankingAgency || '';
    this.providerBankingDomiciliation = providerBankingDomiciliation || '';
    this.providerBankIBAN = providerBankIBAN || '';
    this.providerBankSWIFT = providerBankSWIFT || '';
    this.consultantBankAccountHolder = consultantBankAccountHolder || '';
    this.consultantBankingAgency = consultantBankingAgency || '';
    this.consultantBankingDomiciliation = consultantBankingDomiciliation || '';
    this.consultantBankIBAN = consultantBankIBAN || '';
    this.consultantBankSWIFT = consultantBankSWIFT || '';
    this.consultantFreelance = consultantFreelance;

  }
}

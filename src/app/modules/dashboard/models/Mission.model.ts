import { BankAccount } from "./BankAccount.model";
import { Company } from "./company.model";

export class Mission {
  id: string;
  missionCreator: string;
  title: string;
  clientRef: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfworkPrice: string;
  consultantName: string;
  consultantEmail: string;
  consultantCompany: Company;
  consultantBankAccount: BankAccount;
  clientName: string;
  clientEmail: string;
  clientCompany: Company;
  providerCompany: Company;
  providerBankAccount: BankAccount;

  constructor(
    id?: string,
    missionCreator?: string,
    title?: string,
    clientRef?: string,
    startDate?: string,
    endDate?: string,
    unitOfWorkType?: string,
    unitOfWorkPrice?: string,
    consultantName?: string,
    consultantEmail?: string,
    consultantCompany?: Company,
    consultantBankAccount?: BankAccount,
    clientName?: string,
    clientEmail?: string,
    clientCompany?: Company,
    providerCompany?: Company,
    providerBankAccount?: BankAccount
  ) {
    this.id = id || null;
    this.missionCreator = missionCreator || null;
    this.title = title || null;
    this.clientRef = clientRef || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.unitOfWorkType = unitOfWorkType || null;
    this.unitOfworkPrice = unitOfWorkPrice || null;
    this.consultantName = consultantName || null;
    this.consultantEmail = consultantEmail || null;
    this.consultantCompany = consultantCompany || new Company();
    this.consultantBankAccount = consultantBankAccount || new BankAccount();
    this.clientName = clientName || null;
    this.clientEmail = clientEmail || null;
    this.clientCompany = clientCompany || new Company();
    this.providerCompany = providerCompany || new Company();
    this.providerBankAccount = providerBankAccount || new BankAccount();
  }
}

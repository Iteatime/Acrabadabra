import { BankAccount } from "./BankAccount.model";
import { Company } from "./company.model";

export class Mission {
  id: string;
  missionCreator: string;
  title: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfworkPrice: string;
  client: {
    ref: string;
    name: string;
    email: string;
    company: Company;
  };
  consultant: {
    name: string;
    email: string;
    company: Company;
    bankAccount: BankAccount;
  };
  providerCompany: Company;
  providerBankAccount: BankAccount;

  constructor(
    id?: string,
    missionCreator?: string,
    title?: string,
    startDate?: string,
    endDate?: string,
    client?: {
      ref: string;
      name: string;
      email: string;
      company: Company;
    },
    consultant?: {
      name: string;
      email: string;
      company: Company;
      bankAccount: BankAccount;
    },
    unitOfWorkType?: string,
    unitOfWorkPrice?: string,
    providerCompany?: Company,
    providerBankAccount?: BankAccount
  ) {
    this.id = id || null;
    this.missionCreator = missionCreator || null;
    this.title = title || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.unitOfWorkType = unitOfWorkType || null;
    this.unitOfworkPrice = unitOfWorkPrice || null;
    this.client = client || null;
    this.consultant = consultant || null;
    this.providerCompany = providerCompany || new Company();
    this.providerBankAccount = providerBankAccount || new BankAccount();
  }
}

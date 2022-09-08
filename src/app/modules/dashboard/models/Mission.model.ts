import { BankAccount } from "./BankAccount.model";
import { Company } from "./company.model";

export class Mission {
  id: string;
  creatorId: string;
  title: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfworkPrice: string;
  client: {
    ref: string;
    email: string;
    company: Company;
  };
  consultant: {
    name: string;
    email: string;
    isFreelance: boolean;
    company: Company;
  };
  provider: Company;

  constructor(
    id?: string,
    creatorId?: string,
    title?: string,
    startDate?: string,
    endDate?: string,
    client?: Mission["client"],
    consultant?: Mission["consultant"],
    unitOfWorkType?: string,
    unitOfWorkPrice?: string,
    providerCompany?: Company
  ) {
    this.id = id || null;
    this.creatorId = creatorId || null;
    this.title = title || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.unitOfWorkType = unitOfWorkType || null;
    this.unitOfworkPrice = unitOfWorkPrice || null;
    this.client = client || null;
    this.consultant = consultant || null;
    this.provider = providerCompany || new Company();
  }
}

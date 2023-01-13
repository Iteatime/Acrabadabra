import { Company } from "./company.model";

export class Mission {
  id: string;
  creatorId: string;
  title: string;
  startDate: string;
  endDate: string;
  unitOfWorkType: string;
  unitOfworkPrice: number;
  freelanceUnitOfworkPrice: number | null;
  client: {
    ref: string;
    email: string;
    company: Company;
  };
  consultant: {
    name: string;
    email: string;
    isFreelance: boolean;
    unitOfWorkPrice?: number;
    company: Company;
  };
  paymentDetails: {
    mode: string;
    penalties: boolean;
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
    unitOfWorkPrice?: number,
    freelanceUnitOfworkPrice?: number,
    providerCompany?: Company,
    paymentDetails?: Mission["paymentDetails"]
  ) {
    this.id = id || null;
    this.creatorId = creatorId || null;
    this.title = title || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.unitOfWorkType = unitOfWorkType || null;
    this.unitOfworkPrice = unitOfWorkPrice || null;
    this.freelanceUnitOfworkPrice = freelanceUnitOfworkPrice || null;
    this.client = client || null;
    this.consultant = consultant || {
      company: new Company(),
      email: null,
      isFreelance: false,
      name: null,
    };
    this.client = {
      company: new Company(),
      email: null,
      ref: null,
    };
    this.provider = providerCompany || new Company();
    this.paymentDetails = paymentDetails || null;
  }
}

import { Company } from '../shared/company.model';

// tslint:disable-next-line:interface-over-type-literal
export type Invoice = {
  number: number;
  date: string;
  clientRef: string;
  dailyRate: number;
  provider: Company;
  client: Company;

  paymentDate: string;
  paymentModality: string;
  paymentLatePenalty: boolean;
  bankIBAN: string;
  bankSWIFT: string;
  bankingDomiciliation: string;
};

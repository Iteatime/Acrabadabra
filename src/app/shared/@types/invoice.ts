import { Company } from '../models';

export interface Invoice {
  number: string;
  date: string;
  clientRef: string;
  workedRate: number;
  provider: Company;
  client: Company;

  paymentDate: string;
  paymentModality: string;
  paymentLatePenalty: boolean;
  bankIBAN: string;
  bankSWIFT: string;
  bankingDomiciliation: string;
}

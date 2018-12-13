import { Company } from './company.model';

export class Invoice {
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

  constructor(
    number?: number,
    date?: string,
    clientRef?: string,
    dailyRate?: number,
    provider?: Company,
    client?: Company,

    paymentDate?: string,
    paymentModality?: string,
    paymentLatePenalty?: boolean,
    bankIBAN?: string,
    bankSWIFT?: string,
    bankingDomiciliation?: string,
  ) {
    this.number = number || null;
    this.date = date || '';
    this.clientRef = clientRef || '';
    this.dailyRate = dailyRate || null;
    this.provider = provider || new Company();
    this.client = client || new Company();

    this.paymentDate = paymentDate || '';
    this.paymentModality = paymentModality || '';
    this.paymentLatePenalty = paymentLatePenalty || false;
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
  }
}

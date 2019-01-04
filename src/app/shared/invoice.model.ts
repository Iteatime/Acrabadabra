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
  bankAccountHolder: string;
  bankingAgency: string;
  bankingDomiciliation: string;
  bankIBAN: string;
  bankSWIFT: string;

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
    bankAccountHolder?: string,
    bankingAgency?: string,
    bankingDomiciliation?: string,
    bankIBAN?: string,
    bankSWIFT?: string,
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
    this.bankAccountHolder = bankAccountHolder || '';
    this.bankingAgency = bankingAgency || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
  }
}

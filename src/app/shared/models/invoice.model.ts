import { Company } from './company.model';
import * as _ from 'lodash';

export class Invoice {
  number: string;
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
    number?: string,
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

  isBankingDetails(): boolean {
    return  !_.isEmpty(this.bankAccountHolder) &&
            !_.isEmpty(this.bankingAgency) &&
            !_.isEmpty(this.bankingDomiciliation) &&
            !_.isEmpty(this.bankIBAN) &&
            !_.isEmpty(this.bankSWIFT);
  }
}

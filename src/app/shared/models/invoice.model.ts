import * as _ from 'lodash';
import { Company } from './company.model';

/* tslint:disable:parameters-max-number */
export class Invoice {
  number: string | null;
  date: string;
  clientRef: string;
  dailyRate: number | null;
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
    number: string | null = null, // tslint:disable-line:variable-name
    date?: string,
    clientRef?: string,
    dailyRate: number | null = null,
    provider?: Company,
    client?: Company,

    paymentDate?: string,
    paymentModality?: string,
    paymentLatePenalty: boolean = false,
    bankAccountHolder?: string,
    bankingAgency?: string,
    bankingDomiciliation?: string,
    bankIBAN?: string,
    bankSWIFT?: string,
  ) {
    this.number = number;
    this.date = date || '';
    this.clientRef = clientRef || '';
    this.dailyRate = dailyRate;
    this.provider = provider || new Company();
    this.client = client || new Company();

    this.paymentDate = paymentDate || '';
    this.paymentModality = paymentModality || '';
    this.paymentLatePenalty = paymentLatePenalty;
    this.bankAccountHolder = bankAccountHolder || '';
    this.bankingAgency = bankingAgency || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
  }

  isBankingDetails(): boolean {
    return (
      !_.isEmpty(this.bankAccountHolder) ||
      !_.isEmpty(this.bankingAgency) ||
      !_.isEmpty(this.bankingDomiciliation) ||
      !_.isEmpty(this.bankIBAN) ||
      !_.isEmpty(this.bankSWIFT)
    );
  }
}

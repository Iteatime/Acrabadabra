import { Company } from "./company.model";
import * as _ from "lodash";

export class Invoice {
  number: string;
  date: string;
  clientRef: string;
  workedRate: number;
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
    number?: string,
    date?: string,
    clientRef?: string,
    workedRate?: number,
    provider?: Company,
    client?: Company,

    paymentDate?: string,
    paymentModality?: string,
    paymentLatePenalty?: boolean,
    bankAccountHolder?: string,
    bankingAgency?: string,
    bankingDomiciliation?: string,
    bankIBAN?: string,
    bankSWIFT?: string
  ) {
    this.number = number || null;
    this.date = date || new Date().toISOString().slice(0, 10);
    this.clientRef = clientRef || "";
    this.workedRate = workedRate || null;
    this.provider = provider || new Company();
    this.client = client || new Company();

    this.paymentDate = paymentDate || "";
    this.paymentModality = paymentModality || "";
    this.paymentLatePenalty = paymentLatePenalty || false;
    this.bankAccountHolder = bankAccountHolder || "";
    this.bankingAgency = bankingAgency || "";
    this.bankingDomiciliation = bankingDomiciliation || "";
    this.bankIBAN = bankIBAN || "";
    this.bankSWIFT = bankSWIFT || "";
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

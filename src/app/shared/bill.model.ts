import { BillPart } from './billPart.model';

export class Bill {
  number: number;
  date: string;
  clientRef: string;
  dailyRate: number;
  consultant: BillPart;
  client: BillPart;

  paymentDate: string;
  paymentModality: string;
  billPaymentLatePenalty: boolean;
  bankIBAN: string;
  bankSWIFT: string;
  bankingDomiciliation: string;

  constructor(
    number?: number,
    date?: string,
    clientRef?: string,
    dailyRate?: number,
    consultant?: BillPart,
    client?: BillPart,

    paymentDate?: string,
    paymentModality?: string,
    billPaymentLatePenalty?: boolean,
    bankIBAN?: string,
    bankSWIFT?: string,
    bankingDomiciliation?: string,
  ) {
    this.number = number || null;
    this.date = date || '';
    this.clientRef = clientRef || '';
    this.dailyRate = dailyRate || null;
    this.consultant = consultant || new BillPart();
    this.client = client || new BillPart();

    this.paymentDate = paymentDate || '';
    this.paymentModality = paymentModality || '';
    this.billPaymentLatePenalty = billPaymentLatePenalty || false;
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
  }
}

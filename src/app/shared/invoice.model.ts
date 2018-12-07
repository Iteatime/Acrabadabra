import { InvoicePart } from './invoice-part.model';

export class Invoice {
  number: number;
  date: string;
  clientRef: string;
  dailyRate: number;
  consultant: InvoicePart;
  client: InvoicePart;

  paymentDate: string;
  paymentModality: string;
  invoicePaymentLatePenalty: boolean;
  bankIBAN: string;
  bankSWIFT: string;
  bankingDomiciliation: string;

  constructor(
    number?: number,
    date?: string,
    clientRef?: string,
    dailyRate?: number,
    consultant?: InvoicePart,
    client?: InvoicePart,

    paymentDate?: string,
    paymentModality?: string,
    invoicePaymentLatePenalty?: boolean,
    bankIBAN?: string,
    bankSWIFT?: string,
    bankingDomiciliation?: string,
  ) {
    this.number = number || null;
    this.date = date || '';
    this.clientRef = clientRef || '';
    this.dailyRate = dailyRate || null;
    this.consultant = consultant || new InvoicePart();
    this.client = client || new InvoicePart();

    this.paymentDate = paymentDate || '';
    this.paymentModality = paymentModality || '';
    this.invoicePaymentLatePenalty = invoicePaymentLatePenalty || false;
    this.bankIBAN = bankIBAN || '';
    this.bankSWIFT = bankSWIFT || '';
    this.bankingDomiciliation = bankingDomiciliation || '';
  }
}

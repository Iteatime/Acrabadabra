import { InvoicePart } from '../shared/invoice-part.model';

export type Invoice = {
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
};

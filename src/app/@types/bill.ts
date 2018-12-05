import { BillPart } from '../shared/billPart.model';

export type Bill = {
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
};

import { Cra } from './cra';
import { Invoice } from '../shared/invoice.model';

export type formData = {
  mode: string;
  cra: Cra;
  invoice: Invoice;
};

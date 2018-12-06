import { Cra } from './cra';
import { Bill } from './bill';

export type formData = {
  mode: string;
  cra: Cra;
  bill: Bill;
};

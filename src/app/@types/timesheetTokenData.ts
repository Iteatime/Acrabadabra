import { Timesheet } from './timesheet';
import { Invoice } from '../shared/invoice.model';

export type TimesheetTokenData = {
  mode: string;
  timesheet: Timesheet;
  invoice: Invoice;
};

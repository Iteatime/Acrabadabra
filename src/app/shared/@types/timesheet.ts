import { Consultant } from './consultant';
import { Mission } from './mission';
import { Invoice } from './invoice';

export interface Timesheet {
	consultant: Consultant;
	mission: Mission;
	workingDays: any;
	invoice: Invoice;
}

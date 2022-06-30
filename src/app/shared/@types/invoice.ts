import { Company } from '../models/company.model';

export interface Invoice {
	number: string;
	date: string;
	clientRef: string;
	dailyRate: number;
	provider: Company;
	client: Company;

	paymentDate: string;
	paymentModality: string;
	paymentLatePenalty: boolean;
	bankIBAN: string;
	bankSWIFT: string;
	bankingDomiciliation: string;
}

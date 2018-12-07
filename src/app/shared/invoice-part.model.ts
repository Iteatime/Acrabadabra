
export class InvoicePart {
  name: string;
  address: string;
  telephone: string;
  siren: string;
  tradeAndCompaniesRegisterCity: string;
  tradeAndCompaniesRegisterExemption: boolean;
  vatNumber: number;
  vatExemption: boolean;

  constructor(
    name?: string,
    address?: string,
    telephone?: string,
    siren?: string,
    tradeAndCompaniesRegisterCity?: string,
    tradeAndCompaniesRegisterExemption?: boolean,
    vatNumber?: number,
    vatExemption?: boolean
  ) {
    this.name = name || '';
    this.address = address || '';
    this.telephone = telephone || '';
    this.siren = siren || '';
    this.tradeAndCompaniesRegisterCity = tradeAndCompaniesRegisterCity || '';
    this.tradeAndCompaniesRegisterExemption = tradeAndCompaniesRegisterExemption || false;
    this.vatNumber = vatNumber || null;
    this.vatExemption = vatExemption || false;
  }

  addProperty(name: string, value: any) {
    Object.defineProperty(this, name, value);
  }
}

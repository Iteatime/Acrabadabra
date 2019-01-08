
export class Company {
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


  getFormattedVATNumber(): string {
    if (this.vatExemption) {
      return undefined;
    } else {
      const vat = this.vatNumber.toString();
      return  vat.substring(0, 2) + ' ' +
              vat.substring(2, 4) + ' ' +
              vat.substring(4, 7) + ' ' +
              vat.substring(7, 10) + ' ' +
              vat.substring(10, 13) + '.';
    }
  }

  getFormattedTelephoneNumber(): string {
    switch (this.telephone.length) {
      case 10:
        return  this.telephone.substring(0, 2) + '.' +
                this.telephone.substring(2, 4) + '.' +
                this.telephone.substring(4, 6) + '.' +
                this.telephone.substring(6, 8) + '.' +
                this.telephone.substring(8, 10);
      default:
        return  this.telephone;
    }
  }

  getFormattedSIRENNumber(): string {
    switch (this.siren.length) {
      case 9:
        return  this.siren.substring(0, 3) + ' ' +
                this.siren.substring(3, 6) + ' ' +
                this.siren.substring(6, 9);
      case 10:
        return  this.siren.substring(1, 4) + ' ' +
                this.siren.substring(4, 7) + ' ' +
                this.siren.substring(7, 10);
      default:
        return this.siren;
    }
  }

  addProperty(name: string, value: any) {
    Object.defineProperty(this, name, value);
  }
}

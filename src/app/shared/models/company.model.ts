export class Company {

  name: string;
  address: string;
  telephone: string;
  siren: string;
  tradeAndCompaniesRegisterCity: string;
  tradeAndCompaniesRegisterExemption: boolean;
  vatNumber: string;
  vatExemption: boolean;

  constructor (

    name?: string,
    address?: string,
    telephone?: string,
    siren?: string,
    tradeAndCompaniesRegisterCity?: string,
    tradeAndCompaniesRegisterExemption?: boolean,
    vatNumber?: string,
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

  getFormattedAddress (): string {
    const lines = this.address.split(';');
          lines.forEach((line) => {
            line.trim();
          });
    return lines.join('<br/>');
  }

  getFormattedVATNumber (): string {
    if (this.vatExemption) {
      return undefined;
    } else {
      return  this.vatNumber.substring(0, 2) + ' ' +
              this.vatNumber.substring(2, 4) + ' ' +
              this.vatNumber.substring(4, 7) + ' ' +
              this.vatNumber.substring(7, 10) + ' ' +
              this.vatNumber.substring(10, 13) + '.';
    }
  }

  getFormattedTelephoneNumber (): string {
    switch (this.telephone.length) {
      case 10:
      const newTelephoneNumber = [];
      for (let index = 0; index <= this.telephone.length; index++) {
        if (index % 2 === 0 && index !== 0) {
          newTelephoneNumber.push(this.telephone.substring(index - 2, index));
        }
      }
      return newTelephoneNumber.join('.');
      default:
        return  this.telephone;
    }
  }

  getFormattedSIRENNumber (): string {
    const newSiren = [];

    switch (this.siren.length) {
      case 9:
        for (let index = 0; index <= 9; index++) {
          if (index % 3 === 0 && index !== 0) {
            newSiren.push(this.siren.substring(index - 3, index));
          }
        }
        return newSiren.join(' ');
      case 10:
        for (let index = 1; index <= 10; index++) {
          if (index % 3 === 0 && index !== 0) {
            newSiren.push(this.siren.substring(index - 2, index + 1));
          }
        }
        return newSiren.join(' ');
      case 15:
        for (let index = 1; index <= 10; index++) {
          if (index % 3 === 0 && index !== 0) {
            newSiren.push(this.siren.substring(index - 2, index + 1));
          }
        }
        return `${this.siren[0]} ${newSiren.join(' ')}`;
      default:
        return this.siren;
    }
  }

  addProperty (name: string, value: any) {
    Object.defineProperty(this, name, value);
  }
}

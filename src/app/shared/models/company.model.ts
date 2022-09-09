import { BankAccount } from "./bank-account.model";

export class Company {
  name?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  siren?: string;
  tradeAndCompaniesRegisterCity?: string;
  tradeAndCompaniesRegisterExemption?: boolean;
  vatNumber?: string;
  vatExemption?: boolean;
  bankAccount?: BankAccount;

  constructor(
    name?: string,
    address?: string,
    zipCode?: string,
    city?: string,
    phone?: string,
    siren?: string,
    tradeAndCompaniesRegisterCity?: string,
    tradeAndCompaniesRegisterExemption?: boolean,
    vatNumber?: string,
    vatExemption?: boolean,
    bankAccount?: BankAccount
  ) {
    this.name = name || null;
    this.address = address || null;
    this.zipCode = zipCode || null;
    this.city = city || null;
    this.phone = phone ? this.getFormattedPhone(phone) : null;
    this.siren = siren ? this.getFormattedSiren(siren) : null;
    this.tradeAndCompaniesRegisterCity = tradeAndCompaniesRegisterCity || null;
    this.tradeAndCompaniesRegisterExemption =
      tradeAndCompaniesRegisterExemption || false;
    this.vatNumber =
      vatExemption && vatNumber ? this.getFormattedVatNumber(vatNumber) : null;
    this.vatExemption = vatExemption || false;
    this.bankAccount = bankAccount || new BankAccount();
  }

  getFormattedPhone(phone: string): string {
    try {
      const chars = phone.match(/\d/g);
      let formatted = "";

      chars.forEach((char, index) => {
        if (index % 2 === 0 && index != 0) {
          formatted += " ";
        }

        formatted += `${char}`;
      });

      return formatted;
    } catch (error) {
      console.error(error);
      return phone;
    }
  }

  getFormattedSiren(siren: string): string {
    try {
      const chars = siren.match(/\d/g);
      let formatted = "";

      chars.forEach((char, index) => {
        if (index % 3 === 0 && index != 0) {
          formatted += " ";
        }

        formatted += `${char}`;
      });

      return formatted;
    } catch (error) {
      console.error(error);
      return siren;
    }
  }

  getFormattedVatNumber(vatNumber: string): string {
    try {
      const chars = vatNumber.match(/[a-z]|\d/gi);
      const pattern = [2, 4, 7, 10];
      let formatted = "";

      chars.forEach((char, index) => {
        if (pattern.includes(index)) {
          formatted += " ";
        }

        formatted += `${char}`;
      });

      return formatted;
    } catch (error) {
      console.error(error);
      return vatNumber;
    }
  }
}

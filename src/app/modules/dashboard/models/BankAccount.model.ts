export class BankAccount {
  holder?: string;
  agency?: string;
  domiciliation?: string;
  iban?: string;
  swift?: string;

  constructor(
    holder?: string,
    agency?: string,
    domiciliation?: string,
    iban?: string,
    swift?: string
  ) {
    this.holder = holder || null;
    this.agency = agency || null;
    this.domiciliation = domiciliation || null;
    this.iban = iban || null;
    this.swift = swift || null;
  }
}

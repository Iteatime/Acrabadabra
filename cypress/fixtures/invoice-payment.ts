class InvoicePayment {
  BLOCK_DATE = 'invoice-block-payment-date';
  BLOCK_MODALITY = 'invoice-block-payment-modality';
  BLOCK_ACCOUNT_HOLDER = 'invoice-block-bank-account-holder';
  BLOCK_SWIFT = 'invoice-block-bank-swift';
  BLOCK_IBAN = 'invoice-block-bank-iban';
  BLOCK_DOMICILIATION = 'invoice-block-bank-domiciliation';
  BLOCK_AGENCY = 'invoice-block-bank-agency';
  CHECKBOX_LATE_PENALTY = 'checkbox-invoice-payment-late-penalty';

  fillAndCheckCreate() {
    // Invoice payment date
    cy.typeInputByRole(this.BLOCK_DATE, '2020-01-01');

    // Invoice payment modality
    cy.typeInputByRole(this.BLOCK_MODALITY, 'Virement');

    // Invoice bank account holder
    cy.typeInputByRole(this.BLOCK_ACCOUNT_HOLDER, 'John Doe');

    // Invoice bank swift
    cy.typeInputByRole(this.BLOCK_SWIFT, 'SWIFT');

    // Invoice bank iban
    cy.typeInputByRole(this.BLOCK_IBAN, 'IBAN');

    // Invoice bank domiciliation
    cy.typeInputByRole(this.BLOCK_DOMICILIATION, 'Lyon');

    // Invoice bank agency
    cy.typeInputByRole(this.BLOCK_AGENCY, 'Confluence');

    // Invoice payment late penalty
    cy.getByRole(this.CHECKBOX_LATE_PENALTY).click();
  }

  add() {}
}

export const invoicePayment = new InvoicePayment();

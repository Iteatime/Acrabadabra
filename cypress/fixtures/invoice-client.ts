class InvoiceClient {
  BLOCK_NAME = 'invoice-block-client-name';
  BLOCK_ADDRESS = 'invoice-block-client-address';
  BLOCK_PHONE = 'invoice-block-client-phone';
  BLOCK_SIREN = 'invoice-block-client-siren';
  BLOCK_RCS = 'invoice-block-client-rcs';
  INPUT_RCS = 'invoice-input-client-rcs';
  CHECKBOX_RCS = 'checkbox-invoice-client-rcs';
  BLOCK_VAT = 'invoice-block-client-vat';

  fillAndCheckCreate() {
    // Invoice client name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'IteamTime');

    // Invoice client address
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_ADDRESS, '38 rue Villedieu 33 000 Bordeaux');

    // Invoice client phone
    cy.typeInputByRole(this.BLOCK_PHONE, '0606060606');

    // Invoice client siren
    cy.typeInputByRole(this.BLOCK_SIREN, 'SIREN');

    // Invoice client rcs
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.typeInputByRole(this.BLOCK_RCS, 'RCS');

    // Invoice client vat
    cy.typeInputByRole(this.BLOCK_VAT, 'VAT');
  }

  add() {}
}

export const invoiceClient = new InvoiceClient();

class InvoiceProvider {
  BLOCK_NAME = 'invoice-block-provider-name';
  BLOCK_ADDRESS = 'invoice-block-provider-address';
  BLOCK_PHONE = 'invoice-block-provider-phone';
  BLOCK_SIREN = 'invoice-block-provider-siren';
  BLOCK_RCS = 'invoice-block-provider-rcs';
  INPUT_RCS = 'invoice-input-provider-rcs';
  CHECKBOX_RCS = 'checkbox-invoice-provider-rcs';
  BLOCK_VAT = 'invoice-block-provider-vat';
  INPUT_VAT = 'invoice-input-provider-vat';
  CHECKBOX_VAT = 'checkbox-invoice-provider-vat';
  fillAndCheckCreate() {
    // Invoice provider name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'John');

    // Invoice provider address
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_ADDRESS, 'Avenue de la soif');

    // Invoice provider phone
    cy.typeInputRequiredByRole(this.BLOCK_PHONE, '0606060606');

    // Invoice provider siren
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_SIREN, 'SIREN');

    // Invoice provider rcs
    cy.checkInputRequiredByRole(this.BLOCK_RCS);
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.typeInputRequiredByRole(this.BLOCK_RCS, 'RCS');

    // Invoice provider vat
    cy.getByRole(this.INPUT_VAT).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_VAT).click();
    cy.getByRole(this.INPUT_VAT).should('be.disabled');
    cy.getByRole(this.CHECKBOX_VAT).click();
    cy.getByRole(this.INPUT_VAT).should('not.be.disabled');
    cy.typeInputByRole(this.BLOCK_VAT, 'VAT');
  }

  add() {}
}

export const invoiceProvider = new InvoiceProvider();

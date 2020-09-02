import {errorMessage} from './errorMessage';

class Invoice {
  BLOCK_NUMBER = 'invoice-block-number';
  BLOCK_DATE = 'invoice-block-date';
  BLOCK_CLIENT_REF = 'invoice-block-client-ref';
  BLOCK_WORKED_RATE = 'invoice-block-worked-rate';

  fillAndCheckCreate() {
    // Invoice name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NUMBER, 'IT-01');

    // Invoice date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE, '2020-01-01');

    // Invoice client ref
    cy.typeInputByRole(this.BLOCK_CLIENT_REF, 'IteaTime');

    // Invoice Worked rate
    cy.checkInputRequiredByRole(this.BLOCK_WORKED_RATE);
    cy.getByRole(this.BLOCK_WORKED_RATE).within(() => {
      cy.get('input:first').type('42,42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('be.visible');
      cy.get('input:first').clear().type('42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('not.be.visible');
    });
  }

  add() {

  }
}

export const invoice = new Invoice();

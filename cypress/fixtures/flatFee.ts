import {errorMessage} from './errorMessage';

class FlatFee {
  BUTTON_ADD = 'button-add-flat-fee';
  BLOCK_DATE = 'flat-fee-block-date';
  BLOCK_AMOUNT = 'flat-fee-block-amount';
  TABLE_TOTAL = 'flat-fee-table-total';
  TABLE_DATE(id) { return `flat-fee-table-${id}-date`; }
  TABLE_AMOUNT(id) { return `flat-fee-table-${id}-amount`; }

  fillAndCheckCreate() {
    // Flat fee date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE, '2020-01-01');

    // Flat fee amount
    cy.checkInputRequiredByRole(this.BLOCK_AMOUNT);
    cy.getByRole(this.BLOCK_AMOUNT).within(() => {
      cy.get('input:first').type('42,42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('be.visible');
      cy.get('input:first').clear().type('42.42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('not.be.visible');
    });

    // Add Flat fee
    cy.getByRole(this.BUTTON_ADD).click();

    // Check Flat fee table
    cy.getByRole(this.TABLE_DATE(0)).should('contain', '01/01/2020');
    cy.getByRole(this.TABLE_AMOUNT(0)).should('contain', '42,42');
    cy.getByRole(this.TABLE_TOTAL).should('contain', '42,42');
  }

  add(date, amount) {
    cy.typeInputRequiredByRole(this.BLOCK_DATE, date);
    cy.typeInputRequiredByRole(this.BLOCK_AMOUNT, amount);
    cy.getByRole(this.BUTTON_ADD).click();
  }
}

export const flatFee = new FlatFee();

import {errorMessage} from './errorMessage';

class Miscellaneous {
  BUTTON_ADD = 'button-add-miscellaneous';

  BLOCK_DATE = 'miscellaneous-block-date';
  BLOCK_AMOUNT = 'miscellaneous-block-amount';
  BLOCK_WORDING = 'miscellaneous-block-wording';

  INPUT_TYPE = 'miscellaneous-input-type';
  INPUT_VAT_RATE = 'miscellaneous-input-vat-rate';
  INPUT_WORDING = 'miscellaneous-input-wording';

  TABLE_TOTAL = 'miscellaneous-table-total';
  TABLE_DATE(id) { return `miscellaneous-table-${id}-date`; }
  TABLE_TYPE(id) { return `miscellaneous-table-${id}-type`; }
  TABLE_TAX_RATE(id) { return `miscellaneous-table-${id}-tax-rate`; }
  TABLE_TOTAL_TAX_INCL(id) { return `miscellaneous-table-${id}-total-tax-incl`; }

  fillAndCheckCreate() {
    // Miscellaneous date
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_DATE, '2020-01-01');

    // Miscellaneous amount
    cy.checkInputRequiredByRole(this.BLOCK_AMOUNT);
    cy.getByRole(this.BLOCK_AMOUNT).within(() => {
      cy.get('input:first').type('42,42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('be.visible');
      cy.get('input:first').clear().type('42.42');
      cy.contains(errorMessage.ONLY_NUMBERS_AND_DOT).should('not.be.visible');
    });

    // Miscellaneous Type
    cy.getByRole(this.INPUT_TYPE).select('Péage (TVA déductible)');

    // Miscellaneous wording
    cy.getByRole(this.INPUT_WORDING).type('Test');

    // Add Miscellaneous
    cy.getByRole(this.BUTTON_ADD).click();

    // Check Miscellaneous table
    cy.getByRole(this.TABLE_DATE(0)).should('contain', '01/01/2020');
    cy.getByRole(this.TABLE_TYPE(0)).should('contain', 'Péage (TVA déductible) - Test');
    cy.getByRole(this.TABLE_TAX_RATE(0)).should('contain', '20,00');
    cy.getByRole(this.TABLE_TOTAL_TAX_INCL(0)).should('contain', '42,42');
    cy.getByRole(this.TABLE_TOTAL).should('contain', '42,42');
  }

  add(date, amount, type, vatRate = null, wording) {
    cy.typeInputRequiredByRole(this.BLOCK_DATE, date);
    cy.typeInputRequiredByRole(this.BLOCK_AMOUNT, amount);
    cy.getByRole(this.INPUT_TYPE).select(type);
    if (null !== vatRate) {
      cy.getByRole(this.INPUT_VAT_RATE).select(vatRate);
    }
    cy.typeInputRequiredByRole(this.BLOCK_WORDING, wording);
    cy.getByRole(this.BUTTON_ADD).click();
  }
}

export const miscellaneous = new Miscellaneous();

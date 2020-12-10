class Button {
  CONSULTANT = 'button-consultant';
  COMPANY = 'button-company';

  addFees() {
    cy.getByRole('checkbox-fees').click();
  }

  addInvoice() {
    cy.getByRole('checkbox-invoice').click();
  }

  validCra() {
    return cy.getByRole('button-validate').click();
  }

  validMission() {
    cy.getByRole('button-validate').click();
  }
}

export const button = new Button();

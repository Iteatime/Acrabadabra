import { errorMessage } from './errorMessage';

class Consultant {
  BLOCK_NAME = 'consultant-block-name';
  BLOCK_EMAIL = 'consultant-block-email';

  fillAndCheckCreate() {
    // Consultant name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'Rémy');

    // Consultant email
    cy.checkInputRequiredByRole(this.BLOCK_EMAIL);
    cy.getByRole(this.BLOCK_EMAIL).within(() => {
      cy.get('input:first').type('mail.wrong');
      cy.contains(errorMessage.INVALID_MAIL).should('be.visible');
      cy.get('input:first').clear().type('me@remy.ovh');
      cy.contains(errorMessage.INVALID_MAIL).should('not.be.visible');
    });
  }
}

export const consultant = new Consultant();

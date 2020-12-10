import { errorMessage } from './errorMessage';

class MissionClient {
  BLOCK_NAME = 'mission-block-client-name';
  BLOCK_EMAIL = 'mission-block-client-email';
  BLOCK_COMPANY = 'mission-block-client-company';
  BLOCK_ADDRESS = 'mission-block-client-address';
  BLOCK_PHONE = 'mission-block-client-phone';
  BLOCK_SIREN = 'mission-block-client-siren';
  BLOCK_RCS = 'mission-block-client-rcs';
  INPUT_RCS = 'mission-input-client-rcs';
  CHECKBOX_RCS = 'checkbox-mission-client-rcs';
  BLOCK_VAT = 'mission-block-client-vat';

  fillAndCheckCreate() {
    // Mission client name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'John');

    // Mission client email
    cy.checkInputRequiredByRole(this.BLOCK_EMAIL);
    cy.getByRole(this.BLOCK_EMAIL).within(() => {
      cy.get('input:first').type('mail.wrong');
      cy.contains(errorMessage.INVALID_MAIL).should('be.visible');
      cy.get('input:first').clear().type('mail@mail.fr');
      cy.contains(errorMessage.INVALID_MAIL).should('not.be.visible');
    });

    // Mission client company
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_COMPANY, 'Bedrock');

    // Mission client address
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_ADDRESS, '49 quai Rambaud, 69002 Lyon');

    // Mission client phone
    cy.typeInputByRole(this.BLOCK_PHONE, '0606060606');

    // Mission client siren
    cy.typeInputByRole(this.BLOCK_SIREN, 'SIREN');

    // Mission client rcs
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.typeInputByRole(this.BLOCK_RCS, 'RCS');

    // Mission client vat
    cy.typeInputByRole(this.BLOCK_VAT, 'VAT');
  }
}

export const missionClient = new MissionClient();

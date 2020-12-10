import { errorMessage } from './errorMessage';

class MissionConsultant {
  CHECKBOX_CONSULTANT = 'checkbox-mission-consultant';
  CHECKBOX_RCS = 'checkbox-mission-consultant-rcs';
  CHECKBOX_VAT = 'checkbox-mission-consultant-vat';

  BLOCK_NAME = 'mission-block-consultant-name';
  BLOCK_EMAIL = 'mission-block-consultant-email';
  BLOCK_COMPANY = 'mission-block-consultant-company';
  BLOCK_ADDRESS = 'mission-block-consultant-address';
  BLOCK_PHONE = 'mission-block-consultant-phone';
  BLOCK_SIREN = 'mission-block-consultant-siren';
  BLOCK_RCS = 'mission-block-consultant-rcs';
  BLOCK_VAT = 'mission-block-consultant-vat';
  BLOCK_ACCOUNT_HOLDER = 'mission-block-consultant-bank-account-holder';
  BLOCK_SWIFT = 'mission-block-consultant-bank-swift';
  BLOCK_IBAN = 'mission-block-consultant-bank-iban';
  BLOCK_DOMICILIATION = 'mission-block-consultant-bank-domiciliation';
  BLOCK_AGENCY = 'mission-block-consultant-bank-agency';

  INPUT_RCS = 'mission-input-consultant-rcs';
  INPUT_VAT = 'mission-input-consultant-vat';

  fillAndCheckCreate() {
    // click on Consultant indépendant
    cy.getByRole(this.CHECKBOX_CONSULTANT).click();

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

    // Mission company
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_COMPANY, 'Unicorn');

    // Mission address
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_ADDRESS, '2 rue Casimir Périer, 69002 Lyon');

    // Mission phone
    cy.typeInputByRole(this.BLOCK_PHONE, '0606060606');

    // Mission siren
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_SIREN, 'SIREN');

    // Mission rcs
    cy.checkInputRequiredByRole(this.BLOCK_RCS);
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('be.disabled');
    cy.getByRole(this.CHECKBOX_RCS).click();
    cy.getByRole(this.INPUT_RCS).should('not.be.disabled');
    cy.typeInputRequiredByRole(this.BLOCK_RCS, 'RCS');

    // Mission vat
    cy.getByRole(this.INPUT_VAT).should('not.be.disabled');
    cy.getByRole(this.CHECKBOX_VAT).click();
    cy.getByRole(this.INPUT_VAT).should('be.disabled');
    cy.getByRole(this.CHECKBOX_VAT).click();
    cy.getByRole(this.INPUT_VAT).should('not.be.disabled');
    cy.typeInputByRole(this.BLOCK_VAT, 'VAT');

    // Mission bank account holder
    cy.typeInputByRole(this.BLOCK_ACCOUNT_HOLDER, 'John Doe');

    // Mission bank swift
    cy.typeInputByRole(this.BLOCK_SWIFT, 'SWIFT');

    // Mission bank iban
    cy.typeInputByRole(this.BLOCK_IBAN, 'IBAN');

    // Mission bank domiciliation
    cy.typeInputByRole(this.BLOCK_DOMICILIATION, 'Lyon');

    // Mission bank agency
    cy.typeInputByRole(this.BLOCK_AGENCY, 'Confluence');
  }
}

export const missionConsultant = new MissionConsultant();

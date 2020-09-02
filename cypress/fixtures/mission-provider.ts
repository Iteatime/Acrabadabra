import {errorMessage} from './errorMessage';

class MissionProvider {
  CHECKBOX_RCS = 'checkbox-mission-provider-rcs';
  CHECKBOX_VAT = 'checkbox-mission-provider-vat';

  BLOCK_NAME = 'mission-block-provider-name';
  BLOCK_ADDRESS = 'mission-block-provider-address';
  BLOCK_PHONE = 'mission-block-provider-phone';
  BLOCK_SIREN = 'mission-block-provider-siren';
  BLOCK_RCS = 'mission-block-provider-rcs';
  BLOCK_VAT = 'mission-block-provider-vat';
  BLOCK_ACCOUNT_HOLDER = 'mission-block-provider-bank-account-holder';
  BLOCK_SWIFT = 'mission-block-provider-bank-swift';
  BLOCK_IBAN = 'mission-block-provider-bank-iban';
  BLOCK_DOMICILIATION = 'mission-block-provider-bank-domiciliation';
  BLOCK_AGENCY = 'mission-block-provider-bank-agency';

  INPUT_RCS = 'mission-input-provider-rcs';
  INPUT_VAT = 'mission-input-provider-vat';

  fillAndCheckCreate() {
    // Provider name
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_NAME, 'IteaTime');

    // Mission address
    cy.typeAndTypeInputRequiredByRole(this.BLOCK_ADDRESS, '38 rue Villedieu, 33000 Bordeaux');

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
    cy.typeInputByRole(this.BLOCK_DOMICILIATION, 'Bordeaux');

    // Mission bank agency
    cy.typeInputByRole(this.BLOCK_AGENCY, 'Places');
  }
}

export const missionProvider = new MissionProvider();
